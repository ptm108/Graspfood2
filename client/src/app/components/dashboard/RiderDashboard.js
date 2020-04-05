import React, { Component, Fragment } from "react";
import AccountNav from "../user/AccountNav";
import { Grid, Header, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  fetchSalary,
  fetchDeliverOrders,
} from "../deliveryRider/riderUtils/riderActions";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  salary: state.rider.salary,
  deliverOrders: state.rider.deliverOrders,
});

const mapDispatchToProps = { fetchSalary, fetchDeliverOrders };

class RiderDashboard extends Component {
  calculateSalary = (value) => {
    let totalCommission = 0;
    for (let i = 0; i < this.props.deliverOrders.length; i++) {
      totalCommission += parseFloat(
        this.props.deliverOrders[i].delieveryfeecommission
      );
    }
    console.log(totalCommission);
    return parseFloat(value) + totalCommission;
  };

  calculateHoursWork = (value) => {};

  componentDidMount() {
    //console.log(this.props.currentUser.uid);
    this.props.fetchSalary(this.props.currentUser);
    this.props.fetchDeliverOrders(this.props.currentUser);
    //console.log(this.props);
  }

  render() {
    const { salary, deliverOrders } = this.props;
    console.log(deliverOrders[0]);
    console.log(deliverOrders[0].timestamp.substring(0, 10));
    let currDate = new Date(Date.now()).toISOString();
    console.log(currDate);
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <h2>RiderDashboard</h2>
            <Header>Summary Information</Header>
            <Header.Subheader>
              Base Salary: ${salary[0].weeklybasesalary}
            </Header.Subheader>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>Total Hours Worked</Table.HeaderCell>
                  <Table.HeaderCell>Total Salary</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>{deliverOrders.length}</Table.Cell>
                  <Table.Cell>{salary[0].totalworkhours}</Table.Cell>
                  <Table.Cell>
                    ${this.calculateSalary(salary[0].weeklybasesalary)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RiderDashboard);
