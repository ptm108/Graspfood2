import React, { Component, Fragment } from "react";
import { Grid, Menu, Header } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import ChangePassword from "./ChangePassword";

const AccountNav = () => {
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
        </Menu>
      </Grid.Column>
    </Fragment>
  );
};

export default AccountNav;
