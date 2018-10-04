import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path: "personalize",
  getComponent (nextState, cb) {
  require.ensure([], (require) => {
      const Personalize = require("./container/PersonalizeContainer").default;
      const reducer = require("./modules/personalize").default;

      injectReducer(store, { key: "personalize", reducer });

      cb(null, Personalize);

    }, "personalize");
  }
});
