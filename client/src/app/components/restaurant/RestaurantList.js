import React, { Component, Fragment } from "react";
import RestaurantListItem from "./RestaurantListItem";
import { Header, Icon } from "semantic-ui-react";

class RestaurantList extends Component {
  render() {
    return (
      <Fragment>
        <Header>
          <Icon name="food" />
          <Header.Content>List of Restaurants</Header.Content>
        </Header>
        <RestaurantListItem />
      </Fragment>
    );
  }
}

export default RestaurantList;
