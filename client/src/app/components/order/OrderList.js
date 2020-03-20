import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import OrderListItem from "./OrderListItem";
import { Header, Icon } from "semantic-ui-react";
import {fetchOrders} from "./OrderActions";

const mapDispatchToProps = {
  fetchOrders
};

const mapStateToProps = state => ({
  orders: state.order.orders
});

class OrderList extends Component {
  async componentDidMount() {
    await this.props.fetchOrders();
  }

  render() {

    const { orders } = this.props;
    return (
      <Fragment>
        <Header>Orders:</Header>
        {orders && 
          orders.map(order => (
            <OrderListItem 
              key={order.oid}
              order={order}
            />
          ))}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
