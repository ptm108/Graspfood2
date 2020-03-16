import React from "react";
import { Label, Form, Segment, Button, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import { connect } from "react-redux";
import { registerUser } from "../authActions";
import { combineValidators, isRequired } from "revalidate";
import RadioInput from "../../form/RadioInput";

const mapDispatchToProps = {
  registerUser
};

const validate = combineValidators({
  displayUserName: isRequired("username"),
  password: isRequired("password")
});

const RegisterForm = ({
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting
}) => {
  return (
    <div>
      <Form
        size="large"
        onSubmit={handleSubmit(registerUser)}
        autoComplete="off"
      >
        <Segment>
          <Field
            name="username"
            type="text"
            component={TextInput}
            placeholder="UserName"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Form.Group inline>
            <label>Sign Up As: </label>
            <Field
              name="userType"
              type="radio"
              value="customer"
              label="Customer"
              component={RadioInput}
            />
            <Field
              name="userType"
              type="radio"
              value="deliveryRider"
              label="DeliveryRider"
              component={RadioInput}
            />
            <Field
              name="userType"
              type="radio"
              value="restaurantStaff"
              label="RestaurantStaff"
              component={RadioInput}
            />
            <Field
              name="userType"
              type="radio"
              value="fdsStaff"
              label="FDSStaff"
              component={RadioInput}
            />
          </Form.Group>
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal"
            loading={submitting}
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "registerForm", validate })(RegisterForm));

