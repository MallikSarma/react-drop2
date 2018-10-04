import { injectReducer } from "../../store/reducers";
export default (store) => ({
  path: "inbox",
  getComponent (nextState, cb) {
  require.ensure([], (require) => {
      const Inbox = require("./container/InboxContainer").default;
      const reducer = require("./modules/inbox").default;

      injectReducer(store, { key: "inbox", reducer });

      cb(null, Inbox);

    }, "inbox");
  }
});