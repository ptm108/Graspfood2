import { createReducer } from "../../reduxstore/reducerUtil";
import {
    //CREATE_REVIEWS,
    FETCH_REVIEWS,
    } from "./ReviewConstants";

const initialState = {
    reviews: []
};

/*
const createReview = (state, payload) => {
    return [...state, payload.review];
};
*/

const fetchReview = (state, payload) => {
    return {
        ...state,
        reviews: payload.reviews
    };
};

export default createReducer(initialState, {
    //[CREATE_REVIEWS]: createReview,
    [FETCH_REVIEWS]: fetchReview
});