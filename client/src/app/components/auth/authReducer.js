import { createReducer } from "../../reduxstore/reducerUtil";
import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";

const initialState = {
  authenticated: false,
  currentUser: null
};

const login = (state, payload) => {
  console.log(payload);
  return {
    authenticated: true,
    currentUser: payload.username,
    userAccessRight: payload.accessRight
  };
};

const signOutUser = () => {
  return {
    authenticated: false,
    currentUser: null,
    userAccessRight: null
  };
};

export default createReducer(initialState, {
  [LOGIN_USER]: login,
  [SIGN_OUT_USER]: signOutUser
});
