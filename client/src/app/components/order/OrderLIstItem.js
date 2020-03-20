import React, { Component, Fragment } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const OrderLIstItem = ({ order }) => {
  return (
    <Card color="teal" as={Link} to={`/order/${order.oid}`}>
          <Card.Content>
            <Card.Header>{order.fid}</Card.Header>
            <Card.Description>{order.qty}</Card.Description>
          </Card.Content>
        </Card>
  )
}

export default OrderLIstItem;

