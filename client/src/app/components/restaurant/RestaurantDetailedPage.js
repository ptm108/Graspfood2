import React, { Component, Fragment } from "react";
import { Segment, Grid, Icon, Header, Container } from "semantic-ui-react";
import { connect, dispatch } from "react-redux";
import RestaurantFoodList from "./RestaurantFoodList";
import { RESET_FOOD_ITEMS } from "./restaurantUtils/restaurantConstants";
import { retrievePromoCodes } from "./restaurantUtils/restaurantActions";
import RestaurantPromoList from "./RestaurantPromoList";

const mapStateToProps = (state, ownProps) => {
  const restaurantId = ownProps.match.params.id;
  // console.log(restaurantId)

  let restaurant = {};
  if (state.restaurant.restaurants && state.restaurant.restaurants.length > 0) {
    restaurant = state.restaurant.restaurants.filter(
      (restaurant) => restaurant.rid == restaurantId
    );
  }

  return {
    userAccessRight: state.auth.userAccessRight,
    restaurant: restaurant[0],
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    resetFoodItems: () => dispatch({ type: RESET_FOOD_ITEMS }),
  };
};

class RestaurantDetailedPage extends Component {
  componentWillUnmount() {
    this.props.resetFoodItems();
  }

  render() {
    const { userAccessRight, restaurant } = this.props;
    console.log(restaurant);
    return (
      <Grid>
        <Grid.Column width={10}>
          <RestaurantFoodList restaurant={restaurant} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Header as="h1" size="huge">
              <Icon name="food" />
              <Header.Content>Restaurant Details</Header.Content>
            </Header>
            <Header.Subheader>Name: {restaurant.rname}</Header.Subheader>
            <Header.Subheader>
              Address: {restaurant.streetname}, {restaurant.unitno}, Singapore{" "}
              {restaurant.postalcode}
            </Header.Subheader>
          </Segment>
          <RestaurantPromoList rid={restaurant.rid} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetailedPage);
