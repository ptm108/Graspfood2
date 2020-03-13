import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import DashBoard from "../components/home/Dashboard";
import NavBar from "../components/home/NavBar";
//import axios from "axios";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Route exact path="/dashboard" component={DashBoard} />{" "}
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
