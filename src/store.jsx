import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import reducer from "./reducer";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
};

const  persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

export const persiststore = persistStore(store);
