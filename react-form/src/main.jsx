import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { persiststore, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import {ApolloProvider } from '@apollo/client';
import apolloClient from "./components/config/apollo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>

    <Provider store={store}>
    <PersistGate persistor={persiststore}>
      <App />
    </PersistGate>
    </Provider>
  </ApolloProvider>
  </React.StrictMode>
);
