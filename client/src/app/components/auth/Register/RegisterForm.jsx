import React, { useState } from "react";
import { Label, Form, Segment, Button, Divider, Icon } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../util/form/TextInput";
import { connect } from "react-redux";
import { register } from "../authActions";
import { combineValidators, isRequired } from "revalidate";
import RadioInput from "../../../util/form/RadioInput";
import { Link } from "react-router-dom";

const mapDispatchToProps = {
  register
};

const validate = combineValidators({
  displayUserName: isRequired("Username"),
  password: isRequired("Password")
});

const RegisterForm = ({
  handleSubmit,
  register,
  error,
  invalid,
  submitting
}) => {
  const [dr, setDr] = useState(0);

  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(register)} autoComplete="off">
        <Segment>
          <Field
            name="username"
            type="text"
            component={TextInput}
            placeholder="Username"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && (
            <Label basic color="red">
              <Icon name="x" />
              {error}
            </Label>
          )}
          <Form.Group inline>
            <label>Sign Up As: </label>
            <Field
              name="accessRight"
              type="radio"
              value="4"
              label="Customer"
              component={RadioInput}
              onChange={() => {
                setDr(4);
              }}
            />
            <Field
              name="accessRight"
              type="radio"
              value="3"
              label="DeliveryRider"
              component={RadioInput}
              onChange={() => {
                setDr(3);
              }}
            />
            <Field
              name="accessRight"
              type="radio"
              value="1"
              label="RestaurantStaff"
              component={RadioInput}
              onChange={() => {
                setDr(1);
              }}
            />
            <Field
              name="accessRight"
              type="radio"
              value="2"
              label="FDSStaff"
              component={RadioInput}
              onChange={() => {
                setDr(2);
              }}
            />
          </Form.Group>
          {dr === 3 && 
          <Form.Group inline>
          <label>Schedule Type: </label>
          <Field
              name="deliveryRiderType"
              type="radio"
              value="parttime"
              label="Part Time"
              component={RadioInput}
            />
            <Field
              name="deliveryRiderType"
              type="radio"
              value="fulltime"
              label="Full Time"
              component={RadioInput}
            />
          </Form.Group>}
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="grey"
            loading={submitting}
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <Button as={Link} to="/dashboard" size="large" color="black" fluid>
            Login
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
