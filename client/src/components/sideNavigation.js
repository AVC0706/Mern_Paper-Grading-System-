import React, { Fragment, useContext, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const TopNavigation = () => {
  const authContext = useContext(AuthContext);
  const { isAuth, logout, user, loadUser, isAdmin } = authContext;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    }
    console.log(isAdmin);
    console.log(user);
    // eslint-disable-next-line
  }, [isAdmin]);

  const onLogout = () => {
    logout();
    // clearContacts();
  };

  const adminLinks = (
    <Fragment>
      <div className='sidebar-fixed position-fixed'>
        <ListGroup className='list-group-flush mt-5'>
          <NavLink exact={true} to='/dashboard' activeClassName='activeClass'>
            <ListGroupItem>Dashboard</ListGroupItem>
          </NavLink>
          <NavLink exact={true} to='/allStudents' activeClassName='activeClass'>
            <ListGroupItem>View Students</ListGroupItem>
          </NavLink>
          <NavLink to='/login' activeClassName='activeClass' onClick={onLogout}>
            <ListGroupItem>Logout</ListGroupItem>
          </NavLink>
        </ListGroup>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <div className='sidebar-fixed position-fixed'>
        <ListGroup className='list-group-flush mt-5'>
          <NavLink to='/login' activeClassName='activeClass'>
            <ListGroupItem>Login</ListGroupItem>
          </NavLink>
        </ListGroup>
      </div>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <div className='sidebar-fixed position-fixed'>
        <ListGroup className='list-group-flush mt-5'>
          <NavLink exact={true} to='/profile' activeClassName='activeClass'>
            <ListGroupItem>Profile</ListGroupItem>
          </NavLink>
          <NavLink to='/login' activeClassName='activeClass'>
            <ListGroupItem>
              {" "}
              <a onClick={onLogout} href='/login'>
                {" "}
                Logout
              </a>
            </ListGroupItem>
          </NavLink>
        </ListGroup>
      </div>
    </Fragment>
  );

  if (isAuth) {
    if (isAdmin) {
      return (
        <Fragment>
          <div className='sidebar-fixed position-fixed'>
            <ListGroup className='list-group-flush mt-5'>
              <NavLink
                exact={true}
                to='/dashboard'
                activeClassName='activeClass'
              >
                <ListGroupItem>Dashboard</ListGroupItem>
              </NavLink>

              <NavLink to='/allStudents' activeClassName='activeClass'>
                <ListGroupItem>View Students</ListGroupItem>
              </NavLink>

              <NavLink
                to='/login'
                activeClassName='activeClass'
                onClick={onLogout}
              >
                <ListGroupItem>Logout</ListGroupItem>
              </NavLink>
            </ListGroup>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className='sidebar-fixed position-fixed'>
            <ListGroup className='list-group-flush mt-5'>
              <NavLink exact={true} to='/profile' activeClassName='activeClass'>
                <ListGroupItem>Profile</ListGroupItem>
              </NavLink>
              <NavLink
                to='/login'
                activeClassName='activeClass'
                onClick={onLogout}
              >
                <ListGroupItem>Logout</ListGroupItem>
              </NavLink>
            </ListGroup>
          </div>
        </Fragment>
      );
    }
  } else {
    return (
      <Fragment>
        <div className='sidebar-fixed position-fixed'>
          <ListGroup className='list-group-flush mt-5'>
            <NavLink to='/login' activeClassName='activeClass'>
              <ListGroupItem>Login</ListGroupItem>
            </NavLink>
          </ListGroup>
        </div>
      </Fragment>
    );
  }
};

export default TopNavigation;
