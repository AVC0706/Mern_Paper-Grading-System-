import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Spinner
} from "reactstrap";
import Message from "./Message";
import axios from "axios";
import Students from "./Student";
import AuthContext from "../../context/auth/authContext";
import { Table } from "react-bootstrap";

const GenerateResult = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.getAllStudents();
    console.log(authContext.students);
  }, []);

  const resultGenerate = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get("/api/paper/flaskModel");

      setMessage(res.msg);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      if (err.response.status === 500) {
        setMessage("An error occured , Please check your INTERNET CONNECTION");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  if (loading) {
    return (
      <React.Fragment>
        <div>
          {" "}
          <Spinner color='primary' />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Row className='justify-content-center'>
          <Col md='6' lg='9'>
            <section className='text-center pb-3'>
              {message ? <Message msg={message} /> : null}

              <Row className='d-flex justify-content-center'>
                <Col lg='6' xl='5' className='mb-3'>
                  <Card className='d-flex mb-5 p-5'>
                    <CardBody>
                      <CardTitle className='font-bold mb-3'>
                        <strong>Title</strong>
                      </CardTitle>
                      <CardText></CardText>
                      <br />
                      <br />
                      <span className='right'>
                        <Button color='primary' onClick={resultGenerate}>
                          GRADE PAPERS{" "}
                        </Button>{" "}
                      </span>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
        <br />
        <br />
        <br />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Roll NO.</th>
              <th>Name</th>
              <th>Subject 1</th>
              <th>Subject 2</th>
            </tr>
          </thead>
          <tbody>
            {authContext.students !== null ? (
              authContext.students.map(student => (
                <Students key={student.id} student={student} />
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
};

export default GenerateResult;
