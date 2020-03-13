import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
//import axios from "axios";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={} />
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
