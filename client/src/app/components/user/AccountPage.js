import React, { Component, Fragment } from "react";
import PastOrders from "../customer/PastOrders";
import ReviewPostings from "../customer/ReviewPostings";
import { Grid, Header } from "semantic-ui-react";
import AccountNav from "./AccountNav";
import { connect } from "react-redux";

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
        <Grid>
          <Grid.Column width={12}>
            <Header content="Account Page" />
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

export default connect(mapStateToProps, null)(AccountPage);
