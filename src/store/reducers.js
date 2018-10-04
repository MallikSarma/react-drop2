import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import {intlReducer} from "react-intl-redux";
import update from "react/lib/update";
import notificationReducer from "./notificationStore";
const loaderReducer = (state = {} , action) =>{
	if (action.type === "TOGGLE_LOADER"){
		return update(state, {
				showLoader: {
					$set: !state.showLoader
				}
			});
	}
	return state;
};
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router,
	intl: intlReducer,
	loader: loaderReducer,
	notification: notificationReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;