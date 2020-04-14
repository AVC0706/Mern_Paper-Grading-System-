import React from "react";
import {
  Card,
  Col,
  Row,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  button,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <React.Fragment>
      <Row className='justify-content-center'>
        <Col md='6' lg='9'>
          <section className='text-center pb-3'>
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
                      <Link to='/uploadCsv' className='p-2'>
                        <Button color='primary'>ADD STUDENTS</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
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
                      <Link to='/uploadModel' className='p-2'>
                        <Button color='primary'>UPLOAD MODEL ANSWERS</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
            </Row>
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
                      <Link to='/uploadPdf' className='p-2'>
                        <Button color='primary'>UPLOAD ANSWERS PDF</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
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
                      <Link to='/generateResult' className='p-2'>
                        <Button color='primary'>GRADE PAPERS</Button>{" "}
                      </Link>
                    </span>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashboardPage;
