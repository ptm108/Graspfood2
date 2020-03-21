import React from "react";
import { Segment, Header } from "semantic-ui-react";

const RestaurantFoodListItem = ({ fooditem }) => {
  return (
    <Segment>
      <Header as="h4">{fooditem.fname}</Header>
    </Segment>
  );
};

export default RestaurantFoodListItem;
