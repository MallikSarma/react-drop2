import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import makeRootReducer from "./reducers";
import messages from "../messages";
import logger from "redux-logger";

const initialMessages = {
  intl: {
    locale: "en-US",
    messages: messages["en-US"],
  },
};

const log =  logger({ diff: true, collapsed: true });

export default (initialState = initialMessages, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  let middleware = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV !== "production") {
      middleware.push(log);
  }

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};
  return store;
};
