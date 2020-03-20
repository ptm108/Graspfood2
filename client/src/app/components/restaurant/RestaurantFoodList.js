import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchFoodItemsByRid } from "./restaurantUtils/restaurantActions";
import { Segment } from "semantic-ui-react";
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

  render() {
    const { fooditems } = this.props;

    return (
        <Segment.Group>
          {fooditems &&
            fooditems.map(fooditem => (
              <RestaurantFoodListItem key={fooditem.fid} fooditem={fooditem}/>
            ))}
        </Segment.Group>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFoodList);
