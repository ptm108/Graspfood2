import { SubmissionError, reset, dispatch } from "redux-form";
import axios from "axios";
import { LOGIN_USER } from "./authConstants";

// login actions for staff, customer, delivery rider, restaurant manager

export const login = creds => {
  return async (dispatch, getState) => {
    //console.log(creds)
    await axios
      .get("/api/get/loginUser", {params: creds})
      .then(res => {
        if (res.data.rows) {
          console.log(res.data.rows);
          dispatch({ type: LOGIN_USER, payload: res.data.rows[0]})
        }
      })
      .catch(error => {
        throw new SubmissionError({
          _error: error.message
        });
      });
  };
};

// register account account details

export const register = user => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/post/registerUser", user)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        throw new SubmissionError({
          _error: error.message
        });
      });
  };
};

// update profiles

export const updateProfile = user => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/updateUser", user)
      .then(data => {
        console.log(data);
        dispatch(reset("account"));
      })
      .catch(error => {
        throw new SubmissionError({
          _error: error.message
        });
      });
  };
};
