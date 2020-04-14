import React, { Fragment, useState, useEffect } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import storage from "../../Firebase/index";
import { Button, Spinner } from "reactstrap";

const ModelAnswer = () => {
  const [files, setFile] = useState({});

  const [filename, setFilename] = useState("Choose Multiple PDF (only) ");
  const [uploadedFile, setUploadedFile] = useState({});
  const [recentFile, setRecent] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("1");

  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    console.log(e.target.files);

    setFile(e.target.files);
    setFilename(e.target.files[0].name);
  };

  const onSubjectChange = e => {
    setSubject(e.target.value);
    console.log(subject);
  };

  const addFiles = e => {
    e.preventDefault();
    setLoading(true);
    setSubject(e.target.value);
    console.log(subject);

    for (let i = 0; i < files.length; i++) {
      const uploadTask = storage.ref(`${files[i].name}`).put(files[i]);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // this.setUploadPercentage(progress);
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref()
            .child(files[i].name)
            .getDownloadURL()
            .then(url => {
              setRecent(recentFile => [
                ...recentFile,
                { url, filename: files[i].name }
              ]);
            });
        }
      );
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSubject(e.target.value);
    console.log(subject);
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("filename", recentFile[i].filename);
      formData.append("downloadUrl", recentFile[i].url);
      formData.append("subject", subject);

      console.log(formData);
      try {
        if (recentFile) {
          const res = await axios.post("/api/paper/uploadModel", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
              setUploadPercentage(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );

              // Clear percentage
              setTimeout(() => setUploadPercentage(0), 10000);
            }
          });

          const { fileName, filePath } = res.data;

          setUploadedFile({ fileName });

          setMessage("File Uploaded");
        }
      } catch (err) {
        if (err.response.status === 500) {
          setMessage("There was a problem with the server");
        } else {
          setMessage(err.response.data.msg);
        }
      }
    }
    setTimeout(() => {
      setRecent(recentFile => []);

      setLoading(false);
    }, 5000);
  };

  const onCheck = e => {
    e.preventDefault();

    console.log(recentFile);
  };

  if (loading) {
    return (
      <Fragment>
        <div>
          {" "}
          <Spinner color='primary' />
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <br />
        <br />
        <h1>MODEL ANSWER PAPER UPLOAD</h1>
        <br />
        {message ? <Message msg={message} /> : null}
        <form onSubmit={addFiles}>
          <br />
          <div className='custom-file mb-4'>
            <input
              type='file'
              className='custom-file-input'
              id='customFile'
              onChange={onChange}
              required
            />
            <label className='custom-file-label' htmlFor='customFile'>
              {filename}
            </label>
          </div>

          <Progress percentage={uploadPercentage} />

          <input
            type='submit'
            value='ADD FILES'
            className='btn btn-primary btn-block mt-4'
          />
        </form>

        {recentFile.length > 0 && (
          <div>
            {" "}
            <br />
            <br />
            <label>
              <br />
              <br />
              SELECT SUBJECT :: {"    "}
              <br />
              <br />
              <select value={subject} onChange={onSubjectChange} required>
                <option>SELECT SUBJECT</option>
                <option value='1'>Subject 1</option>
                <option value='2'>Subject 2</option>
              </select>
            </label>
            <br />
            <br />
            <Button color='success' onClick={onSubmit}>
              CLICK TO UPLOAD PDF{" "}
            </Button>
          </div>
        )}

        {uploadedFile ? (
          <div className='row mt-5'>
            <div className='col-md-6 m-auto'>
              <h3 className='text-center'>{uploadedFile.fileName}</h3>
              {/* <img style={{ width: "100%" }} src={uploadedFile.filePath} alt='' /> */}
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
};

export default ModelAnswer;
