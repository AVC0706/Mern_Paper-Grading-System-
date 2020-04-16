import React from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "reactstrap";

const Student = ({ student }) => {
  if (student.rollNo !== "rollNo") {
    return (
      <React.Fragment>
        <tr>
          <td> {student.rollNo} </td>
          <td> {student.name} </td>
          <td> {student.subject1} </td>
          <td>
            {" "}
            {student.subject1 === "Not Checked" ? (
              <span>Not Uploaded</span>
            ) : (
              <Button color='primary'>
                <a href={student.paper1} download>
                  {" "}
                  VIEW
                </a>
              </Button>
            )}{" "}
          </td>

          <td> {student.subject2} </td>
          <td>
            {" "}
            {student.subject2 === "Not Checked" ? (
              <span>Not Uploaded</span>
            ) : (
              <Button color='primary'>
                <a href={student.paper} download>
                  {" "}
                  VIEW
                </a>
              </Button>
            )}{" "}
          </td>
        </tr>
      </React.Fragment>
    );
  } else {
    return <tr></tr>;
  }
};

export default Student;
