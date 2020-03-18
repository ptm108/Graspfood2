import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "semantic-ui-react";
import LoginForm from "./LoginForm";

class LoginPage extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Column width={5} only="computer" />
          <Grid.Column width={6} only="computer">
            <LoginForm />
          </Grid.Column>
          <Grid.Column width={5} only="computer" />
          <Grid.Column width={16} only="tablet">
            <LoginForm />
          </Grid.Column>
          <Grid.Column width={16} only="mobile">
            <LoginForm />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default connect(null, null)(LoginPage);
