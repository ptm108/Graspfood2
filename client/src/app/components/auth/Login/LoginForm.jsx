import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../util/form/TextInput";
import { login } from "../authActions";
import { connect } from "react-redux";

const mapDispatchToProps = {
  login
};

const LoginForm = ({ login, handleSubmit, error, submitting }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)} autoComplete="off">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="Password"
        />
        {error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
        <Button loading={submitting} fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>Or</Divider>
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "loginForm" })(LoginForm));
