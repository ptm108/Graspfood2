import React, { Fragment } from "react";
import { Segment, Header, Grid, Button } from "semantic-ui-react";

const RestaurantFoodListItem = ({ fooditem }) => {
  return (
    <Segment>
      <Grid divided>
        <Grid.Column width={4} textAlign="center">
          <Button.Group>
            <Button basic color="green" icon="plus" />
            <Button basic color="red" icon="minus" />
          </Button.Group>
        </Grid.Column>
        <Grid.Column width={8} verticalAlign="middle">
          {fooditem.fname}
        </Grid.Column>
        <Grid.Column width={2} textAlign="center" verticalAlign="middle">
          ${fooditem.price}
        </Grid.Column>
        <Grid.Column width={2} verticalAlign="middle">
          {fooditem.quantity}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default RestaurantFoodListItem;
