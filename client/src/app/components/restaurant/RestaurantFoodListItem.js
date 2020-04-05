import React, { Fragment } from "react";
import { Segment, Header, Grid, Button } from "semantic-ui-react";

const RestaurantFoodListItem = ({ fooditem }) => {
  return (
    <Segment>
      <Grid divided>
        <Grid.Column width={1} textAlign="center">
          {fooditem.fid}
        </Grid.Column>
        <Grid.Column width={4}>{fooditem.fname}</Grid.Column>
        <Grid.Column width={7} textAlign="center">
          {fooditem.description}
        </Grid.Column>
        <Grid.Column width={2} textAlign="center">
          ${fooditem.price}
        </Grid.Column>
        <Grid.Column width={2} textAlign="center">
          {fooditem.dailylimit - fooditem.currentnumoforders}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default RestaurantFoodListItem;
