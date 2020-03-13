import { createStore, combineReducers } from "redux";
import testReducer from "../components/test/testReducer";
import authReducer from "../components/auth/authReducer";

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer
})

export const configureStore = () => {
    const store = createStore(rootReducer);
    return store;
}