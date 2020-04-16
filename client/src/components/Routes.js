import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import ProfilePage from "./ProfilePage";
import LoginPage from "./LoginPage";
import FileUpload from "./Upload/FileUpload";
import ModelAnswer from "./Upload/ModelAnswer";
import PdfAnswer from "./Upload/PdfAnswer";
import GenerateResult from "./GenrateResult/GenerateResult";
import studentAll from "./StudentDetails/studentAll";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/uploadCsv' component={FileUpload} />
        <Route path='/uploadPdf' component={PdfAnswer} />
        <Route path='/uploadModel' component={ModelAnswer} />
        <Route path='/generateResult' component={GenerateResult} />
        <Route path='/allStudents' component={studentAll} />
      </Switch>
    );
  }
}

export default Routes;
