import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchFoodItemsByRid } from "./restaurantUtils/restaurantActions";
import { Segment, Grid, Header, Divider } from "semantic-ui-react";
import RestaurantFoodListItem from "./RestaurantFoodListItem";

const mapDispatchToProps = {
  fetchFoodItemsByRid
};

const mapStateToProps = state => {
  return {
    fooditems: state.restaurant.fooditems
  };
};

class RestaurantFoodList extends Component {
  async componentDidMount() {
    const { restaurant, fetchFoodItemsByRid } = this.props;
    await fetchFoodItemsByRid(restaurant);
  }

  state = {
    orderitems: this.props.fooditems
  }

  render() {
    const { fooditems } = this.props;

    return (
      <Fragment>
        <Segment>Total Order</Segment>
        <Segment.Group>
          <Segment>
            <Grid divided>
              <Grid.Column width={8}>
                <Header as="h3">Food Item</Header>
              </Grid.Column>
              <Grid.Column width={2} textAlign="center">
                <Header as="h3">Price</Header>
              </Grid.Column>
              <Grid.Column width={2} textAlign="center">
                <Header as="h3">Qty</Header>
              </Grid.Column>
              <Grid.Column width={4} textAlign="center">
                <Header as="h3">Add/Remove</Header>
              </Grid.Column>
            </Grid>
          </Segment>
          {fooditems &&
            fooditems.map(fooditem => (
              <RestaurantFoodListItem key={fooditem.fid} fooditem={fooditem} />
            ))}
        </Segment.Group>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFoodList);
