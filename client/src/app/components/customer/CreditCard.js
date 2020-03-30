import React, { Component, Fragment } from "react";
import AccountNav from "../user/AccountNav";
import { Grid, Card, Header, Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  fetchCreditCard,
  resetCreditCard,
  deleteCreditCard
} from "./customerUtils/customerActions";
import CreditCardForm from "./CreditCardForm";

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  creditCard: state.customer.creditCard
});

const mapDispatchToProps = {
  fetchCreditCard,
  resetCreditCard,
  deleteCreditCard
};

class CreditCard extends Component {
  onDeleteCard = () => {
    this.props.deleteCreditCard(this.props.currentUser);
    this.props.resetCreditCard();
  };

  componentDidMount() {
    this.props.fetchCreditCard(this.props.currentUser);
  }

  componentWillUnmount() {
    this.props.resetCreditCard();
  }

  render() {
    const { creditCard, currentUser, loading } = this.props;
    //console.log(this.props);
    //console.log(creditCard);
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>
              <Icon name="credit card" />
              Added Credit Card
            </Header>
            {creditCard ? (
              <Fragment>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      XXXX - XXXX - XXXX -{" "}
                      {creditCard[0].ccnumber.substring(12)}
                    </Card.Header>
                    <Card.Description>
                      Expiry Date: {creditCard[0].expirydate.substring(0, 10)}
                    </Card.Description>
                    <Card.Description>
                      Cardholder Name: {creditCard[0].cardholdername}
                    </Card.Description>
                  </Card.Content>
                </Card>
                <Button
                  negative
                  loading={loading}
                  onClick={() => this.onDeleteCard()}
                >
                  Delete
                </Button>
              </Fragment>
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
