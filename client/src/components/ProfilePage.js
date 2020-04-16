import React, { useEffect, useContext, useState } from "react";
import {
  Card,
  Col,
  Row,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Button,
  Spinner,
} from "reactstrap";
import src1 from "../assets/img-1.jpg";
import AuthContext from "../context/auth/authContext";

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const { user, isAuth } = authContext;
  const [student, setstudent] = useState({});

  useEffect(() => {
    if (isAuth) {
      console.log(user);
      setstudent(user);
      // const formData = new FormData();
      // formData.append("id", user.id);
      // authContext.getStudent(formData);
      console.log(student);
    }
  }, [isAuth]);

  if (student) {
    return (
      <React.Fragment>
        <Row className='justify-content-center'>
          <Col sm='12' md='6' lg='3' className='mb-5 p-5'>
            <Card>
              <CardImg className='img-fluid' src={src1} />
              <CardBody>
                <CardTitle className='text-center mb-2 font-bold'>
                  {student.name}
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center text-center'>
          <Col lg='6' xl='5' className='mb-3 '>
            <Card className='d-flex mb-5 p-5'>
              <CardBody>
                <CardTitle className='font-bold mb-3'>
                  <strong>Subject 1 </strong>
                </CardTitle>
                <CardText>
                  <strong> Marks : {student.subject1} </strong>
                </CardText>

                <br />
                <br />
                <span className='right'>
                  <Button color='primary'>
                    {student.subject1 !== "Not Checked" ? (
                      <a href={student.paper1} download='subject1'>
                        VIEW
                      </a>
                    ) : (
                      <span> NOT UPLOADED</span>
                    )}
                  </Button>{" "}
                </span>
              </CardBody>
            </Card>
          </Col>{" "}
          <Col lg='6' xl='5' className='mb-3 '>
            <Card className='d-flex mb-5 p-5'>
              <CardBody>
                <CardTitle className='font-bold mb-3'>
                  <strong>Subject 2</strong>
                </CardTitle>
                <CardText>
                  <strong> Marks : {student.subject2} </strong>
                </CardText>

                <br />
                <br />
                <span className='right'>
                  <Button color='primary'>
                    {student.subject2 !== "Not Checked" ? (
                      <a href={student.paper2} download>
                        VIEW
                      </a>
                    ) : (
                      <span> NOT UPLOADED</span>
                    )}
                  </Button>{" "}
                </span>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>
          {" "}
          <Spinner color='primary' />
        </div>
      </React.Fragment>
    );
  }
};

export default ProfilePage;
