import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchOrderDetails,
  resetOrders,
  createReview,
  putRiderReview
} from "./orderUtils/OrderActions";
import {
  Grid,
  Header,
  Segment,
  Form,
  TextArea,
  Rating,
  Label,
} from "semantic-ui-react";
import RestaurantOrderItem from "../restaurant/RestaurantOrderItem";

const mapDispatchToProps = {
  fetchOrderDetails,
  resetOrders,
  createReview,
  putRiderReview
};

const mapStateToProps = (state, ownProps) => {
  const currOid = ownProps.match.params.id;
  return {
    orderDetails: state.order.currentOrder,
    currentUser: state.auth.currentUser,
    restaurants: state.restaurant.restaurants,
    currOid: currOid,
  };
};

class OrderDetailedPage extends Component {
  async componentWillMount() {
    const { fetchOrderDetails, currOid } = this.props;
    await fetchOrderDetails(currOid);
  }

  async componentWillUnmount() {
    const { resetOrders } = this.props;
    await resetOrders();
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating });

  handleCreateRestaurantRating = async () => {
    const { currentUser, currOid, createReview } = this.props;

    const queryParams = {
      ...this.state,
      oid: parseInt(currOid),
      uid: currentUser.uid,
    };

    console.log(queryParams);
    await createReview(queryParams);
  };

  handleRiderRating = async (e, {rating, maxRating}) => {
    this.setState({ rating, maxRating });
    const { currOid, putRiderReview } = this.props;

    const queryParams = {
      oid: parseInt(currOid),
      drRating: rating
    };

    console.log(queryParams);
    await putRiderReview(queryParams);
  };

  state = {
    reviewTitle: "",
    reviewDesc: "",
  };

  render() {
    const { restaurants, orderDetails } = this.props;

    const currOrder = orderDetails.order;
    const fooditems = orderDetails.fooditems;
    const deliveryRider = orderDetails.deliveryRider;

    let res = null;

    if (restaurants.length != 0 && currOrder) {
      res = restaurants.filter(
        (restaurant) => restaurant.rid === currOrder.rid
      );
    }

    const currentRestaurant = res && res[0];
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment.Group>
            <Segment inverted>
              <Header content="Order Details:" />
            </Segment>
            <Segment>
              <b>Order ID:</b> {currOrder.oid}
            </Segment>
            <Segment>
              <b>Restaurant Name:</b> {currentRestaurant.rname}
            </Segment>
            <Segment>
              <b>Order Date:</b> {new Date(currOrder.timestamp).toDateString()}
            </Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment tertiary>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={12}>
                    <Header as="h4">Food Item</Header>
                  </Grid.Column>
                  <Grid.Column width={2} textAlign="center">
                    <Header as="h4">Qty</Header>
                  </Grid.Column>
                  <Grid.Column width={2} textAlign="center">
                    <Header as="h4">Price</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            {fooditems &&
              fooditems.map((fooditem) => (
                <RestaurantOrderItem
                  key={fooditem.fid}
                  fooditem={fooditem}
                  quantity={fooditem.qty}
                />
              ))}
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={14} textAlign="right">
                    <Header as="h4">Total</Header>
                  </Grid.Column>
                  <Grid.Column width={2} textAlign="center">
                    $
                    {fooditems
                      .map((fooditem) => {
                        return fooditem.qty * fooditem.price;
                      })
                      .reduce((a, b) => a + b)}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Segment.Group>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment secondary>
              <Header content="Restaurant Review" />
            </Segment>
            <Segment>
              <Form onSubmit={this.handleCreateRestaurantRating}>
                <Form.Input
                  placeholder="Title"
                  name="reviewTitle"
                  label="Title"
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={TextArea}
                  name="reviewDesc"
                  label="Description"
                  placeholder="Enter something here"
                  onChange={this.handleChange}
                />
                <Form.Field>
                  <label>Rating: </label>
                  <Rating maxRating={5} onRate={this.handleRate} size="large" />
                </Form.Field>
                <Form.Button content="Submit" />
              </Form>
            </Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment secondary>
              <Header content="Delivery Rider Review" />
            </Segment>
            <Segment>
              <b>Rider Name:</b> {deliveryRider.drname}
            </Segment>
            <Segment>
              <Rating
                maxRating={5}
                defaultRating={3}
                icon="star"
                size="massive"
                onRate={this.handleRiderRating}
              />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailedPage);
