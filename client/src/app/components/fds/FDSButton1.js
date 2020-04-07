import React, { Fragment } from "react";
import { Header, Grid, Button, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import AccountNav from "../user/AccountNav";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import { fetchNewCustomers } from "./fdsUtils/fdsActions";

const mapStateToProps = (state) => ({
  numNewCustomers: state.fds.newCustomers.count,
});

const mapDispatchToProps = { fetchNewCustomers };

class FDSButton1 extends Component {
  componentDidMount() {
    this.props.fetchNewCustomers();
  }

  render() {
    const { numNewCustomers } = this.props;
    //console.log(numNewCustomers);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>FDS Manager Summary Information 1</Header>
            <br />
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
                  <Table.Cell>{numNewCustomers}</Table.Cell>
                  <Table.Cell>num cust</Table.Cell>
                  <Table.Cell>num cust</Table.Cell>
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
