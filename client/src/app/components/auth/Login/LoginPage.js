import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import LoginForm from "./LoginForm";

class LoginPage extends Component {
    render() {
        return (
            <Container>
                <LoginForm />
            </Container>
        );
    }
}

export default connect(
    null,
    null
  )(LoginPage);