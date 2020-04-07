import React, { Fragment } from "react";
import { Header, Grid, Button, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import AccountNav from "../user/AccountNav";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import { fetchNewCustomers, fetchOrdersByMonth } from "./fdsUtils/fdsActions";

const mapStateToProps = (state) => ({
  numNewCustomers: state.fds.newCustomers,
  ordersByMonth: state.fds.ordersByMonth,
});

const mapDispatchToProps = { fetchNewCustomers, fetchOrdersByMonth };

class FDSButton1 extends Component {
  componentDidMount() {
    this.props.fetchNewCustomers();
    this.props.fetchOrdersByMonth();
  }

  render() {
    const { numNewCustomers, ordersByMonth } = this.props;
    console.log(numNewCustomers);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>FDS Manager Summary Information 1</Header>
            <Header sub>For January</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    Total Number of New Customers
                  </Table.HeaderCell>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>Total Cost of All Orders</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {
                      numNewCustomers.filter((newCustomer) => {
                        for (let i = 0; i < ordersByMonth.length; i++) {
                          if (
                            ordersByMonth[i].month <= 1 &&
                            newCustomer.uid === ordersByMonth[i].uid
                          ) {
                            console.log(newCustomer.uid);
                            return false;
                          }
                        }
                        return true;
                      }).length
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {ordersByMonth &&
                      ordersByMonth.filter((order) => order.month === 1).length}
                  </Table.Cell>
                  <Table.Cell>
                    $
                    {ordersByMonth &&
                      ordersByMonth
                        .filter((order) => order.month === 1)
                        .map((order) => {
                          return parseFloat(order.totalprice);
                        })
                        .reduce((a, b) => a + b, 0)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Header sub>For February</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    Total Number of New Customers
                  </Table.HeaderCell>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>Total Cost of All Orders</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {
                      numNewCustomers.filter((newCustomer) => {
                        for (let i = 0; i < ordersByMonth.length; i++) {
                          if (
                            ordersByMonth[i].month <= 2 &&
                            newCustomer.uid === ordersByMonth[i].uid
                          ) {
                            console.log(newCustomer.uid);
                            return false;
                          }
                        }
                        return true;
                      }).length
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {ordersByMonth &&
                      ordersByMonth.filter((order) => order.month === 2).length}
                  </Table.Cell>
                  <Table.Cell>
                    $
                    {ordersByMonth &&
                      ordersByMonth
                        .filter((order) => order.month === 2)
                        .map((order) => {
                          return parseFloat(order.totalprice);
                        })
                        .reduce((a, b) => a + b, 0)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Header sub>For March</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    Total Number of New Customers
                  </Table.HeaderCell>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>Total Cost of All Orders</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {
                      numNewCustomers.filter((newCustomer) => {
                        for (let i = 0; i < ordersByMonth.length; i++) {
                          if (
                            ordersByMonth[i].month <= 3 &&
                            newCustomer.uid === ordersByMonth[i].uid
                          ) {
                            console.log(newCustomer.uid);
                            return false;
                          }
                        }
                        return true;
                      }).length
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {ordersByMonth &&
                      ordersByMonth.filter((order) => order.month === 3).length}
                  </Table.Cell>
                  <Table.Cell>
                    $
                    {ordersByMonth &&
                      ordersByMonth
                        .filter((order) => order.month === 3)
                        .map((order) => {
                          return parseFloat(order.totalprice);
                        })
                        .reduce((a, b) => a + b, 0)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Header sub>For April</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    Total Number of New Customers
                  </Table.HeaderCell>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>Total Cost of All Orders</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {
                      numNewCustomers.filter((newCustomer) => {
                        for (let i = 0; i < ordersByMonth.length; i++) {
                          if (
                            ordersByMonth[i].month <= 4 &&
                            newCustomer.uid === ordersByMonth[i].uid
                          ) {
                            console.log(newCustomer.uid);
                            return false;
                          }
                        }
                        return true;
                      }).length
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {ordersByMonth &&
                      ordersByMonth.filter((order) => order.month === 4).length}
                  </Table.Cell>
                  <Table.Cell>
                    $
                    {ordersByMonth &&
                      ordersByMonth
                        .filter((order) => order.month === 4)
                        .map((order) => {
                          return parseFloat(order.totalprice);
                        })
                        .reduce((a, b) => a + b, 0)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
            <br />
            <Button as={NavLink} to="/fdsinfo1">
              1
            </Button>
            <Button as={NavLink} to="/fdsinfo2">
              2
            </Button>
            <Button as={NavLink} to="/fdsinfo3">
              3
            </Button>
            <Button as={NavLink} to="/fdsinfo4">
              4
            </Button>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FDSButton1);
