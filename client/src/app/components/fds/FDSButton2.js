import React from "react";
import { Header, Grid, Button, Table } from "semantic-ui-react";
import { Component } from "react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import AccountNav from "../user/AccountNav";
import { connect } from "react-redux";
import {
  fetchAllCustomers,
  fetchOrdersByCustomer,
} from "./fdsUtils/fdsActions";

const mapStateToProps = (state) => ({
  allCustomers: state.fds.allCustomers,
  ordersByCustomer: state.fds.ordersByCustomer,
});

const mapDispatchToProps = { fetchAllCustomers, fetchOrdersByCustomer };

class FDSButton2 extends Component {
  componentDidMount() {
    this.props.fetchAllCustomers();
    this.props.fetchOrdersByCustomer();
  }

  render() {
    const { ordersByCustomer, allCustomers } = this.props;
    console.log(ordersByCustomer);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>FDS Manager Summary Information 2</Header>
            <Header sub>For January</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name of Customer</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Orders For This Month
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Cost of All Orders For This Month
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {ordersByCustomer &&
                  ordersByCustomer
                    .filter((order) => order.month === 1)
                    .map((order) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{order.cname}</Table.Cell>
                          <Table.Cell>{order.count}</Table.Cell>
                          <Table.Cell>${order.sum}</Table.Cell>
                        </Table.Row>
                      </Fragment>
                    ))}
              </Table.Body>
            </Table>

            <Header sub>For February</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name of Customer</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Orders For This Month
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Cost of All Orders For This Month
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {ordersByCustomer &&
                  ordersByCustomer
                    .filter((order) => order.month === 2)
                    .map((order) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{order.cname}</Table.Cell>
                          <Table.Cell>{order.count}</Table.Cell>
                          <Table.Cell>${order.sum}</Table.Cell>
                        </Table.Row>
                      </Fragment>
                    ))}
              </Table.Body>
            </Table>

            <Header sub>For March</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name of Customer</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Orders For This Month
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Cost of All Orders For This Month
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {ordersByCustomer &&
                  ordersByCustomer
                    .filter((order) => order.month === 3)
                    .map((order) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{order.cname}</Table.Cell>
                          <Table.Cell>{order.count}</Table.Cell>
                          <Table.Cell>${order.sum}</Table.Cell>
                        </Table.Row>
                      </Fragment>
                    ))}
              </Table.Body>
            </Table>

            <Header sub>For April</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name of Customer</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Orders For This Month
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Cost of All Orders For This Month
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {ordersByCustomer &&
                  ordersByCustomer
                    .filter((order) => order.month === 4)
                    .map((order) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{order.cname}</Table.Cell>
                          <Table.Cell>{order.count}</Table.Cell>
                          <Table.Cell>${order.sum}</Table.Cell>
                        </Table.Row>
                      </Fragment>
                    ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(FDSButton2);
