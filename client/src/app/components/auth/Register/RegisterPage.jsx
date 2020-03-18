import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid } from "semantic-ui-react";
import RegisterForm from "./RegisterForm";

class RegisterPage extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Column width={3} only="computer" />
          <Grid.Column width={10} only="computer">
            <RegisterForm />
          </Grid.Column>
          <Grid.Column width={3} only="computer" />
          <Grid.Column width={16} only="tablet">
            <RegisterForm />
          </Grid.Column>
          <Grid.Column width={16} only="mobile">
            <RegisterForm />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default connect(null, null)(RegisterPage);
