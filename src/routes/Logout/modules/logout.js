import request from "../../../util/request";
import update from "react/lib/update";
import services from "../../../services";
import { push } from "react-router-redux";
import constants from "./actionConstants";
const {
  LOGOUT_DATA,
  LOGOUT_APPLY_OPTIONS
} = constants;
export function getAsyncLogoutData() {
	return (dispatch, store) => {
      request.get(services.getAsyncLogoutData)
        .finish((error, res) => {
            setTimeout(()=>{
              dispatch({
                  type: LOGOUT_DATA,
                  payload: res.body
              });
            }, 2000);
       });
    };
}

export function navigateToDifferentPages(payload) {
    const {address} = payload;
    let locationArray = window.location.pathname.split(/(\/)/);
    const spliceIndex = window.location.pathname.match(/[\/]$/) ? -3 : -1;
    locationArray.splice(spliceIndex);
    const location = locationArray.join("") + address;
    return push(location);
}

export function handleNextIndex(payload) {
  return {
    type: LOGOUT_APPLY_OPTIONS,
    payload
  };
}
function handleLogoutData(state, action) {
	return update( state, {
		logoutData: {
			$set: action.payload
		}
	});
}
function handleLogoutOptions(state, action) {
  return update(state, {
        zeroActivityIndex: {
          $set: action.payload
        }
      });
}
const ACTION_HANDLERS = {
	LOGOUT_DATA: handleLogoutData,
  LOGOUT_APPLY_OPTIONS: handleLogoutOptions
};

const initialState = {};
export default function logoutReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
