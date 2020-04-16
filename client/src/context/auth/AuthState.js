import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CONTACT_ERROR,
  GET_STUDENT,
  GET_ALLSTUDENTS,
  STUDENT_ERROR,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuth: null,
    loading: true,
    error: null,
    isAdmin: false,
    students: null,
    student: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Load User
  const loadUser = async () => {
    //load tokeen to global
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      console.log(state.isAdmin);
    } catch (e) {
      dispatch({
        type: AUTH_ERROR,
        payload: e.response.data.msg,
      });
    }
  };

  //Register
  const register = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response.data.msg,
      });
    }
  };

  //Login
  const login = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      console.log(res.data.user, state.isAdmin);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      console.log(res.data.user, state.isAdmin);

      loadUser();
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
        payload: e.response.data.msg,
      });
    }
  };

  //Logout
  const logout = () => dispatch({ type: LOGOUT });

  //Clear Error
  const clearError = () => {
    dispatch({
      type: CONTACT_ERROR,
    });
  };

  const getAllStudents = async () => {
    try {
      const res = await axios.get("/api/paper/allStudents");

      dispatch({
        type: GET_ALLSTUDENTS,
        payload: res.data,
      });
      console.log(res.data.students);
    } catch (e) {
      dispatch({
        type: STUDENT_ERROR,
        payload: e.response.data.msg,
      });
    }
  };

  const getStudent = async (id) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/paper/Student", id, config);
      console.log(res.data.student);

      dispatch({
        type: GET_STUDENT,
        payload: res.data,
      });
      console.log(res.data);
    } catch (e) {
      dispatch({
        type: STUDENT_ERROR,
        payload: e.response.data.msg,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loading: state.loading,
        isAuth: state.isAuth,
        isAdmin: state.isAdmin,
        error: state.error,
        students: state.students,
        student: state.student,
        register,
        login,
        loadUser,
        logout,
        clearError,
        getAllStudents,
        getStudent,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
