import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import RegisterForm from "./RegisterForm";

class RegisterPage extends Component {
    render() {
        return (
            <Container>
                <RegisterForm />
            </Container>
        );
    }
}

export default connect(
    null,
    null
  )(RegisterPage);