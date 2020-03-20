import React, { Component } from "react";
import AccountNav from "../AccountNav";
import { Grid } from "semantic-ui-react";

class CreditCard extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <h1>add/remove credit card here</h1>
        </Grid.Column>
        <Grid.Column width={4}>
          <AccountNav />
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreditCard;
