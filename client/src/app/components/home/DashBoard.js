import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CustomerDashboard from "./customer/CustomerDashboard";
import RestaurantStaffDashboard from "./restaurantstaff/RestaurantStaffDashboard";
import FDSDashboard from "./fds/FDSDashboard";
import RiderDashboard from "./rider/RiderDashboard";

const mapStateToProps = state => ({
  auth: state.auth.authenticated
});

class DashBoard extends Component {
  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated;

    return (
      // to add the checks for the access right
      <Fragment>
        <CustomerDashboard />
        <RestaurantStaffDashboard />
        <FDSDashboard />
        <RiderDashboard />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(DashBoard);
