import React from "react";
import { Segment, Header, Grid, Button } from "semantic-ui-react";

const RestaurantFoodListItem = ({ fooditem }) => {
  return (
    <Segment>
      <Grid divided>
        <Grid.Column width={10} verticalAlign="middle">
          {fooditem.fname}
        </Grid.Column>
        <Grid.Column width={2}>
          <Header as="h3"></Header>
        </Grid.Column>
        <Grid.Column width={4} textAlign="center">
          <Button.Group>
            <Button basic color="green">
              +
            </Button>
            <Button basic color="red">
              -
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default RestaurantFoodListItem;
