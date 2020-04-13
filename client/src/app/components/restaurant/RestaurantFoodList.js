import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchFoodItemsByRid,
  postNewOrder,
} from "./restaurantUtils/restaurantActions";
import {
  Segment,
  Grid,
  Header,
  Form,
  GridColumn,
  Button,
  Input,
} from "semantic-ui-react";
import RestaurantFoodListItem from "./RestaurantFoodListItem";
import RestaurantOrderItem from "./RestaurantOrderItem";
import { toastr } from "react-redux-toastr";

const mapDispatchToProps = {
  fetchFoodItemsByRid,
  postNewOrder,
};

const mapStateToProps = (state) => {
  return {
    fooditems: state.restaurant.fooditems,
    currentUser: state.auth.currentUser,
    promoCodes: state.restaurant.promoCodes,
  };
};

class RestaurantFoodList extends Component {
  async componentDidMount() {
    const { restaurant, fetchFoodItemsByRid, postNewOrder } = this.props;
    await fetchFoodItemsByRid(restaurant);
    console.log(this.props.fooditems);
  }

  state = {
    foodId: null,
    quantity: 0,
    address: "",
    postalcode: "",
    rewardpoints: "",
    addedFoodItems: [],
    promocode: "",
    promoApplied: false,
    rpApplied: false,
  };

  onChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { foodId, quantity } = this.state;
    let newItem = null;
    this.props.fooditems
      .filter((e) => e.fid == foodId)
      .forEach((e) => (newItem = { fooditem: e, quantity: quantity }));
    newItem &&
      this.setState({
        foodId: null,
        quantity: 0,
        addedFoodItems: [...this.state.addedFoodItems, newItem],
      });
  };

  handleCreateOrderCash = async () => {
    const { postNewOrder, restaurant } = this.props;
    let { addedFoodItems } = this.state;
    let totalPrice = 0;
    if (addedFoodItems.length != 0) {
      totalPrice = addedFoodItems
        .map((addedFoodItem) => {
          return addedFoodItem.quantity * addedFoodItem.fooditem.price;
        })
        .reduce((a, b) => a + b);
    }

    // checks if totalprice is more than minspending
    if (totalPrice < restaurant.minspending) {
      toastr.error("Error", "Does not meet minimum spending!");
      return;
    }
    // console.log(totalPrice);
    addedFoodItems = {
      addedFoodItems: addedFoodItems,
      totalPrice: totalPrice,
      uid: this.props.currentUser.uid,
      rid: this.props.restaurant.rid,
      paymentMethod: "cash",
      address: this.state.address,
      postalcode: this.state.postalcode,
      rewardpoints: this.state.rewardpoints,
    };
    await postNewOrder(addedFoodItems);
    this.setState({ addedFoodItems: [], address: "", postalcode: "" });
  };

  handleCreateOrderCC = async () => {
    const { postNewOrder, restaurant } = this.props;
    let { addedFoodItems, promocode } = this.state;
    let totalPrice = 0;
    if (addedFoodItems.length != 0) {
      totalPrice = addedFoodItems
        .map((addedFoodItem) => {
          return addedFoodItem.quantity * addedFoodItem.fooditem.price;
        })
        .reduce((a, b) => a + b);
    }
    // console.log(totalPrice);

    if (totalPrice < restaurant.minspending) {
      toastr.error("Error", "Does not meet minimum spending!");
      return;
    }

    addedFoodItems = {
      addedFoodItems: addedFoodItems,
      totalPrice: totalPrice,
      uid: this.props.currentUser.uid,
      rid: this.props.restaurant.rid,
      paymentMethod: "credit card",
      address: this.state.address,
      postalcode: this.state.postalcode,
      rewardpoints: this.state.rewardpoints,
      promocode: this.state.promocode,
    };
    await postNewOrder(addedFoodItems);
    this.setState({ addedFoodItems: [], address: "" });
  };

  handleApplyPromoCode = () => {
    const { promocode, addedFoodItems } = this.state;
    const { promoCodes } = this.props;
    let promotion = null;
    promoCodes.forEach((p) => {
      if (p.promocode === promocode) {
        promotion = p;
      }
    });
    console.log(promotion);

    let newItem = null;
    // if free delivery promo
    if (promotion.percentdiscount === null) {
      newItem = {
        fooditem: { fid: -1, fname: "Free Delivery", price: "-4.5" },
        quantity: "1",
      };
    }
    // if discount promo type
    else {
      let totalPrice = 0;
      if (addedFoodItems.length != 0) {
        totalPrice = addedFoodItems
          .map((addedFoodItem) => {
            return addedFoodItem.quantity * addedFoodItem.fooditem.price;
          })
          .reduce((a, b) => a + b);
      }
      const totalDiscount = (promotion.percentdiscount / 100) * totalPrice * -1;
      newItem = {
        fooditem: {
          fid: -1,
          fname: "Discount",
          price: totalDiscount.toFixed(3).toString(),
        },
        quantity: "1",
      };
    }

    this.setState({
      addedFoodItems: [...addedFoodItems, newItem],
      promoApplied: true,
    });
  };

  handleUseRewardPoints = () => {
    const { rewardpoints, addedFoodItems } = this.state;
    console.log(rewardpoints);
    let discount = (parseFloat(rewardpoints) / 100) * -1;

    let totalPrice = 0;
    if (addedFoodItems.length != 0) {
      totalPrice = addedFoodItems
        .map((addedFoodItem) => {
          return addedFoodItem.quantity * addedFoodItem.fooditem.price;
        })
        .reduce((a, b) => a + b);
    }

    console.log(discount);
    console.log(totalPrice);
    if (discount * -1 > totalPrice) {
      toastr.error("Oi", "Don't play punk ah");
      return;
    }

    let newItem = {
      fooditem: {
        fid: -2,
        fname: "Reward Points",
        price: discount.toFixed(3).toString(),
      },
      quantity: "1",
    };

    this.setState({
      addedFoodItems: [...addedFoodItems, newItem],
      rpApplied: true,
    });
  };

  render() {
    const { fooditems } = this.props;
    const {
      addedFoodItems,
      address,
      postalcode,
      promocode,
      promoApplied,
      rpApplied,
    } = this.state;

    {
      fooditems &&
        fooditems.forEach((element) => {
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
                  placeholder="Food ID"
                  name="foodId"
                  onChange={this.onChange}
                />
                <Form.Input
                  placeholder="Quantity"
                  name="quantity"
                  onChange={this.onChange}
                />
                <Form.Button content="Add Item" />
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
                addedFoodItems.map((e) => (
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
                        .map((addedFoodItem) => {
                          return (
                            addedFoodItem.quantity *
                            addedFoodItem.fooditem.price
                          );
                        })
                        .reduce((a, b) => a + b).toFixed(2)}
                    </GridColumn>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form>
                        <Form.Group widths="equal">
                          <Form.Input
                            placeholder="Enter Address"
                            name="address"
                            onChange={this.onChange}
                          />
                          <Form.Input
                            placeholder="Enter Postal Code"
                            name="postalcode"
                            onChange={this.onChange}
                          />
                        </Form.Group>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form onSubmit={this.handleUseRewardPoints}>
                        <Form.Group inline>
                          <Form.Input
                            placeholder="Enter Reward Points"
                            name="rewardpoints"
                            onChange={this.onChange}
                          />
                          <Form.Button
                            disabled={rpApplied}
                            content="Use Reward Points"
                          />
                        </Form.Group>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                  {address !== "" && postalcode !== "" && (
                    <Fragment>
                      <Grid.Row>
                        <Grid.Column>
                          <Form onSubmit={this.handleApplyPromoCode}>
                            <Form.Group inline>
                              <Form.Input
                                placeholder="Enter Promo Code"
                                name="promocode"
                                value={promocode}
                                onChange={this.onChange}
                              />
                              <Form.Button
                                disabled={promoApplied}
                                content="Apply"
                              />
                            </Form.Group>
                          </Form>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column textAlign="center">
                          <Button.Group>
                            <Button onClick={this.handleCreateOrderCash}>
                              Checkout (Cash)
                            </Button>
                            <Button.Or />
                            <Button onClick={this.handleCreateOrderCC}>
                              Checkout (CC)
                            </Button>
                          </Button.Group>
                        </Grid.Column>
                      </Grid.Row>
                    </Fragment>
                  )}
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
            fooditems.map((fooditem) => (
              <RestaurantFoodListItem key={fooditem.fid} fooditem={fooditem} />
            ))}
        </Segment.Group>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantFoodList);
