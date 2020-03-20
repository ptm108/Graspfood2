import React, { Component, Fragment } from "react";
import RestaurantListItem from "./RestaurantListItem";
import { Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchRestaurants } from "./restaurantUtils/restaurantActions";

const mapDispatchToProps = {
  fetchRestaurants
};

const mapStateToProps = state => ({
  restaurants: state.restaurant.restaurants
});

class RestaurantList extends Component {
  async componentDidMount() {
    await this.props.fetchRestaurants();
  }

  render() {

    const { restaurants } = this.props;
    return (
      <Fragment>
        <Header>Restaurants:</Header>
        {restaurants && 
          restaurants.map(restaurant => (
            <RestaurantListItem 
              key={restaurant.rid}
              restaurant={restaurant}
            />
          ))}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
