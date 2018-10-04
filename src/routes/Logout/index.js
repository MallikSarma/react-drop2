import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path: "logout",
  getComponent (nextState, cb) {
  require.ensure([], (require) => {
      const Logout = require("./container/LogoutContainer").default;
      const reducer = require("./modules/logout").default;

      injectReducer(store, { key: "logout", reducer });

      cb(null, Logout);

    }, "logout");
  }
});
