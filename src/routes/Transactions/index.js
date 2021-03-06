import { injectReducer } from "../../store/reducers";
export default (store) => ({
  path: "transactions(/:tab)",
  getComponent (nextState, cb) {
  require.ensure([], (require) => {
      const Registration = require("./container/TransactionContainer").default;
      const reducer = require("./modules/transactions").default;

      injectReducer(store, { key: "transactions", reducer });

      cb(null, Registration);

    }, "transactions");
  }
});
