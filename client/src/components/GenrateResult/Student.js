import React from "react";
import PropTypes from "prop-types";

const Students = ({ student }) => {
  if (student.rollNo !== "rollNo") {
    return (
      <React.Fragment>
        <tr>
          <td> {student.rollNo} </td>
          <td> {student.name} </td>
          <td> {student.subject1} </td>
          <td> {student.subject2} </td>
        </tr>
      </React.Fragment>
    );
  } else {
    return <tr></tr>;
  }
};

export default Students;
