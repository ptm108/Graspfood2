import React, { Component, Fragment } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const RestaurantOrderItem = ({ fooditem, quantity }) => {
  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>{fooditem.fname}</Grid.Column>
          <Grid.Column width={2} textAlign="center">
            {quantity}
          </Grid.Column>
          <Grid.Column width={2} textAlign="center">
            ${parseFloat(fooditem.price) * quantity}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default RestaurantOrderItem;
