import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Header, Grid, Button, Table } from "semantic-ui-react";
import AccountNav from "../user/AccountNav";
import {
  fetchRestaurantDetails,
  fetchRestaurantTotalOrdersAndCost,
  fetchTopFiveFood,
} from "./restaurantStaffActions";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  restaurantDetails: state.restaurantStaff.restaurantDetails,
  totalOrdersDetails: state.restaurantStaff.totalOrdersDetails,
  topFiveFood: state.restaurantStaff.topFiveFood,
});

const mapDispatchToProps = {
  fetchRestaurantDetails,
  fetchRestaurantTotalOrdersAndCost,
  fetchTopFiveFood,
};

class RestaurantStaffButton1 extends Component {
  componentDidMount() {
    this.props.fetchRestaurantDetails(this.props.currentUser);
    this.props.fetchRestaurantTotalOrdersAndCost(
      this.props.restaurantDetails[0]
    );
    this.props.fetchTopFiveFood(this.props.restaurantDetails[0]);
  }

  render() {
    const { restaurantDetails, totalOrdersDetails, topFiveFood } = this.props;
    console.log(topFiveFood);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>Restaurant Staff Summary Info 1</Header>
            <Header>
              Restaurant: {restaurantDetails && restaurantDetails[0].rname}
            </Header>

            <Header sub>For January</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Cost of All Orders (Excluding Delivery Fees)
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Top 5 Favourite Food Items
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  {totalOrdersDetails &&
                    totalOrdersDetails
                      .filter((order) => order.month === 1)
                      .map((order) => (
                        <Fragment>
                          <Table.Cell>
                            {order.count ? order.count : 0}
                          </Table.Cell>
                          <Table.Cell>${order.sum ? order.sum : 0}</Table.Cell>
                        </Fragment>
                      ))}
                  {topFiveFood &&
                    topFiveFood
                      .filter((food) => food.month === 1)
                      .map((food) => (
                        <Fragment>
                          <Table.Cell>{food.fname} </Table.Cell>
                        </Fragment>
                      ))}
                </Table.Row>
              </Table.Body>
            </Table>

            <Header sub>For February</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Cost of All Orders (Excluding Delivery Fees)
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Top 5 Favourite Food Items
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  {totalOrdersDetails &&
                    totalOrdersDetails
                      .filter((order) => order.month === 2)
                      .map((order) => (
                        <Fragment>
                          <Table.Cell>
                            {order.count ? order.count : 0}
                          </Table.Cell>
                          <Table.Cell>${order.sum ? order.sum : 0}</Table.Cell>
                        </Fragment>
                      ))}
                  {topFiveFood &&
                    topFiveFood
                      .filter((food) => food.month === 2)
                      .map((food) => (
                        <Fragment>
                          <Table.Cell>{food.fname} </Table.Cell>
                        </Fragment>
                      ))}
                </Table.Row>
              </Table.Body>
            </Table>

            <Header sub>For March</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Cost of All Orders (Excluding Delivery Fees)
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Top 5 Favourite Food Items
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  {totalOrdersDetails &&
                    totalOrdersDetails
                      .filter((order) => order.month === 3)
                      .map((order) => (
                        <Fragment>
                          <Table.Cell>
                            {order.count ? order.count : 0}
                          </Table.Cell>
                          <Table.Cell>${order.sum ? order.sum : 0}</Table.Cell>
                        </Fragment>
                      ))}
                  {topFiveFood &&
                    topFiveFood
                      .filter((food) => food.month === 3)
                      .map((food) => (
                        <Fragment>
                          <Table.Cell>{food.fname} </Table.Cell>
                        </Fragment>
                      ))}
                </Table.Row>
              </Table.Body>
            </Table>

            <Header sub>For April</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Cost of All Orders (Excluding Delivery Fees)
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Top 5 Favourite Food Items
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  {totalOrdersDetails &&
                    totalOrdersDetails
                      .filter((order) => order.month === 4)
                      .map((order) => (
                        <Fragment>
                          <Table.Cell>
                            {order.count ? order.count : 0}
                          </Table.Cell>
                          <Table.Cell>${order.sum ? order.sum : 0}</Table.Cell>
                        </Fragment>
                      ))}
                  {topFiveFood &&
                    topFiveFood
                      .filter((food) => food.month === 4)
                      .map((food) => (
                        <Fragment>
                          <Table.Cell>{food.fname} </Table.Cell>
                        </Fragment>
                      ))}
                </Table.Row>
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
)(RestaurantStaffButton1);
