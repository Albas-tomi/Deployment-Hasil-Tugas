import { combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./components/productSlice";

const reducer = combineReducers({
    products: productReducer,
})

export default reducer;