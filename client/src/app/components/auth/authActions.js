import { SubmissionError, reset } from "redux-form";
import { toastr } from "react-redux-toastr";
import axios from "axios";

// login actions for staff, customer, delivery rider, restaurant manager

export const login = creds => {
  return async (dispatch, getState) => {
    try {
      await axios.get("/api/get/login", creds);
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

// register account account details

export const register = user => {
  return async (dispatch, getState) => {
    try {
      await axios.get("/api/put/register", user);
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};

// update profiles

export const updateProfile = user => {
    return async (dispatch, getState) => {
        try {
          await axios.get("/api/put/update", user);
          await dispatch(reset("account"));
          toastr.success("Success", "Your account has been updated")
        } catch (error) {
          console.log(error);
          throw new SubmissionError({
            _error: error.message
          });
        }
      };
};
