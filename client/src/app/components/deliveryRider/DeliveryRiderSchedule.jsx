import React, { Component, Fragment } from "react";
import { Grid, Header, Segment, Form, Select, Table, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import AccountNav from "../user/AccountNav";
import {
  getDeliveryRiderSchedule,
  addDeliveryRiderSchedule,
  deleteDeliveryRiderSchedule
} from "./riderUtils/riderActions";
import { toastr } from "react-redux-toastr";

const options = [
  { key: "su", text: "Sunday", value: "0" },
  { key: "m", text: "Monday", value: "1" },
  { key: "t", text: "Tuesday", value: "2" },
  { key: "w", text: "Wednesday", value: "3" },
  { key: "th", text: "Thursday", value: "4" },
  { key: "f", text: "Friday", value: "5" },
  { key: "s", text: "Saturday", value: "6" },
];

const mapDispatchToProps = {
  getDeliveryRiderSchedule,
  addDeliveryRiderSchedule,
  deleteDeliveryRiderSchedule
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  hours: state.rider.hours,
});

class DeliveryRiderSchedule extends Component {
  async componentDidMount() {
    const { getDeliveryRiderSchedule, currentUser } = this.props;
    await getDeliveryRiderSchedule(currentUser.uid);
  }

  state = {
    dayNo: "-1",
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleAddSchedule = () => {
    const {
      getDeliveryRiderSchedule,
      addDeliveryRiderSchedule,
      currentUser,
    } = this.props;

    const newSchedule = {
      ...this.state,
      uid: currentUser.uid,
    };

    console.log(newSchedule);

    if (parseInt(newSchedule.endNo) <= parseInt(newSchedule.startNo)) {
      toastr.error("Hello", "Your time slot not valid");
      return;
    }
    if (parseInt(newSchedule.endNo) - parseInt(newSchedule.startNo) > 4) {
      toastr.error(
        "Error",
        "Don't overwork yourself, keep timeslots below 4hours"
      );
      return;
    }

    addDeliveryRiderSchedule(newSchedule);
    getDeliveryRiderSchedule(currentUser.uid);
  };

  handleDeleteSchedule = () => {
    const {
      getDeliveryRiderSchedule,
      deleteDeliveryRiderSchedule,
      currentUser,
    } = this.props;

    const newSchedule = {
      ...this.state,
      uid: currentUser.uid,
    };

    console.log(newSchedule);

    if (parseInt(newSchedule.endNoDel) <= parseInt(newSchedule.startNoDel)) {
      toastr.error("Hello", "Your time slot not valid");
      return;
    }

    deleteDeliveryRiderSchedule(newSchedule);
    getDeliveryRiderSchedule(currentUser.uid);
  };

  render() {
    const { dayNo } = this.state;

    let day = "";
    let disabled = false;

    let dow = new Date().getDay();
    if (dayNo <= dow) {
      disabled = true;
    } else {
      disabled = false;
    }

    options
      .filter((e) => e.value === dayNo)
      .forEach((e) => {
        day = e.text;
      });

    const { hours, currentUser } = this.props;
    // console.log(hours);

    const d = new Date(currentUser.timeforscheduleupdate || currentUser.joindate);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Segment.Group>
              <Segment inverted>
                <Header as="h3">Your Working Hours</Header>
              </Segment>
              <Segment>
              <Label attached='top'>Last Updated: {d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()}</Label>
                <Form.Field
                  inline
                  control={Select}
                  label="Select Day: "
                  name="dayNo"
                  options={options}
                  placeholder="Day"
                  onChange={this.handleChange}
                />
              </Segment>
              {dayNo !== "-1" && (
                <Segment>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell> Start Time</Table.HeaderCell>
                        <Table.HeaderCell> End Time</Table.HeaderCell>
                        <Table.HeaderCell> Hours</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {hours
                        .filter((h) => h.dayno === parseInt(dayNo))
                        .map((h) => (
                          <Table.Row>
                            <Table.Cell>{h.startno + ":00"}</Table.Cell>
                            <Table.Cell>{h.endno + ":00"}</Table.Cell>
                            <Table.Cell>{h.hours}</Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </Segment>
              )}
            </Segment.Group>

            {dayNo !== "-1" && (
              <Segment.Group>
                <Segment inverted secondary>
                  <Header as="h4">Edit Work Schedule for {day}</Header>
                </Segment>
                <Segment>
                  <Form onSubmit={this.handleAddSchedule}>
                    <Form.Group inline>
                      <Form.Input
                        label="Start Hour"
                        placeholder="Enter a number (10-22)"
                        name="startNo"
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        label="End Hour"
                        placeholder="Enter a number (10-22)"
                        name="endNo"
                        onChange={this.handleChange}
                      />
                      <Form.Button
                        fluid
                        content="Add Schedule"
                        disabled={disabled}
                      />
                    </Form.Group>
                  </Form>
                </Segment>
                <Segment>
                  <Form onSubmit={this.handleDeleteSchedule}>
                    <Form.Group inline>
                      <Form.Input
                        label="Start Hour"
                        placeholder="Enter a number (10-22)"
                        name="startNoDel"
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        label="End Hour"
                        placeholder="Enter a number (10-22)"
                        name="endNoDel"
                        onChange={this.handleChange}
                      />
                      <Form.Button
                        fluid
                        content="Delete Schedule"
                        disabled={disabled}
                      />
                    </Form.Group>
                  </Form>
                </Segment>
              </Segment.Group>
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryRiderSchedule);
