import React, { Component, Fragment } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import AccountNav from "../user/AccountNav";

class FDSDashboard extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <h2>FDSDashboard</h2>
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(null, null)(FDSDashboard);
