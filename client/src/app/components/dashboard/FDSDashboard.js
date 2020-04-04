import React, { Component, Fragment } from "react";
import { Grid, Button } from "semantic-ui-react";
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
            <br />
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>4</Button>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(null, null)(FDSDashboard);
