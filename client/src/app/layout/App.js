import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import DashBoard from "../components/home/Dashboard";
import NavBar from "../components/home/NavBar";
//import axios from "axios";
import LoginPage from "../components/auth/Login/LoginPage";
import { Container } from "semantic-ui-react"

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Route exact path="/dashboard" component={DashBoard} />{" "}
        <Container className="main">
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
