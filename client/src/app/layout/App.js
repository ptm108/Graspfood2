import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import CustomerDashBoard from "../components/home/customer/CustomerDashboard";
import NavBar from "../components/home/NavBar";
//import axios from "axios";
import LoginPage from "../components/auth/Login/LoginPage";
import { Container } from "semantic-ui-react";
import AccountPage from "../components/home/customer/AccountPage";
import ChangePassword from "../components/home/ChangePassword";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className="main">
          <Route exact path="/custdashboard" component={CustomerDashBoard} />
          <Route exact path="/about" component={AccountPage} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/fdsdashboard" />
          <Route exact path="/riderdashboard" />
          <Route exact path="/" component={LoginPage} />
        </Container>
      </Fragment>
    );
  }
}

export default App;

/* axios
  .get("/api/get/test")
  .then(res =>
    console.log(res.data)
  ); */
