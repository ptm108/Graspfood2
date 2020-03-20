import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CustomerDashboard from "./CustomerDashboard";
import RestaurantStaffDashboard from "./RestaurantStaffDashboard";
import FDSDashboard from "./FDSDashboard";
import RiderDashboard from "./RiderDashboard";
import LoginPage from "../auth/Login/LoginPage";

const mapStateToProps = state => ({
  auth: state.auth.authenticated,
  userAccessRight: state.auth.userAccessRight
});

class DashBoard extends Component {
  render() {
    const { auth, userAccessRight } = this.props;
    const authenticated = auth;
    console.log(userAccessRight);

    if (!authenticated) {
      return <LoginPage />;
    } else {
      return (
        // to add the checks for the access right
        <Fragment>
          {userAccessRight === 4 && <CustomerDashboard />}
          {userAccessRight === 1 && <RestaurantStaffDashboard />}
          {userAccessRight === 2 && <FDSDashboard />}
          {userAccessRight === 3 && <RiderDashboard />}
        </Fragment>
      );
    }
  }
}

export default connect(mapStateToProps)(DashBoard);
