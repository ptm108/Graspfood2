import React, { Component, Fragment } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ReviewListItem = ({ reviews }) => {
  console.log(reviews);
  return (
    <Card centered color="teal" as={Link} to={`/reviews/${reviews.reid}`}>
      <Card.Content>
        <Card.Header>{reviews.title}</Card.Header>
        <Card.Meta>{reviews.timestamp}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default ReviewListItem;
