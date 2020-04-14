const express = require("express");
const router = express.Router();
const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const fastcsv = require("fast-csv");
const Paper = require("../models/Paper");
const PaperModel = require("../models/PaperModel");
const isAdmin = require("../middleware/auth");

//Register
router.post("/adminR", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User Already Exists" });
    }
    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    //end
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// const headers = {
//   "Content-Type": "application/json",
// };
// const sendrequest = axios
//   .post(
//     "http://127.0.0.1:5000/api/result",
//     {
//       disease: "corona",
//       status: "0",
//       order: "Kill that thing !!",
//     },
//     {
//       headers: headers,
//     }
//   )
//   .then((parsedBody) => {
//     console.log(parsedBody);
//     const res1 = parsedBody; // parsedBody contains the data sent back from the Flask server
//     return res.send(res1.data); // do something with this data, here I'm assigning it to a variable.
//   })
//   .catch(function (err) {
//     res.status(500).send("Server Error");
//   });
