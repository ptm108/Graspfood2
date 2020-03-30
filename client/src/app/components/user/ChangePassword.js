import React, { Component, Fragment } from "react";
import { Grid, Header, Form, Button } from "semantic-ui-react";
import AccountNav from "./AccountNav";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../util/form/TextInput";
import { changePassword } from "../auth/authActions";

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = { changePassword };

class ChangePassword extends Component {
  onChangePassword = values => {
    console.log(values);

    const user = {
      uid: this.props.currentUser.uid,
      username: this.props.currentUser.username,
      password: values.newpassword,
      accessright: this.props.currentUser.accessright
    };

    this.props.changePassword(user);
    this.props.history.push("/dashboard");
  };

  render() {
    const { currentUser, handleSubmit, submitting, history } = this.props;
    const accessRight = currentUser.accessright;
    console.log(history);
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>Change Your Password Here</Header>
            <Form
              onSubmit={handleSubmit(this.onChangePassword)}
              autoComplete="off"
            >
              <Field
                name="newpassword"
                type="password"
                component={TextInput}
                placeholder="New Password"
              />
              <Button disabled={submitting} loading={submitting}>
                Change Password
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "changePasswordForm" })(ChangePassword));
