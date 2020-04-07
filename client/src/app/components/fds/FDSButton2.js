import React from "react";
import { Header, Grid, Button, Table } from "semantic-ui-react";
import { Component } from "react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import AccountNav from "../user/AccountNav";
import { connect } from "react-redux";

const mapStateToProps = (state) => {};

const mapDispatchToProps = {};

class FDSButton2 extends Component {
  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>FDS Manager Summary Information 1</Header>
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
