import React, { Component, Fragment } from "react";
import AccountNav from "../user/AccountNav";
import { Grid, Header, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  fetchSalary,
  fetchDeliverOrders,
  resetState,
} from "../deliveryRider/riderUtils/riderActions";
import DRCurrentOrder from "../deliveryRider/DRCurrentOrder";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  salary: state.rider.salary,
  deliverOrders: state.rider.deliverOrders,
});

const mapDispatchToProps = { fetchSalary, fetchDeliverOrders, resetState };

class RiderDashboard extends Component {
  calculateSalary = (value) => {
    let totalCommission = 0;
    if (this.props.deliverOrders !== null) {
      for (let i = 0; i < this.props.deliverOrders.length; i++) {
        totalCommission += parseFloat(
          this.props.deliverOrders[i].delieveryfeecommission
        );
      }
    }

    console.log(totalCommission);
    return parseFloat(value) + totalCommission;
  };

  calculateHoursWork = (joinDate, currDate) => {
    //console.log(new Date(joinDate).toISOString());
    //console.log(currDate);

    let diff = (currDate.getTime() - new Date(joinDate).getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7;
    //console.log(Math.abs(Math.round(diff)) - 1);
    let numWeeks = Math.abs(Math.round(diff)) - 1;

    // work five days a week, one day 8 work hours (this is for fulltimers)
    return numWeeks * 5 * 8;
  };

  componentDidMount() {
    this.props.fetchSalary(this.props.currentUser);
    this.props.fetchDeliverOrders(this.props.currentUser);
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const { salary, deliverOrders } = this.props;
    //console.log(deliverOrders[0]);
    //console.log(deliverOrders[0].timestamp.substring(0, 10));
    //console.log(new Date(deliverOrders[0].timestamp).toUTCString());
    //let currDate = new Date(Date.now()).toUTCString();
    //console.log(currDate);
    //console.log(new Date(currDate).toLocaleDateString());
    //console.log(salary);
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <h2>RiderDashboard</h2>
            <Header>Summary Information</Header>
            <Header.Subheader>
              Base Salary: $
              {salary
                ? salary[0].weeklybasesalary
                  ? salary[0].weeklybasesalary
                  : salary[0].monthlybasesalary
                : 0}
            </Header.Subheader>
            <Header.Subheader>
              Join Since:{" "}
              {salary && new Date(salary[0].joindate).toLocaleDateString()}
            </Header.Subheader>
            <Header.Subheader>
              Work Status:{" "}
              {salary && salary[0].totalworkhours ? "Part Time" : "Full Time"}
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
                  <Table.Cell>
                    {deliverOrders ? deliverOrders.length : 0}
                  </Table.Cell>
                  <Table.Cell>
                    {salary
                      ? salary[0].totalworkhours
                        ? salary[0].totalworkhours
                        : this.calculateHoursWork(
                            salary[0].joindate,
                            new Date(Date.now())
                          )
                      : 0}
                  </Table.Cell>
                  <Table.Cell>
                    $
                    {salary
                      ? salary[0].weeklybasesalary
                        ? this.calculateSalary(salary[0].weeklybasesalary)
                        : this.calculateSalary(salary[0].monthlybasesalary)
                      : 0}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <DRCurrentOrder />
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
