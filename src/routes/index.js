import CoreLayout from "../CoreLayout/CoreLayout";
import Login from "./Login";
import Logout from "./Logout";
import Dashboard from "./Dashboard";
import Registration from "./Registration";
import Personalize from "./Personalize";
import WealthDetails from "./WealthDetails";
import AccountDetails from "./AccountDetails";
import Inbox from "./Inbox";
import Transactions from "./Transactions";

export const createRoutes = (store) => ({
  path: "**/app/",
  component: CoreLayout,
  childRoutes: [
	Login(store),
	Logout(store),
	Registration(store),
	Personalize(store),
	Dashboard(store),
	AccountDetails(store),
	Inbox(store),
	Transactions(store),
	WealthDetails(store)
  ]
});

export default createRoutes;