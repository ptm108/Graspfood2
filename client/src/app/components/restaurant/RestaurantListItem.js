import React, { Component, Fragment } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const RestaurantListItem = ({ restaurant }) => {
  console.log(restaurant);
  return (
    <Card centered color="teal" as={Link} to={`/restaurant/${restaurant.rid}`}>
      <Card.Content>
        <Card.Header>{restaurant.rname}</Card.Header>
        <Card.Meta>{restaurant.streetname}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default RestaurantListItem;
