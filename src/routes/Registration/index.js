import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path: "registration",
  getComponent (nextState, cb) {
  require.ensure([], (require) => {
      const Registration = require("./container/RegistrationContainer").default;
      const reducer = require("./modules/registration").default;

      injectReducer(store, { key: "registration", reducer });

      cb(null, Registration);

    }, "registration");
  }
});
