import React from "react";
import { Header, Grid, Button, Table } from "semantic-ui-react";
import { Component } from "react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import AccountNav from "../user/AccountNav";
import { connect } from "react-redux";
import {
  fetchAllRidersDeliveriesInfo,
  fetchWorkHours,
} from "./fdsUtils/fdsActions";

const mapStateToProps = (state) => ({
  allRidersDeliveriesInfo: state.fds.allRidersDeliveriesInfo,
  workHours: state.fds.workHours,
});

const mapDispatchToProps = { fetchAllRidersDeliveriesInfo, fetchWorkHours };

class FDSButton4 extends Component {
  componentDidMount() {
    this.props.fetchAllRidersDeliveriesInfo();
    this.props.fetchWorkHours();
  }

  render() {
    const { allRidersDeliveriesInfo, workHours } = this.props;
    console.log(allRidersDeliveriesInfo);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>FDS Manager Summary Information 4</Header>
            <Header sub>For January</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name of Rider</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Orders Delivered
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Hours Worked
                  </Table.HeaderCell>
                  <Table.HeaderCell>Total Salary Earned</Table.HeaderCell>
                  <Table.HeaderCell>Average Delivery Time</Table.HeaderCell>
                  <Table.HeaderCell>
                    Number of Ratings Received
                  </Table.HeaderCell>
                  <Table.HeaderCell>Average Rating Received</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {allRidersDeliveriesInfo &&
                  allRidersDeliveriesInfo
                    .filter((info) => info.month === 1)
                    .map((info) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{info.drname}</Table.Cell>
                          <Table.Cell>{info.numorders}</Table.Cell>
                          <Table.Cell />
                          <Table.Cell>
                            ${info.fee ? parseFloat(info.fee) : 0}
                          </Table.Cell>
                          <Table.Cell>
                            {info.delivertime ? info.delivertime.toFixed(2) : 0}{" "}
                            min
                          </Table.Cell>
                          <Table.Cell>{info.numratings}</Table.Cell>
                          <Table.Cell>
                            {info.avgrating
                              ? parseFloat(info.avgrating).toFixed(2)
                              : 0}
                          </Table.Cell>
                        </Table.Row>
                      </Fragment>
                    ))}
              </Table.Body>
            </Table>

            <Header sub>For February</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name of Rider</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Orders Delivered
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Hours Worked
                  </Table.HeaderCell>
                  <Table.HeaderCell>Total Salary Earned</Table.HeaderCell>
                  <Table.HeaderCell>Average Delivery Time</Table.HeaderCell>
                  <Table.HeaderCell>
                    Number of Ratings Received
                  </Table.HeaderCell>
                  <Table.HeaderCell>Average Rating Received</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {allRidersDeliveriesInfo &&
                  allRidersDeliveriesInfo
                    .filter((info) => info.month === 2)
                    .map((info) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{info.drname}</Table.Cell>
                          <Table.Cell>{info.numorders}</Table.Cell>
                          <Table.Cell />
                          <Table.Cell>
                            ${info.fee ? parseFloat(info.fee) : 0}
                          </Table.Cell>
                          <Table.Cell>
                            {info.delivertime ? info.delivertime.toFixed(2) : 0}{" "}
                            min
                          </Table.Cell>
                          <Table.Cell>{info.numratings}</Table.Cell>
                          <Table.Cell>
                            {info.avgrating
                              ? parseFloat(info.avgrating).toFixed(2)
                              : 0}
                          </Table.Cell>
                        </Table.Row>
                      </Fragment>
                    ))}
              </Table.Body>
            </Table>

            <Header sub>For March</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name of Rider</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Orders Delivered
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Hours Worked
                  </Table.HeaderCell>
                  <Table.HeaderCell>Total Salary Earned</Table.HeaderCell>
                  <Table.HeaderCell>Average Delivery Time</Table.HeaderCell>
                  <Table.HeaderCell>
                    Number of Ratings Received
                  </Table.HeaderCell>
                  <Table.HeaderCell>Average Rating Received</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {allRidersDeliveriesInfo &&
                  allRidersDeliveriesInfo
                    .filter((info) => info.month === 3)
                    .map((info) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{info.drname}</Table.Cell>
                          <Table.Cell>{info.numorders}</Table.Cell>
                          <Table.Cell>
                            {workHours &&
                              workHours
                                .filter(
                                  (work) =>
                                    work.uid === info.uid && work.month === 3
                                )
                                .map((hour) => hour.sum)}
                          </Table.Cell>
                          <Table.Cell>
                            ${info.fee ? parseFloat(info.fee) : 0}
                          </Table.Cell>
                          <Table.Cell>
                            {info.delivertime ? info.delivertime.toFixed(2) : 0}{" "}
                            min
                          </Table.Cell>
                          <Table.Cell>{info.numratings}</Table.Cell>
                          <Table.Cell>
                            {info.avgrating
                              ? parseFloat(info.avgrating).toFixed(2)
                              : 0}
                          </Table.Cell>
                        </Table.Row>
                      </Fragment>
                    ))}
              </Table.Body>
            </Table>

            <Header sub>For April</Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name of Rider</Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Orders Delivered
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Total Number of Hours Worked
                  </Table.HeaderCell>
                  <Table.HeaderCell>Total Salary Earned</Table.HeaderCell>
                  <Table.HeaderCell>Average Delivery Time</Table.HeaderCell>
                  <Table.HeaderCell>
                    Number of Ratings Received
                  </Table.HeaderCell>
                  <Table.HeaderCell>Average Rating Received</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {allRidersDeliveriesInfo &&
                  allRidersDeliveriesInfo
                    .filter((info) => info.month === 4)
                    .map((info) => (
                      <Fragment>
                        <Table.Row>
                          <Table.Cell>{info.drname}</Table.Cell>
                          <Table.Cell>{info.numorders}</Table.Cell>
                          <Table.Cell>
                            {workHours &&
                              workHours
                                .filter(
                                  (work) =>
                                    work.uid === info.uid && work.month === 4
                                )
                                .map((hour) => hour.sum)}
                          </Table.Cell>
                          <Table.Cell>
                            ${info.fee ? parseFloat(info.fee) : 0}
                          </Table.Cell>
                          <Table.Cell>
                            {info.delivertime ? info.delivertime : 0} min
                          </Table.Cell>
                          <Table.Cell>{info.numratings}</Table.Cell>
                          <Table.Cell>
                            {info.avgrating ? parseFloat(info.avgrating) : 0}
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

export default connect(mapStateToProps, mapDispatchToProps)(FDSButton4);
