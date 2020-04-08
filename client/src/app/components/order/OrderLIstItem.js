import React, { Component, Fragment } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const OrderListItem = ({ order }) => {
  var d = new Date(order.timestamp)
  console.log(d);
  console.log(order);
  return (
    <Card fluid color="grey" as={Link} to={`/order/${order.oid}`}>
      <Card.Content>
        <Card.Header>Order ID: {order.oid}</Card.Header>
        <Card.Meta>Order Date: {new Date(order.timestamp).toDateString()}</Card.Meta>
        <Card.Description>Total Price: ${order.totalprice}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OrderListItem;
