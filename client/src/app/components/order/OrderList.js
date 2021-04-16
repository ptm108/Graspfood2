import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import OrderListItem from "./OrderListItem";
import { Header, Card, Segment } from "semantic-ui-react";
import { fetchOrders, resetOrders } from "./orderUtils/OrderActions";

const mapDispatchToProps = {
  fetchOrders,
  resetOrders
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  currentUser: state.auth.currentUser
});

class OrderList extends Component {
  
  async componentDidMount() {
    const {fetchOrders, currentUser} = this.props;
    await fetchOrders(currentUser.uid);
  }

  async componentWillUnmount() {
    const {resetOrders} = this.props;
    await resetOrders();
  }

  render() {
    const { orders } = this.props;
    console.log(orders);
    return (
      <Fragment>
        <Segment>
          <Header>Orders:</Header>
          <Card.Group itemsPerRow={3}>
            {/* {orders &&
              orders.map(order => (
                <OrderListItem key={order.oid} order={order} />
              ))} */}
          </Card.Group>
        </Segment>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
