import React from "react";
import { Header, Grid, Button, Table, TableBody } from "semantic-ui-react";
import { Component } from "react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import AccountNav from "../user/AccountNav";
import { connect } from "react-redux";
import { fetchAllOrders } from "./fdsUtils/fdsActions";

const mapStateToProps = (state) => ({ allOrders: state.fds.allOrders });

const mapDispatchToProps = { fetchAllOrders };

class FDSButton3 extends Component {
  componentDidMount() {
    this.props.fetchAllOrders();
  }

  render() {
    let areas = [
      "Downtown",
      "Telok Blangah",
      "River Valley",
      "Serangoon",
      "Joo Chiat",
      "Tampines",
      "Jurong",
      "Yishun",
      "Seletar",
    ];
    let hours = [
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
    ];

    const { allOrders } = this.props;
    console.log(allOrders);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>FDS Manager Summary Information 3</Header>
            <Header>
              Total Number of Orders Placed At Each Hour for Each Location Area
            </Header>
            <Table celled>
              <Table.Header content="For lo">
                <Table.Row>
                  <Table.HeaderCell>Hour</Table.HeaderCell>
                  {hours &&
                    hours.map((hour) => (
                      <Table.HeaderCell>{hour}</Table.HeaderCell>
                    ))}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Fragment>
                  <Table.Row>
                    <Table.Cell>{areas[0]}</Table.Cell>
                    {hours.map((hour) => (
                      <Table.Cell>
                        {allOrders &&
                          allOrders.filter(
                            (order) =>
                              parseInt(order.hour) ===
                                hours.indexOf(hour) + 10 &&
                              order.postalcode !== null &&
                              order.postalcode.substr(0, 1) === "1"
                          ).length}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{areas[1]}</Table.Cell>
                    {hours.map((hour) => (
                      <Table.Cell>
                        {allOrders &&
                          allOrders.filter(
                            (order) =>
                              parseInt(order.hour) ===
                                hours.indexOf(hour) + 10 &&
                              order.postalcode !== null &&
                              order.postalcode.substr(0, 1) === "2"
                          ).length}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{areas[2]}</Table.Cell>
                    {hours.map((hour) => (
                      <Table.Cell>
                        {allOrders &&
                          allOrders.filter(
                            (order) =>
                              parseInt(order.hour) ===
                                hours.indexOf(hour) + 10 &&
                              order.postalcode !== null &&
                              order.postalcode.substr(0, 1) === "3"
                          ).length}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{areas[3]}</Table.Cell>
                    {hours.map((hour) => (
                      <Table.Cell>
                        {allOrders &&
                          allOrders.filter(
                            (order) =>
                              parseInt(order.hour) ===
                                hours.indexOf(hour) + 10 &&
                              order.postalcode !== null &&
                              order.postalcode.substr(0, 1) === "4"
                          ).length}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{areas[4]}</Table.Cell>
                    {hours.map((hour) => (
                      <Table.Cell>
                        {allOrders &&
                          allOrders.filter(
                            (order) =>
                              parseInt(order.hour) ===
                                hours.indexOf(hour) + 10 &&
                              order.postalcode !== null &&
                              order.postalcode.substr(0, 1) === "5"
                          ).length}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{areas[5]}</Table.Cell>
                    {hours.map((hour) => (
                      <Table.Cell>
                        {allOrders &&
                          allOrders.filter(
                            (order) =>
                              parseInt(order.hour) ===
                                hours.indexOf(hour) + 10 &&
                              order.postalcode !== null &&
                              order.postalcode.substr(0, 1) === "6"
                          ).length}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{areas[6]}</Table.Cell>
                    {hours.map((hour) => (
                      <Table.Cell>
                        {allOrders &&
                          allOrders.filter(
                            (order) =>
                              parseInt(order.hour) ===
                                hours.indexOf(hour) + 10 &&
                              order.postalcode !== null &&
                              order.postalcode.substr(0, 1) === "7"
                          ).length}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{areas[7]}</Table.Cell>
                    {hours.map((hour) => (
                      <Table.Cell>
                        {allOrders &&
                          allOrders.filter(
                            (order) =>
                              parseInt(order.hour) ===
                                hours.indexOf(hour) + 10 &&
                              order.postalcode !== null &&
                              order.postalcode.substr(0, 1) === "8"
                          ).length}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{areas[8]}</Table.Cell>
                    {hours.map((hour) => (
                      <Table.Cell>
                        {allOrders &&
                          allOrders.filter(
                            (order) =>
                              parseInt(order.hour) ===
                                hours.indexOf(hour) + 10 &&
                              order.postalcode !== null &&
                              order.postalcode.substr(0, 1) === "9"
                          ).length}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(FDSButton3);
