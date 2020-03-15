import React, { Component, Fragment } from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <Fragment>
        <Menu inverted fixed="top" borderless>
          <Container>
            <Menu.Item as={Link} to="/custdashboard" header>
              GraspFood
            </Menu.Item>
          </Container>
        </Menu>
      </Fragment>
    );
  }
}

export default NavBar;
