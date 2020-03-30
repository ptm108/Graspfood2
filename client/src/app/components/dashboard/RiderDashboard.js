import React, { Component, Fragment } from "react";
import AccountNav from "../user/AccountNav";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

class RiderDashboard extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <h2>RiderDashboard</h2>
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(null, null)(RiderDashboard);
