import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import LoginPage from "../components/auth/Login/LoginPage";
import { Container } from "semantic-ui-react"

class App extends Component {
  render() {
    return (
      <Fragment>
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
