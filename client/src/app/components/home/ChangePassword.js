import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import AccountNav from "./AccountNav";

class ChangePassword extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <h1>change password form here</h1>
        </Grid.Column>
        <Grid.Column width={4}>
          <AccountNav />
        </Grid.Column>
      </Grid>
    );
  }
}

export default ChangePassword;
