import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  Spinner
} from "reactstrap";
import src1 from "../assets/login.svg";
import AuthContext from "../context/auth/authContext";

const LoginPage = props => {
  //start

  const authContext = useContext(AuthContext);

  const { isAuth, error, login, isAdmin } = authContext;
  const [user, setuser] = useState({
    rollNo: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const { rollNo, password } = user;

  useEffect(() => {
    if (isAuth) {
      console.log(isAdmin);
      if (isAdmin) {
        alert("LOGGED IN");
        setLoading(false);
        props.history.push("/dashboard");
      } else {
        console.log("non");
        alert("LOGGED IN");
        setLoading(false);
        props.history.push("/profile");
      }
    } else {
    }

    if (error === "Invalid Email or Password") {
      setLoading(false);

      alert(error);
    }
    // eslint-disable-next-line
  }, [error, isAuth, props.history, isAdmin]);

  const onChange = e => {
    setuser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);

    if (rollNo === "" || password === "") {
      // setAlert("Please enter all fields", "danger");
    } else {
      login({
        rollNo,
        password
      });
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
      <div className='container-fluid'>
        <Card className='loginCard'>
          <Row className='justify-content-center align-middle'>
            <Col md='4' className=''>
              <CardImg className='img-fluid' src={src1} />
            </Col>
            <Col md='2' className='mb-5'></Col>
            <Col md='4' className='mb-5 loginData text-center'>
              <CardBody>
                <form onSubmit={onSubmit}>
                  <h2>
                    <b>Member Login</b>
                  </h2>
                  <br />
                  <FormGroup>
                    <Input
                      autoFocus
                      type='text'
                      name='rollNo'
                      value={rollNo}
                      placeholder='Roll Number'
                      onChange={onChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type='password'
                      placeholder='Password'
                      name='password'
                      value={password}
                      onChange={onChange}
                      required
                    />
                  </FormGroup>
                  <Button block type='submit' className='btn-success mt-5'>
                    Login
                  </Button>
                </form>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
};
export default LoginPage;
