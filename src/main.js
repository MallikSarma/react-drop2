import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/lib/createBrowserHistory";
import { useRouterHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import createStore from "./store/createStore";
import AppContainer from "./AppContainer";

const browserHistory = useRouterHistory(createBrowserHistory)();

const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

const MOUNT_NODE = document.getElementById("root");

let render = () => {
  const routes = require("./routes/index").default(store);

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
    />,
    MOUNT_NODE
  );
};
if (module.hot) {
      module.hot.accept("./routes/index", () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    });
}
render();
