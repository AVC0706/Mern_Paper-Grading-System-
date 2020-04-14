const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Paper = require("../models/Paper");
const PaperModel = require("../models/PaperModel");

const isAuthenticated = require("../middleware/isAuth");
const isAdmin = require("../middleware/auth");

//get all students

router.get("/allStudents", [isAdmin], async (req, res) => {
  try {
    const students = await User.find({});

    res.json({
      students,
    });

    //end
  } catch (e) {
    res.status(500).json({ msg: "Server Error" });
  }
});

router.post("/Student", [isAuthenticated], async (req, res) => {
  try {
    const student = await User.findById(req.body.id);

    res.json({
      student,
    });

    //end
  } catch (e) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//Upload Model Answers
router.post("/uploadModel", [isAdmin], async (req, res) => {
  console.log("here");
  const { filename, downloadUrl, subject } = req.body;

  try {
    paperModel = new PaperModel({
      filename,
      downloadUrl,
      subject,
    });

    await paperModel.save();

    //end
  } catch (e) {
    res.status(500).json({ msg: "Server Error" });
  }

  res.json({
    filename,
    msg: "Student Data Uploaded",
  });
});

//Upload Answer Pdf
router.post("/uploadPdf", [isAdmin], async (req, res) => {
  console.log("here");
  const { filename, downloadUrl, subject } = req.body;

  const rollNo = filename.split(".")[0];

  try {
    const user1 = await User.findOne({ rollNo });
    console.log(user1);
    const paper = await Paper.findOne({ rollNo, subject });
    console.log(paper, user1._id);
    if (!paper) {
      paper1 = new Paper({
        user: user1._id,
        rollNo,
        downloadUrl,
        filename,
        subject,
      });
      console.log(paper1);
      await paper1.save();
    }

    //end
  } catch (e) {
    res.status(500).json({ msg: "Server Error" });
  }

  res.json({
    filename,
    msg: "Student Data Uploaded",
  });
});

router.post("/upload", [isAdmin], (req, res) => {
  console.log("working");

  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    let stream = fs.createReadStream(`${__dirname}/uploads/${file.name}`);
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", async (data) => {
        csvData.push({
          rollNo: data[0],
          name: data[1],
          email: data[2],
          password: data[3],
        });

        try {
          let user = await User.findOne({
            email: data[2],
            rollNo: data[0],
          });

          if (!user) {
            user = new User({
              rollNo: data[0],
              name: data[1],
              email: data[2],
              password: data[3],
            });

            await user.save();
          }
          //end
        } catch (e) {
          console.error(e.message);
          res.status(500).send("Server Error");
        }
      })
      .on("end", function () {
        // remove the first line: header
        csvData.shift();
        console.log(csvData);
      });

    stream.pipe(csvStream);

    res.json({
      fileName: file.name,
      filePath: `${__dirname}/uploads/${file.name}`,
      msg: "Student Data Uploaded",
    });
  });
});

router.get("/flaskModel", [isAdmin], async function (req, res) {
  try {
    const paper = await Paper.find({ isChecked: false });
    const paperModel = await PaperModel.findOne({ subject: paper[0].subject });
    console.log(paper[0].subject);
    const length = paper.length;
    for (let i = 0; i < length; i++) {
      const formData = {
        modelPaper: paperModel.downloadUrl,
        paperPdf: paper[i].downloadUrl,
      };
      console.log(formData);
      const sendrequest = await axios
        .post("http://127.0.0.1:8000/api/result", formData, {
          "Content-Type": "application/json",
        })
        .then(async (result) => {
          console.log(result.data, paper[i].rollNo);
          const user = await User.findOne({ rollNo: paper[i].rollNo });
          if (paper[i].subject === "1") {
            user.subject1 = result.data[1];
            user.total1 = result.data[0];
            user.paper1 = paper[i].downloadUrl;

            await user.save();

            //end
          } else if (paper[i].subject === "2") {
            user.subject2 = result.data[1];
            user.total2 = result.data[0];
            user.paper2 = paper[i].downloadUrl;

            await user.save();

            //end
          }
          // parsedBody contains the data sent back from the Flask server
          // do something with this data, here I'm assigning it to a variable.
        })
        .catch(function (err) {
          res.status(500).send("Server Error");
        });
    }
  } catch (e) {
    res.status(500).json("Server Error");
  }

  return res.json({
    msg: "Paper-Grading Completed , Please Check Student Status .",
  });
});

module.exports = router;
