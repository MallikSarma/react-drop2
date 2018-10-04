import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path: "wealth/(:wealthType)",
  getComponent (nextState, cb) {
  require.ensure([], (require) => {
      const Wealth = require("./container/WealthContainer").default;
      const reducer = require("./modules/wealth").default;

      injectReducer(store, { key: "wealth", reducer });

      cb(null, Wealth);

    }, "wealth");
  }
});
