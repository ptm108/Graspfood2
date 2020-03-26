import React, { Component } from "react";
import { Header, Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextInput from "../../util/form/TextInput";
import {
  addCreditCard,
  resetCreditCard,
  fetchCreditCard
} from "./customerUtils/customerActions";

const mapDispatchToProps = { addCreditCard, resetCreditCard, fetchCreditCard };

class CreditCardForm extends Component {
  onFormSubmit = values => {
    console.log(values);

    const info = {
      uid: this.props.currentUser.uid,
      cardnumber: values.cardnumber,
      cardholdername: values.cardholdername,
      expirydate: values.expirydate
    };

    this.props.addCreditCard(info);
    this.props.resetCreditCard();
    this.props.fetchCreditCard(this.props.currentUser);
    //this.props.history.push("/creditcard");
  };

  render() {
    const {
      history,
      invalid,
      currentUser,
      handleSubmit,
      submitting
    } = this.props;

    console.log(currentUser.uid);
    return (
      <div>
        <Header sub content="Add credit card form" />
        <Form onSubmit={handleSubmit(this.onFormSubmit)} autoComplete="off">
          <Field
            name="cardnumber"
            type="text"
            component={TextInput}
            placeholder="Card Number"
          />
          <Field
            name="cardholdername"
            type="text"
            component={TextInput}
            placeholder="Card Holder Name"
          />
          <Field
            name="expirydate"
            type="text"
            component={TextInput}
            placeholder="Expiry Date (YYYY-MM-DD)"
          />
          <br />
          <Button disabled={submitting} loading={submitting}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: "creditcardForm" })(CreditCardForm));
