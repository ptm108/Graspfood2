import React, { Component, Fragment } from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const RestaurantListItem = ({ restaurant }) => {
  // console.log(restaurant);
  var imagesrc = "/assets/" + Math.floor(Math.random() * Math.floor(7)) + ".jpg";
  // console.log(imagesrc);
  return (
    <Card centered color="teal" as={Link} to={`/restaurant/${restaurant.rid}`}>
    <Image src={imagesrc} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{restaurant.rname}</Card.Header>
        <Card.Meta>{restaurant.streetname}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default RestaurantListItem;
