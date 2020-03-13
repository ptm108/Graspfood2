import { createStore, combineReducers } from "redux";
import testReducer from "../components/test/testReducer";

const rootReducer = combineReducers({
    test: testReducer
})

export const configureStore = () => {
    const store = createStore(rootReducer);
    return store;
}