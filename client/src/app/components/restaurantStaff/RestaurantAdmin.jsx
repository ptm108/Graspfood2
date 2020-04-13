import React, { Component, Fragment } from "react";
import { Header, Grid, Segment, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  fetchRestaurants,
  fetchFoodItemsByRid,
  createNewFoodItem,
  resetFoodItems,
} from "../restaurant/restaurantUtils/restaurantActions";
import RestaurantFoodListItem from "../restaurant/RestaurantFoodListItem";
import { toastr } from "react-redux-toastr";

const mapDispatchToProps = {
  fetchRestaurants,
  fetchFoodItemsByRid,
  createNewFoodItem,
  resetFoodItems,
};

const mapStateToProps = (state) => ({
  restaurants: state.restaurant.restaurants,
  currentUser: state.auth.currentUser,
  fooditems: state.restaurant.fooditems,
});

class RestaurantAdmin extends Component {
  async componentDidMount() {
    const { fetchRestaurants, fooditems } = this.props;
    await fetchRestaurants();

    const { fetchFoodItemsByRid, currentUser, restaurants } = this.props;
    let restaurant = null;
    restaurants
      .filter((r) => r.rid === currentUser.rid)
      .forEach((r) => {
        restaurant = r;
      });

    // console.log(restaurant);
    await fetchFoodItemsByRid(restaurant);
    // console.log(fooditems);
  }

  componentWillUnmount() {
    this.props.resetFoodItems();
  }

  state = {
    fname: "",
    price: "",
    category: "",
    dailylimit: 0,
    description: "",
  };

  onChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    console.log(this.state);
    const { createNewFoodItem, currentUser } = this.props;
    const newFoodItem = {
      ...this.state,
      rid: currentUser.rid,
    };

    if (isNaN(parseFloat(this.state.price))) {
      toastr.error("Error", "Price must be in a valid decimal");
      return;
    }
    if (!Number.isInteger(parseFloat(this.state.dailylimit))) {
      toastr.error("Error", "Daily Limit must be in an integer");
      return;
    }

    createNewFoodItem(newFoodItem);
    const { fetchFoodItemsByRid, restaurants } = this.props;
    let restaurant = null;
    restaurants
      .filter((r) => r.rid === currentUser.rid)
      .forEach((r) => {
        restaurant = r;
      });

    // console.log(restaurant);
    fetchFoodItemsByRid(restaurant);
  };

  render() {
    const { fooditems } = this.props;

    return (
      <Fragment>
        <Segment.Group>
          <Segment inverted>
            <Header as="h3">Add Food Item</Header>
          </Segment>
          <Segment>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Input
                  label="Food Name"
                  placeholder="Food Name"
                  name="fname"
                  onChange={this.onChange}
                />
                <Form.Input
                  label="Price"
                  placeholder="Price"
                  name="price"
                  onChange={this.onChange}
                />
                <Form.Input
                  label="Category"
                  placeholder="Category"
                  name="category"
                  onChange={this.onChange}
                />
                <Form.Input
                  label="Daily Limit"
                  placeholder="Daily Limit"
                  name="dailylimit"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.TextArea
                fluid
                label="Description"
                name="description"
                placeholder="Tell us more about this dish..."
                onChange={this.onChange}
              />
              <Form.Button fluid content="Add Food Item" />
            </Form>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Grid divided>
              <Grid.Column width={1}>
                <Header as="h3">ID</Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as="h3">Food Item</Header>
              </Grid.Column>
              <Grid.Column width={7} textAlign="center">
                <Header as="h3">Description</Header>
              </Grid.Column>
              <Grid.Column width={2} textAlign="center">
                <Header as="h3">Price</Header>
              </Grid.Column>
              <Grid.Column width={2} textAlign="center">
                <Header as="h3">Limit</Header>
              </Grid.Column>
            </Grid>
          </Segment>
          {fooditems &&
            fooditems.map((fooditem) => (
              <RestaurantFoodListItem key={fooditem.fid} fooditem={fooditem} />
            ))}
        </Segment.Group>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantAdmin);
