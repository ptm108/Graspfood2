import React, { Component, Fragment } from "react";
import PastOrders from "../customer/PastOrders";
import ReviewPostings from "../customer/ReviewPostings";
import { Grid, Header } from "semantic-ui-react";
import AccountNav from "./AccountNav";
import { connect } from "react-redux";
import { fetchCustomerDetails } from "../customer/customerUtils/customerActions";

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  userDetails: state.customer.userDetails[0]
});

const mapDispatchToProps = { fetchCustomerDetails };

class AccountPage extends Component {
  componentDidMount() {
    if (this.props.currentUser.accessright == 4) {
      this.props.fetchCustomerDetails(this.props.currentUser);
    } else if (this.props.currentUser.accessright == 3) {
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
            <Header>Name: {userDetails.cname}</Header>
            {accessRight === 4 && (
              <Header>Reward Points: {userDetails.rewardpoints}</Header>
            )}
            {accessRight === 4 && <ReviewPostings />}
            {accessRight === 4 && <PastOrders />}
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
