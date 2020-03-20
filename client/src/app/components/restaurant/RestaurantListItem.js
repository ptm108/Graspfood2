import React, { Component, Fragment } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const RestaurantListItem = ({ restaurant }) => {
  return (
    <Card color="teal" as={Link} to={`/restaurant/${restaurant.rid}`}>
          <Card.Content>
            <Card.Header>{restaurant.rname}</Card.Header>
            <Card.Description>{restaurant.streetname}</Card.Description>
          </Card.Content>
        </Card>
  )
}

export default RestaurantListItem;
