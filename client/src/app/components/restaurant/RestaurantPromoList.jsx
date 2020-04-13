import React, { Component } from "react";
import { Segment, Header, Grid } from "semantic-ui-react";
import { connect, dispatch } from "react-redux";
import { retrievePromoCodes } from "./restaurantUtils/restaurantActions";

const mapDispatchToProps = {
  retrievePromoCodes,
};

const mapStateToProps = (state) => {
  return {
    promoCodes: state.restaurant.promoCodes,
  };
};

class RestaurantPromoList extends Component {
  async componentDidMount() {
    const { retrievePromoCodes, rid } = this.props;
    await retrievePromoCodes(rid);
  }

  render() {
    const { promoCodes } = this.props;
    return (
      <Segment.Group>
        <Segment inverted>
          <Header as="h3">Promo Codes</Header>
        </Segment>
        <Segment inverted secondary>
          <Header as="h4">Restaurant Promos</Header>{" "}
        </Segment>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column width={6}>
                <b>Discount</b>
              </Grid.Column>
              <Grid.Column width={10}>
                <b>Promo Code</b>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {promoCodes &&
          promoCodes
            .filter((p) => p.rid !== null)
            .map((p) => (
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={6}>{p.percentdiscount}%</Grid.Column>
                    <Grid.Column width={10}>{p.promocode}</Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            ))}
        <Segment inverted secondary>
          <Header as="h4">FDS Promos</Header>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <b>Promo</b>
              </Grid.Column>
              <Grid.Column width={12}>
                <b>Promo Code</b>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {promoCodes &&
          promoCodes
            .filter((p) => p.rid === null)
            .map((p) => (
              <Segment>
                <Grid>
                  <Grid.Row>
                    {p.percentdiscount && (
                      <Grid.Column width={4}>{p.percentdiscount}% discount</Grid.Column>
                    )}
                    {p.percentdiscount === null && (
                      <Grid.Column width={4}>Free Delivery</Grid.Column>
                    )}
                    <Grid.Column width={12}>
                      {p.promocode}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            ))}
      </Segment.Group>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantPromoList);
