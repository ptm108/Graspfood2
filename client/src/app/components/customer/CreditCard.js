import React, { Component, Fragment } from "react";
import AccountNav from "../customer/AccountNav";
import { Grid, Card, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  fetchCreditCard,
  resetCreditCard
} from "./customerUtils/customerActions";
import { RESET_CREDITCARD } from "./customerUtils/customerConstants";
import CreditCardForm from "./CreditCardForm";

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  creditCard: state.customer.creditCard
});

const mapDispatchToProps = {
  fetchCreditCard,
  resetCreditCard
};

class CreditCard extends Component {
  componentDidMount() {
    this.props.fetchCreditCard(this.props.currentUser);
  }

  componentWillUnmount() {
    this.props.resetCreditCard();
  }

  render() {
    const { creditCard, currentUser } = this.props;
    console.log(this.props);
    console.log(creditCard);
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>
              <Icon name="credit card" />
              Added Credit Card
            </Header>
            {creditCard ? (
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
              <Fragment>
                <Header>No credit card yet</Header>
                <br />
                <CreditCardForm currentUser={currentUser} />
              </Fragment>
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
