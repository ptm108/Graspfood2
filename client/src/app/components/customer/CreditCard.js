import React, { Component, Fragment } from "react";
import AccountNav from "../customer/AccountNav";
import { Grid, Card, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchCreditCard } from "./customerUtils/customerActions";

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  creditCard: state.customer.creditCard
});

const mapDispatchToProps = { fetchCreditCard };

class CreditCard extends Component {
  async componentDidMount() {
    await this.props.fetchCreditCard(this.props.currentUser);
  }

  render() {
    const { creditCard } = this.props;
    console.log(this.props);
    console.log(creditCard[0]);
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>
              <Icon name="credit card" />
              Added Credit Card
            </Header>
            {creditCard[0] ? (
              <Card>
                <Card.Content>
                  <Card.Header>
                    XXXX - XXXX - XXXX - {creditCard[0].ccnumber.substring(12)}
                  </Card.Header>
                  <Card.Description>
                    Expiry Date: {creditCard[0].expirydate.substring(0, 10)}
                  </Card.Description>
                  <Card.Description>
                    Cardholder Name: {creditCard[0].cardholdername}
                  </Card.Description>
                </Card.Content>
              </Card>
            ) : (
              <Header>No added credit card yet</Header>
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditCard);
