import React, { Component, Fragment } from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

class RestaurantListItem extends Component {
  render() {
    return (
      <Fragment>
        <Card color="teal" as={Link} to={`/restaurant/${1}`}>
          <Card.Content>
            <Card.Header>Restaurant1</Card.Header>
            <Card.Description>Chao restaurant</Card.Description>
          </Card.Content>
        </Card>
        <Card color="teal" as={Link} to={`/restaurant/${2}`}>
          <Card.Content>
            <Card.Header>Restaurant2</Card.Header>
            <Card.Description>Jibai restaurant</Card.Description>
          </Card.Content>
        </Card>
      </Fragment>
    );
  }
}

export default RestaurantListItem;
