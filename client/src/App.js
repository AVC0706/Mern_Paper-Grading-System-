import React, { Component } from "react";
import Routes from "../src/components/Routes";
import SideNavigation from "./components/sideNavigation";
import "./index.css";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";

// if (localStorage.getItem("token")) {
//   setAuthToken(localStorage.getItem("token"));
// }

class App extends Component {
  render() {
    return (
      <AuthState>
        <div className='flexible-content'>
          <SideNavigation />
          <main id='content' className='p-5'>
            <Routes />
          </main>
        </div>
      </AuthState>
    );
  }
}

export default App;
