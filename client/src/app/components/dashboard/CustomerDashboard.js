import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import RestaurantList from "../restaurant/RestaurantList";
import AccountNav from "../user/AccountNav";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  auth: state.auth.authenticated
});

class CustomerDashBoard extends Component {
  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated;
    return (
      <Grid>
        <Grid.Column width={12}>
          <RestaurantList />
        </Grid.Column>
        <Grid.Column width={4}>
          <AccountNav />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, null)(CustomerDashBoard);
