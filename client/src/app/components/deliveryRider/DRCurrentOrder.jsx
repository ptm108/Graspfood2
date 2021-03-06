import React, { Component, Fragment } from "react";
import { Segment, Header, Label, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getOrderDetailsByDrid } from "../order/orderUtils/OrderActions";
import {
  setArriveAtRestaurant,
  setLeftRestaurant,
  setDeliveredTime,
} from "./riderUtils/riderActions";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  currentOrder: state.order.riderCurrOrder,
});

const mapDispatchToProps = {
  getOrderDetailsByDrid,
  setArriveAtRestaurant,
  setLeftRestaurant,
  setDeliveredTime,
};

class DRCurrentOrder extends Component {
  async componentDidMount() {
    const { getOrderDetailsByDrid, currentUser } = this.props;
    await getOrderDetailsByDrid(currentUser.uid);
    const { currentOrder } = this.props;
    if (currentOrder.riderarriveatrestauranttime === null) {
      this.setState({ deliveryStatus: "Going to restaurant", d1: false, d2: false, d3: false });
    } else if (currentOrder.riderleaverestauranttime === null) {
      this.setState({ deliveryStatus: "Arrived at restaurant", d1: false });
    } else if (currentOrder.riderdelivertime === null) {
      this.setState({ deliveryStatus: "Delivering order" });
    } else {
      this.setState({ deliveryStatus: "Order delivered" });
    }
  }

  handleArriveAtRestaurant = () => {
    const { setArriveAtRestaurant, currentOrder } = this.props;
    setArriveAtRestaurant(currentOrder.oid);
    this.setState({ deliveryStatus: "Arrived at restaurant", d1: true });
  };

  handleLeftRestaurant = () => {
    const { setLeftRestaurant, currentOrder } = this.props;
    setLeftRestaurant(currentOrder.oid);
    this.setState({ deliveryStatus: "Delivering order", d2: true });
  };

  handleDelivered = () => {
    const { setDeliveredTime, currentOrder } = this.props;
    setDeliveredTime(currentOrder.oid);
    this.setState({ deliveryStatus: "Order delivered", d3: true });
  };

  state = {
    deliveryStatus: "",
    d1: false,
    d2: false,
    d3: false, 
  };

  render() {
    const { currentOrder } = this.props;
    const { deliveryStatus, d1, d2, d3 } = this.state;
    console.log(d1);

    return (
      <Segment.Group>
        <Segment inverted>
          <Header as="h3">Your Current Delivery</Header>
        </Segment>
        <Segment secondary>
          <Header as="h4">
            Your Current Status:{" "}
            {currentOrder && currentOrder.isidle ? (
              <Label color="green" horizontal>
                IDLE
              </Label>
            ) : (
              <Label color="red" horizontal>
                BUSY
              </Label>
            )}
          </Header>
        </Segment>
        {currentOrder && !currentOrder.isidle && (
          <Fragment>
            <Segment>
              <b>Order Id:</b> {currentOrder.oid}
            </Segment>
            <Segment attached>
              <b>Delivery Status:</b> {deliveryStatus}
            </Segment>
            <Button.Group attached="bottom">
              <Button
                content="Arrived At Restaurant"
                onClick={this.handleArriveAtRestaurant}
                disabled={d1}
              />
              <Button
                content="Left Restaurant"
                onClick={this.handleLeftRestaurant}
                disabled={d2}
              />
              <Button
                content="Order Delivered"
                onClick={this.handleDelivered}
                disabled={d3}
              />
            </Button.Group>
          </Fragment>
        )}
      </Segment.Group>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DRCurrentOrder);
