import React, { Component, Fragment } from "react";
import {
  Segment,
  Grid,
  Icon,
  Header,
  Container,
  Form,
} from "semantic-ui-react";
import { connect, dispatch } from "react-redux";
import AccountNav from "../user/AccountNav";
import {
  retrievePromoCodes,
  createNewPromo,
  deletePromo,
} from "../restaurant/restaurantUtils/restaurantActions";
import { toastr } from "react-redux-toastr";

const mapStateToProps = (state) => {
  const rid = state.auth.currentUser.rid;
  console.log(rid);
  let restaurant = null;

  state.restaurant.restaurants
    .filter((r) => r.rid === rid)
    .forEach((r) => {
      restaurant = r;
    });

  return {
    currentUser: state.auth.currentUser,
    currentRestaurant: restaurant,
    promoCodes: state.restaurant.promoCodes,
  };
};

const mapDispatchToProps = {
  retrievePromoCodes,
  createNewPromo,
  deletePromo,
};

class RestaurantPromoAdmin extends Component {
  async componentDidMount() {
    const { currentUser, retrievePromoCodes } = this.props;
    await retrievePromoCodes(currentUser.rid);
  }

  state = {
    startdate: "",
    enddate: "",
    percentagediscount: "",
    maxcustomercount: "",
    minspending: "",
    promocode: "",
    pid: "",
  };

  onChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleCreatePromotion = () => {
    console.log(this.state);
    const { currentUser, createNewPromo } = this.props;

    const newPromo = {
      ...this.state,
      rid: currentUser.rid,
    };

    if (
      isNaN(parseInt(newPromo.percentagediscount)) ||
      isNaN(parseFloat(newPromo.maxcustomercount))
    ) {
      toastr.error("Error", "Invalid inputs!");
      return;
    }

    if (newPromo.minspending !== "" && isNaN(parseInt(newPromo.minspending))) {
      toastr.error("Error", "Invalid inputs!");
      return;
    }
    createNewPromo(newPromo);

    retrievePromoCodes(currentUser.rid);
  };

  handleDeletePromo = () => {
    const pid = parseInt(this.state.pid);
    const { deletePromo, promoCodes, currentUser } = this.props;

    console.log(pid);

    if (isNaN(pid)) {
      toastr.error("Error", "Enter a valid number");
      return;
    }

    if (
      promoCodes.filter((p) => p.rid !== null).filter((p) => p.pid === pid)
        .length === 0
    ) {
      toastr.error("Error", "Enter a valid number");
      return;
    }
    deletePromo(pid);
    retrievePromoCodes(currentUser.rid);
  };

  render() {
    const { promoCodes, currentUser } = this.props;
    return (
      <Grid>
        <Grid.Column width={12}>
          <Segment.Group>
            <Segment inverted>
              <Header as="h3">Add/Delete Restaurant Promotions</Header>
            </Segment>
            <Segment>
              <Form onSubmit={this.handleCreatePromotion}>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Start Date"
                    placeholder="Enter Start Date (YYYY-MM-DD)"
                    name="startdate"
                    onChange={this.onChange}
                  />
                  <Form.Input
                    label="End Date"
                    placeholder="Enter End Date (YYYY-MM-DD)"
                    name="enddate"
                    onChange={this.onChange}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Input
                    label="Min. Spending"
                    placeholder="Min Amount(Optional)"
                    name="minspending"
                    onChange={this.onChange}
                  />
                  <Form.Input
                    label="Percentage Discount (%)"
                    placeholder="Enter a number (1-100)"
                    name="percentagediscount"
                    onChange={this.onChange}
                  />
                  <Form.Input
                    label="Max Customer Count"
                    placeholder="Max Redemptions"
                    name="maxcustomercount"
                    onChange={this.onChange}
                  />
                  <Form.Input
                    label="Promo code"
                    placeholder="Get Creative.."
                    name="promocode"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Button fluid content="Create Promotion" />
              </Form>
            </Segment>
          </Segment.Group>
          <Segment>
            <Form onSubmit={this.handleDeletePromo}>
              <Form.Group inline>
                <Form.Input
                  label="Promo Id"
                  placeholder="To Be Deleted"
                  name="pid"
                  onChange={this.onChange}
                />
                <Form.Button fluid content="Delete Promotion" />
              </Form.Group>
            </Form>
          </Segment>

          {promoCodes && (
            <Segment.Group>
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={2}>
                      <Header as="h5">Promo Id</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Header as="h5">Min. Spending</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Header as="h5">Discount(%)</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Header as="h5">Current Customers</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Header as="h5">Max Customers</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Header as="h5">Start Date</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Header as="h5">End Date</Header>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Header as="h5">Promo Code</Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              {promoCodes
                .filter((p) => p.rid !== null)
                .map((p) => (
                  <Segment>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={2}>{p.pid}</Grid.Column>
                        <Grid.Column width={2}>
                          ${p.minspending || 0}
                        </Grid.Column>
                        <Grid.Column width={2}>{p.percentdiscount}</Grid.Column>
                        <Grid.Column width={2}>
                          {p.currcustomercount || 0}
                        </Grid.Column>
                        <Grid.Column width={2}>
                          {p.maxcustomercount || 100}
                        </Grid.Column>
                        <Grid.Column width={2}>
                          {new Date(p.startdate).getDate() +
                            "/" +
                            new Date(p.startdate).getMonth() +
                            "/" +
                            new Date(p.startdate).getFullYear()}
                        </Grid.Column>
                        <Grid.Column width={2}>
                          {new Date(p.enddate).getDate() +
                            "/" +
                            new Date(p.enddate).getMonth() +
                            "/" +
                            new Date(p.enddate).getFullYear()}
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <Container>{p.promocode}</Container>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                ))}
            </Segment.Group>
          )}
        </Grid.Column>
        <Grid.Column width={4}>
          <AccountNav />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantPromoAdmin);
