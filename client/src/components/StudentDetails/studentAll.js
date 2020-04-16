import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Table } from "react-bootstrap";
import Student from "./Student";
const studentAll = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.getAllStudents();
    console.log(authContext.students);
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Roll NO.</th>
          <th>Name</th>
          <th>Subject 1</th>
          <th>Paper 1 </th>
          <th>Subject 2</th>
          <th>Paper 2</th>
        </tr>
      </thead>
      <tbody>
        {authContext.students !== null ? (
          authContext.students.map((student) => (
            <Student key={student.id} student={student} />
          ))
        ) : (
          <tr></tr>
        )}
      </tbody>
    </Table>
  );
};

export default studentAll;
