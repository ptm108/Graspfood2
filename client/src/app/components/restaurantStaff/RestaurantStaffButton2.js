import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Header, Grid, Button, Table } from "semantic-ui-react";
import AccountNav from "../user/AccountNav";
import {
  fetchRestaurantDetails,
  fetchPromoDetails,
} from "./restaurantStaffActions";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  restaurantDetails: state.restaurantStaff.restaurantDetails,
  promoDetails: state.restaurantStaff.promoDetails,
});

const mapDispatchToProps = { fetchRestaurantDetails, fetchPromoDetails };

class RestaurantStaffButton2 extends Component {
  componentDidMount() {
    this.props.fetchRestaurantDetails(this.props.currentUser);
    this.props.fetchPromoDetails(this.props.restaurantDetails[0]);
  }

  render() {
    const { restaurantDetails, promoDetails } = this.props;
    //console.log(promoDetails);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>Restaurant Staff Summary Info 2</Header>
            <Header>
              Restaurant:{" "}
              {restaurantDetails &&
                restaurantDetails[0].rname +
                  ", " +
                  restaurantDetails[0].streetname +
                  " #" +
                  restaurantDetails[0].unitno}
            </Header>

            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Promo Code</Table.HeaderCell>
                  <Table.HeaderCell>Duration of Promo Code</Table.HeaderCell>
                  <Table.HeaderCell>
                    Avg Number of Orders Received During The Promo
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {promoDetails &&
                  promoDetails.map((promo) => (
                    <Fragment>
                      <Table.Row>
                        <Table.Cell>{promo.promocode}</Table.Cell>
                        <Table.Cell>{promo.days} days</Table.Cell>
                        <Table.Cell>
                          {promo.count > 0
                            ? (parseInt(promo.count) / promo.days).toFixed(5)
                            : 0}
                        </Table.Cell>
                      </Table.Row>
                    </Fragment>
                  ))}
              </Table.Body>
            </Table>
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
)(RestaurantStaffButton2);
