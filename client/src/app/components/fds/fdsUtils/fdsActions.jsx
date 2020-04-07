import axios from "axios";
import { FETCH_NEW_CUSTOMERS } from "../fdsUtils/fdsConstants";

export const fetchNewCustomers = () => {
  return async (dispatch) => {
    await axios.get("/api/get/newCustomers").then((res) => {
      console.log(res.data);
      if (res.data.rows) {
        dispatch({ type: FETCH_NEW_CUSTOMERS, payload: res.data.rows[0] });
        return res.data.rows;
      }
    });
  };
};
