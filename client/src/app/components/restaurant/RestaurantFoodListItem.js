import React from "react";
import { Segment } from "semantic-ui-react";

const RestaurantFoodListItem = ({ fooditem }) => {
  return (
    <Segment>
    {fooditem.fname}
    </Segment>
  );
};

export default RestaurantFoodListItem;
