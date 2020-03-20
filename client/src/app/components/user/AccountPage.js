import React, { Component } from "react";
import PastOrders from "../customer/PastOrders";
import ReviewPostings from "../customer/ReviewPostings";
import { Grid, Header } from "semantic-ui-react";
import AccountNav from "../customer/AccountNav";

class AccountPage extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <Header content="Account Page" />
          <ReviewPostings />
          <PastOrders />
        </Grid.Column>
        <Grid.Column width={4}>
          <AccountNav />
        </Grid.Column>
      </Grid>
    );
  }
}

export default AccountPage;
