import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
<<<<<<< HEAD
import DashBoard from "../components/home/Dashboard";
import NavBar from "../components/home/NavBar";
//import axios from "axios";
=======
import LoginPage from "../components/auth/Login/LoginPage";
import { Container } from "semantic-ui-react"
>>>>>>> 5b8321b2eb71a03a4a88f7f7fc97720afc5bd123

class App extends Component {
  render() {
    return (
      <Fragment>
<<<<<<< HEAD
        <NavBar />
        <Route exact path="/dashboard" component={DashBoard} />{" "}
=======
        <Container className="main">
          <Route exact path="/" component={LoginPage} />
        </Container>
>>>>>>> 5b8321b2eb71a03a4a88f7f7fc97720afc5bd123
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
