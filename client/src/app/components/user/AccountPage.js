import React, { Component, Fragment } from "react";
import PastOrders from "../customer/PastOrders";
import ReviewPostings from "../customer/ReviewPostings";
import { Grid, Header } from "semantic-ui-react";
import AccountNav from "./AccountNav";
import { connect } from "react-redux";
import { fetchCustomerDetails } from "../customer/customerUtils/customerActions";
import { fetchRiderDetails } from "../deliveryRider/riderUtils/riderActions";

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  userDetails: state.customer.userDetails[0]
});

const mapDispatchToProps = { fetchCustomerDetails, fetchRiderDetails };

class AccountPage extends Component {
  componentDidMount() {
    if (this.props.currentUser.accessright == 4) {
      this.props.fetchCustomerDetails(this.props.currentUser);
    } else if (this.props.currentUser.accessright == 3) {
      this.props.fetchRiderDetails(this.props.currentUser);
    }
  }

  render() {
    const { currentUser, userDetails } = this.props;
    const accessRight = currentUser.accessright;
    console.log(userDetails);
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header content="Account Page" />
            {accessRight === 4 && (
              <Fragment>
                <Header>Customer Name: {userDetails.cname}</Header>
                <Header>Reward Points: {userDetails.rewardpoints}</Header>
              </Fragment>
            )}
            {accessRight === 4 && <ReviewPostings />}
            {accessRight === 4 && <PastOrders />}

            {accessRight === 3 && (
              <Fragment>
                <Header>Rider Name: {userDetails.drname}</Header>
                <Header sub>
                  Rider Rating: {userDetails.deliveryriderrating}
                </Header>
              </Fragment>
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
