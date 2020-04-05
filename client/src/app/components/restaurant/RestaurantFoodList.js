import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchFoodItemsByRid,
  postNewOrder
} from "./restaurantUtils/restaurantActions";
import {
  Segment,
  Grid,
  Header,
  Divider,
  Form,
  GridColumn,
  Button
} from "semantic-ui-react";
import RestaurantFoodListItem from "./RestaurantFoodListItem";
import RestaurantOrderItem from "./RestaurantOrderItem";

const mapDispatchToProps = {
  fetchFoodItemsByRid,
  postNewOrder
};

const mapStateToProps = state => {
  return {
    fooditems: state.restaurant.fooditems
  };
};

class RestaurantFoodList extends Component {
  async componentDidMount() {
    const { restaurant, fetchFoodItemsByRid, postNewOrder } = this.props;
    await fetchFoodItemsByRid(restaurant);
  }

  state = {
    foodId: null,
    quantity: 0,
    addedFoodItems: []
  };

  onChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { foodId, quantity } = this.state;
    let newItem = null;
    this.props.fooditems
      .filter(e => e.fid == foodId)
      .forEach(e => (newItem = { fooditem: e, quantity: quantity }));
    newItem &&
      this.setState({
        foodId: null,
        quantity: 0,
        addedFoodItems: [...this.state.addedFoodItems, newItem]
      });
  };

  handleCreateOrder = async () => {
    const { addedFoodItems } = this.state;
    await postNewOrder(addedFoodItems);
  };

  render() {
    const { fooditems } = this.props;
    const { addedFoodItems } = this.state;

    {
      fooditems &&
        fooditems.forEach(element => {
          element.quantity = 0;
        });
    }

    return (
      <Fragment>
        <Segment.Group>
          <Segment>
            <Header as="h3">Your Order</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Input
                  placeholder="ID"
                  name="foodId"
                  onChange={this.onChange}
                />
                <Form.Input
                  placeholder="Quantity"
                  name="quantity"
                  onChange={this.onChange}
                />
                <Form.Button content="Add Item" />
                <Button positive onClick={this.handleCreateOrder}>
                  Submit Order
                </Button>
              </Form.Group>
            </Form>
          </Segment>

          {addedFoodItems.length != 0 && (
            <Fragment>
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <Header as="h4">Food Item</Header>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                      <Header as="h4">Qty</Header>
                    </Grid.Column>
                    <Grid.Column width={2} textAlign="center">
                      <Header as="h4">Price</Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              {addedFoodItems &&
                addedFoodItems.map(e => (
                  <RestaurantOrderItem
                    key={e.fooditem.fid}
                    fooditem={e.fooditem}
                    quantity={e.quantity}
                  />
                ))}
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={14} textAlign="right">
                      <Header as="h4">Total</Header>
                    </Grid.Column>
                    <GridColumn width={2} textAlign="center">
                      $
                      {addedFoodItems
                        .map(addedFoodItem => {
                          return (
                            addedFoodItem.quantity *
                            addedFoodItem.fooditem.price
                          );
                        })
                        .reduce((a, b) => a + b)}
                    </GridColumn>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Fragment>
          )}
        </Segment.Group>
        <Segment.Group>
          <Segment>
            <Grid divided>
              <Grid.Column width={1}>
                <Header as="h3">ID</Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as="h3">Food Item</Header>
              </Grid.Column>
              <Grid.Column width={7} textAlign="center">
                <Header as="h3">Description</Header>
              </Grid.Column>
              <Grid.Column width={2} textAlign="center">
                <Header as="h3">Price</Header>
              </Grid.Column>
              <Grid.Column width={2} textAlign="center">
                <Header as="h3">Limit</Header>
              </Grid.Column>
            </Grid>
          </Segment>
          {fooditems &&
            fooditems.map(fooditem => (
              <RestaurantFoodListItem key={fooditem.fid} fooditem={fooditem} />
            ))}
        </Segment.Group>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFoodList);
