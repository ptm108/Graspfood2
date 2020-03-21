import axios from "axios";
import { FETCH_USER_CREDITCARD } from "../customerUtils/customerConstants";

export const fetchCreditCard = user => {
  console.log(user);
  return async (dispatch, getState) => {
    await axios.get("/api/get/creditcard", { params: user }).then(res => {
      if (res.data.rows) {
        //console.log(res.data.rows);
        dispatch({ type: FETCH_USER_CREDITCARD, payload: res.data.rows });
        return res.data.rows;
      }
    });
  };
};
