import { SubmissionError, reset } from "redux-form";
import axios from "axios";

// login actions for staff, customer, delivery rider, restaurant manager

export const login = creds => {
  return async (dispatch, getState) => {
    await axios
      .get("/api/get/loginUser", creds)
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
