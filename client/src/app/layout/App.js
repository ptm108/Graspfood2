import React, { Component, Fragment } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import CustomerDashBoard from "../components/dashboard/CustomerDashboard";
import DashBoard from "../components/dashboard/DashBoard";
import NavBar from "./NavBar";
//import axios from "axios";
import LoginPage from "../components/auth/Login/LoginPage";
import { Container } from "semantic-ui-react";
import AccountPage from "../components/user/AccountPage";
import ChangePassword from "../components/user/ChangePassword";
import RestaurantDetailedPage from "../components/restaurant/RestaurantDetailedPage";
import CreditCard from "../components/customer/CreditCard";
import FDSDashboard from "../components/dashboard/FDSDashboard";
import RiderDashboard from "../components/dashboard/RiderDashboard";
import RestaurantStaffDashboard from "../components/dashboard/RestaurantStaffDashboard";
import RegisterPage from "../components/auth/Register/RegisterPage";
import NotFound from "../layout/NotFound";
import FDSButton1 from "../components/fds/FDSButton1";
import HomePage from "../homepage/HomePage";
import FDSButton2 from "../components/fds/FDSButton2";
import FDSButton3 from "../components/fds/FDSButton3";
import FDSButton4 from "../components/fds/FDSButton4";
import OrderDetailedPage from "../components/order/OrderDetailedPage"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={HomePage} />
        <NavBar />

        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route exact path="/dashboard" component={DashBoard} />
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
                  <Route exact path="/fdsinfo1" component={FDSButton1} />
                  <Route exact path="/fdsinfo2" component={FDSButton2} />
                  <Route exact path="/fdsinfo3" component={FDSButton3} />
                  <Route exact path="/fdsinfo4" component={FDSButton4} />
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
                  <Route
                    path="/restaurant/:id"
                    component={RestaurantDetailedPage}
                  />
                  <Route path="/order/:id" component={OrderDetailedPage} />
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
