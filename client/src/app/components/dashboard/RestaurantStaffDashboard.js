import React, { Component, Fragment } from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import AccountNav from "../user/AccountNav";
import { fetchRestaurantDetails } from "../restaurantStaff/restaurantStaffActions";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  restaurantDetails: state.restaurantStaff.restaurantDetails,
});

const mapDispatchToProps = { fetchRestaurantDetails };

class RestaurantStaffDashboard extends Component {
  componentDidMount() {
    this.props.fetchRestaurantDetails(this.props.currentUser);
  }

  render() {
    const { currentUser, restaurantDetails } = this.props;
    //console.log(currentUser.uid);
    return (
      <Fragment>
        <Grid>
          {restaurantDetails[0] && (
            <Grid.Column width={12}>
              <Header>RestaurantStaffDashboard</Header>
              <Header>
                Restaurant: {restaurantDetails && restaurantDetails[0].rname}
              </Header>
              <Header>
                Staff Name: {restaurantDetails && restaurantDetails[0].rsname}
              </Header>
              <Header.Content>
                Press the buttons on the right to view this restaurant's summary
                info
              </Header.Content>
            </Grid.Column>
          )}
          <Grid.Column width={4}>
            <AccountNav />
            <br />
            <Button as={NavLink} to="/restaurantStaffInfo1">
              1
            </Button>
            <Button as={NavLink} to="/restaurantStaffInfo2">
              2
            </Button>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantStaffDashboard);
