import React, { Component, Fragment } from "react";
import AccountNav from "../user/AccountNav";
import { Grid, Header, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  fetchRiderDetails,
  fetchDeliverOrders,
  resetState,
  fetchHours,
} from "../deliveryRider/riderUtils/riderActions";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  userDetails: state.rider.userDetails,
  deliverOrders: state.rider.deliverOrders,
  workHours: state.rider.workHours,
});

const mapDispatchToProps = {
  fetchRiderDetails,
  fetchDeliverOrders,
  resetState,
  fetchHours,
};

class RiderDashboard extends Component {
  getWeekOfYear = () => {
    // https://www.epochconverter.com/weeknumbers

    let date = new Date(Date.now());
    let dayOfWeek = (date.getDay() + 6) % 7;
    let ISOWeek = date;

    ISOWeek.setDate(date.getDate() - dayOfWeek + 3);
    let firstThurs = ISOWeek.valueOf();
    ISOWeek.setMonth(0, 1);

    if (ISOWeek.getDay() !== 4) {
      ISOWeek.setMonth(0, 1 + ((4 - ISOWeek.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThurs - ISOWeek) / 604800000);
  };

  getWeek = (value) => {
    // https://www.epochconverter.com/weeknumbers

    let date = value;
    let dayOfWeek = (date.getDay() + 6) % 7;
    let ISOWeek = date;

    ISOWeek.setDate(date.getDate() - dayOfWeek + 3);
    let firstThurs = ISOWeek.valueOf();
    ISOWeek.setMonth(0, 1);

    if (ISOWeek.getDay() !== 4) {
      ISOWeek.setMonth(0, 1 + ((4 - ISOWeek.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThurs - ISOWeek) / 604800000);
  };

  calculateHoursWorkForPartTime = (
    startWk,
    endWk,
    weekConcerned,
    monthConcerned,
    workHours
  ) => {
    let currDate = new Date(Date.now());
    let currMonth = currDate.getMonth() + 1;
    let hours = 0;

    if (monthConcerned < currMonth) {
      if (weekConcerned === 0) {
        for (let i = 0; i < workHours.length; i++) {
          if (workHours[i].month === monthConcerned) {
            hours += parseInt(workHours[i].sum);
          }
        }
      } else {
        for (let i = 0; i < workHours.length; i++) {
          if (
            workHours[i].month === monthConcerned &&
            workHours[i].week === weekConcerned
          ) {
            hours += parseInt(workHours[i].sum);
          }
        }
      }
    } else {
      if (weekConcerned === 0) {
        for (let i = 0; i < workHours.length; i++) {
          if (
            workHours[i].month === currMonth &&
            workHours[i].week < this.getWeekOfYear()
          ) {
            hours += parseInt(workHours[i].sum);
          }
        }
      } else {
        for (let i = 0; i < workHours.length; i++) {
          if (
            workHours[i].month === currMonth &&
            workHours[i].week === weekConcerned
          ) {
            hours += parseInt(workHours[i].sum);
          }
        }
      }
    }

    return hours;
  };

  calculateHoursWorkForFullTime = (
    weekConcerned,
    monthConcerned,
    workHours
  ) => {
    let currDate = new Date(Date.now());
    let currMonth = currDate.getMonth() + 1;
    if (monthConcerned < currMonth) {
      return 4 * 5 * 8;
    } else {
      let week = this.getWeek(new Date("2020-04-01"));
      //console.log(week);

      let diff = (currDate.getTime() - new Date("2020-04-01").getTime()) / 1000;
      diff /= 60 * 60 * 24 * 7;
      //console.log(Math.abs(Math.round(diff)) - 1);
      let numWeeks = Math.abs(Math.round(diff)) - 1;

      return (numWeeks + 1) * 5 * 8;
    }
  };

  componentDidMount() {
    this.props.fetchRiderDetails(this.props.currentUser);
    this.props.fetchDeliverOrders(this.props.currentUser);
    this.props.fetchHours(this.props.currentUser);
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const { userDetails, salary, deliverOrders, workHours } = this.props;
    //let currDate = new Date(Date.now());
    //console.log(currDate.getMonth() + 1);
    //console.log(currDate.getDay());
    //console.log(this.getWeekOfYear());
    console.log(deliverOrders);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <h2>RiderDashboard</h2>
            <Header>Summary Information</Header>
            <Header>Rider: {userDetails && userDetails[0].drname}</Header>
            <Header.Subheader>
              Base Salary: $
              {userDetails
                ? userDetails[0].weeklybasesalary
                  ? userDetails[0].weeklybasesalary
                  : userDetails[0].monthlybasesalary
                : 0}
            </Header.Subheader>
            <Header.Subheader>
              Join Since:{" "}
              {userDetails &&
                new Date(userDetails[0].joindate).toLocaleDateString()}
            </Header.Subheader>
            <Header.Subheader>
              Work Status:{" "}
              {userDetails && userDetails[0].weeklybasesalary
                ? "Part Time"
                : "Full Time"}
            </Header.Subheader>

            <Header>March (Month)</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Total Hours Worked</Table.HeaderCell>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Salary (exlcuding base salary)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {userDetails && userDetails[0].weeklybasesalary
                      ? this.calculateHoursWorkForPartTime(
                          0,
                          0,
                          0,
                          3,
                          workHours
                        )
                      : this.calculateHoursWorkForFullTime(0, 3, workHours)}
                  </Table.Cell>
                  <Table.Cell>
                    {deliverOrders &&
                      deliverOrders
                        .filter((order) => order.month === 3)
                        .map((order) => parseInt(order.count))
                        .reduce((a, b) => a + b, 0)}
                  </Table.Cell>
                  <Table.Cell>
                    $
                    {deliverOrders &&
                      deliverOrders
                        .filter((order) => order.month === 3)
                        .map((order) => parseFloat(order.sum))
                        .reduce((a, b) => a + b, 0)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Header>March (Weekly)</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Week</Table.HeaderCell>
                  <Table.HeaderCell>Total Hours Worked</Table.HeaderCell>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Salary (exlcuding base salary)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {workHours &&
                  workHours
                    .filter((work) => work.month === 3)
                    .map((work) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{work.week + 1}</Table.Cell>
                          <Table.Cell>{work.sum}</Table.Cell>
                          {deliverOrders &&
                            deliverOrders
                              .filter((order) => order.week === work.week + 1)
                              .map((order) => (
                                <Fragment>
                                  <Table.Cell>
                                    {order.count ? order.count : 0}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {order.sum ? order.sum : 0}
                                  </Table.Cell>
                                </Fragment>
                              ))}
                        </Table.Row>
                      </Fragment>
                    ))}
              </Table.Body>
            </Table>

            <Header>April (Month)</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Total Hours Worked</Table.HeaderCell>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Salary (exlcuding base salary)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {userDetails && userDetails[0].weeklybasesalary
                      ? this.calculateHoursWorkForPartTime(
                          0,
                          0,
                          0,
                          4,
                          workHours
                        )
                      : this.calculateHoursWorkForFullTime(0, 4, workHours)}
                  </Table.Cell>
                  <Table.Cell>
                    {deliverOrders &&
                      deliverOrders
                        .filter((order) => order.month === 4)
                        .map((order) => parseInt(order.count))
                        .reduce((a, b) => a + b, 0)}
                  </Table.Cell>
                  <Table.Cell>
                    $
                    {deliverOrders &&
                      deliverOrders
                        .filter((order) => order.month === 4)
                        .map((order) => parseFloat(order.sum))
                        .reduce((a, b) => a + b, 0)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Header>April (Weekly)</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Week</Table.HeaderCell>
                  <Table.HeaderCell>Total Hours Worked</Table.HeaderCell>
                  <Table.HeaderCell>Total Number of Orders</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Salary (exlcuding base salary)
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {workHours &&
                  workHours
                    .filter((work) => work.month === 4)
                    .map((work) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{work.week}</Table.Cell>
                          <Table.Cell>{work.sum}</Table.Cell>
                          {deliverOrders &&
                            deliverOrders
                              .filter((order) => order.week === work.week)
                              .map((order) => (
                                <Fragment>
                                  <Table.Cell>
                                    {order.count ? order.count : 0}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {order.sum ? order.sum : 0}
                                  </Table.Cell>
                                </Fragment>
                              ))}
                        </Table.Row>
                      </Fragment>
                    ))}
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
