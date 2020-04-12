import React, { Component, Fragment } from "react";
import RestaurantListItem from "./RestaurantListItem";
import { Header, Icon, Card, Segment } from "semantic-ui-react";
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
        <Segment.Group>
          <Segment color="grey">
            <Header color="white" size="huge">
              <Icon name="food" />
              <Header.Content>Restaurants:</Header.Content>
            </Header>
          </Segment>
          <Segment>
            <Card.Group itemsPerRow={3}>
              {restaurants &&
                restaurants.map(restaurant => (
                  <RestaurantListItem
                    key={restaurant.rid}
                    restaurant={restaurant}
                  />
                ))}
            </Card.Group>
          </Segment>
        </Segment.Group>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
