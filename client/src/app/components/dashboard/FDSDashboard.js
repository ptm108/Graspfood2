import React, { Component, Fragment } from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import AccountNav from "../user/AccountNav";
import { NavLink } from "react-router-dom";

class FDSDashboard extends Component {
  /* state = {
    buttonValue: 0
  };

  handleClick = value => {
    this.setState({
      buttonValue: value
    });
  };

  componentDidUpdate = (prevProps, prevState, snapShot) => {
    console.log(prevState);
    if (prevState.buttonValue !== this.state.buttonValue) {
      this.setState({
        buttonValue: this.state.buttonValue
      });
    }
  }; */

  render() {
    /* console.log(this.state);
    console.log(this.state.buttonValue); */
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>FDSDashboard</Header>
            <Header sub>
              Press the buttons on the right to get the information
            </Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
            <br />
            <Button as={NavLink} to="/fdsinfo1">
              1
            </Button>
            <Button value="2" onClick={e => this.handleClick(e.target.value)}>
              2
            </Button>
            <Button value="3" onClick={e => this.handleClick(e.target.value)}>
              3
            </Button>
            <Button value="4" onClick={e => this.handleClick(e.target.value)}>
              4
            </Button>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(null, null)(FDSDashboard);
