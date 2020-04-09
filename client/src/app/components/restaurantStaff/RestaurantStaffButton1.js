import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Header, Grid, Button } from "semantic-ui-react";
import AccountNav from "../user/AccountNav";
import { fetchRestaurantDetails } from "./restaurantStaffActions";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  restaurantDetails: state.restaurantStaff.restaurantDetails,
});

const mapDispatchToProps = { fetchRestaurantDetails };

class RestaurantStaffButton1 extends Component {
  componentDidMount() {
    this.props.fetchRestaurantDetails(this.props.currentUser);
  }

  render() {
    const { restaurantDetails } = this.props;

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>Restaurant Staff Summary Info 1</Header>
            <Header>
              Restaurant: {restaurantDetails && restaurantDetails[0].rname}
            </Header>
          </Grid.Column>
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
)(RestaurantStaffButton1);
