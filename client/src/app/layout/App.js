import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import CustomerDashBoard from "../components/home/customer/CustomerDashboard";
import DashBoard from "../components/home/DashBoard";
import NavBar from "../components/home/NavBar";
//import axios from "axios";
import LoginPage from "../components/auth/Login/LoginPage";
import { Container } from "semantic-ui-react";
import AccountPage from "../components/home/customer/AccountPage";
import ChangePassword from "../components/home/ChangePassword";
import RestaurantDetailedPage from "../components/home/customer/RestaurantDetailedPage";
import CreditCard from "../components/home/customer/CreditCard";
import FDSDashboard from "../components/home/fds/FDSDashboard";
import RiderDashboard from "../components/home/rider/RiderDashboard";
import RestaurantStaffDashboard from "../components/home/restaurantstaff/RestaurantStaffDashboard";
import RegisterPage from "../components/auth/Register/RegisterPage";
import NotFound from "../layout/NotFound";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Container className="main">
          <Route exact path="/dashboard" component={DashBoard} />
        </Container>

        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route exact path="/register" component={RegisterPage} />
                  <Route
                    exact
                    path="/custdashboard"
                    component={CustomerDashBoard}
                  />
                  <Route exact path="/about" component={AccountPage} />
                  <Route
                    exact
                    path="/changepassword"
                    component={ChangePassword}
                  />
                  <Route exact path="/creditcard" component={CreditCard} />
                  <Route exact path="/fdsdashboard" component={FDSDashboard} />
                  <Route
                    exact
                    path="/riderdashboard"
                    component={RiderDashboard}
                  />
                  <Route
                    exact
                    path="/restaurantstaffdashboard"
                    component={RestaurantStaffDashboard}
                  />

                  <Route exact path="/login" component={LoginPage} />
                  <Route
                    path="/restaurant/:id"
                    component={RestaurantDetailedPage}
                  />

                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);

/* axios
  .get("/api/get/test")
  .then(res =>
    console.log(res.data)
  ); */
