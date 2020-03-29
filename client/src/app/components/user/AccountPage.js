import React, { Component, Fragment } from "react";
import PastOrders from "../customer/PastOrders";
import ReviewPostings from "../customer/ReviewPostings";
import { Grid, Header } from "semantic-ui-react";
import AccountNav from "../customer/AccountNav";
import { connect } from "react-redux";
import RestaurantAccountNav from "../restaurant/RestaurantAccountNav";

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

class AccountPage extends Component {
  render() {
    const { currentUser } = this.props;
    const accessRight = currentUser.accessright;
    console.log(currentUser);
    return (
      <Fragment>
        {accessRight === 4 && (
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
        )}
        {accessRight === 1 && (
          <Fragment>
            <Grid>
              <Grid.Column width={12}>
                <Header content="Account Page" />
              </Grid.Column>
              <Grid.Column width={4}>
                <RestaurantAccountNav />
              </Grid.Column>
            </Grid>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(AccountPage);
