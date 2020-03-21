import React, { Component, Fragment } from "react";
import { Grid, Menu, Header, Button } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import ChangePassword from "../user/ChangePassword";
import { SIGN_OUT_USER } from "../auth/authConstants";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch({ type: SIGN_OUT_USER });
    }
  };
};

const AccountNav = ({ signOut, history }) => {
  return (
    <Fragment>
      <Grid.Column width={6}>
        <Menu vertical size="large">
          <Header attached inverted content="Account" />
          <Menu.Item as={NavLink} to="/about">
            Account Info
          </Menu.Item>
          <Menu.Item as={NavLink} to="/changepassword">
            Change Password
          </Menu.Item>
          <Menu.Item as={NavLink} to="/creditcard">
            Add/Remove Credit Card
          </Menu.Item>
          <Menu.Item>
            <Button fluid onClick={signOut} as={NavLink} to="/dashboard">
              Log Out
            </Button>
          </Menu.Item>
        </Menu>
      </Grid.Column>
    </Fragment>
  );
};

export default withRouter(connect(null, mapDispatchToProps)(AccountNav));
