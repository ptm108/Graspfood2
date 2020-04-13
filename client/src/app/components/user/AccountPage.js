import React, { Component, Fragment } from "react";
import PastOrders from "../customer/PastOrders";
import ReviewPostings from "../customer/ReviewPostings";
import { Grid, Header, Segment } from "semantic-ui-react";
import AccountNav from "./AccountNav";
import { connect } from "react-redux";
import { fetchCustomerDetails } from "../customer/customerUtils/customerActions";
import { fetchRiderDetails } from "../deliveryRider/riderUtils/riderActions";
import OrderList from "../order/OrderList";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  userDetails: state.customer.userDetails,
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
            <Segment inverted>
              <Header as="h3" content="Account Page" />
            </Segment>

            {accessRight === 4 && (
              <Segment>
                <Header content="Customer Details" />
                Customer Name: {userDetails && userDetails[0].cname}
                <br />
                Reward Points: {userDetails && userDetails[0].rewardpoints}
              </Segment>
            )}
            {accessRight === 4 && <ReviewPostings />}
            {accessRight === 4 && <OrderList />}

            {accessRight === 3 && (
              <Fragment>
                <Header>
                  Rider Name: {userDetails && userDetails[0].drname}
                </Header>
                <Header sub>
                  Rider Rating:{" "}
                  {userDetails && userDetails[0].deliveryriderrating}
                </Header>
              </Fragment>
            )}

            {accessRight === 1 && (
              <Segment>
                <Header>Staff Name:</Header>
                {currentUser.rsname}
                <Header>Restaurant Id:</Header>
                {currentUser.rid}
              </Segment>
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
