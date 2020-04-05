import React, { Fragment } from "react";
import { Header, Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import AccountNav from "../user/AccountNav";
import { NavLink } from "react-router-dom";
import { Component } from "react";

const mapStateToProps = state => {};

const mapDispatchToProps = {};

class FDSButton1 extends Component {
  render() {
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Header>FDS Manager Summary Information 1</Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
            <br />
            <Button as={NavLink} to="/fdsinfo1">
              1
            </Button>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FDSButton1);
