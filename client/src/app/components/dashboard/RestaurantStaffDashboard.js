import React, { Component, Fragment } from "react";
import { Grid, Header } from "semantic-ui-react";
import RestaurantAccountNav from "../restaurant/RestaurantAccountNav";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

class RestaurantStaffDashboard extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>RestaurantStaffDashboard</Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <RestaurantAccountNav />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(RestaurantStaffDashboard);
