import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path: "details/(:detailType)",
  getComponent (nextState, cb) {
  require.ensure([], (require) => {
      const Login = require("./container/DetailsContainer").default;
      const reducer = require("./modules/details").default;

      injectReducer(store, { key: "details", reducer });

      cb(null, Login);

    }, "details");
  }
});
