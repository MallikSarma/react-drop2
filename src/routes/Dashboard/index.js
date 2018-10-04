import { injectReducer } from "../../store/reducers";
export default (store) => ({
  path: "dashboard(/:tab)",
  getComponent (nextState, cb) {
  require.ensure([], (require) => {
      const Dashboard = require("./container/DashboardContainer").default;
      const reducer = require("./modules/dashboard").default;

      injectReducer(store, { key: "dashboard", reducer });

      cb(null, Dashboard);

    }, "dashboard");
  }
});
