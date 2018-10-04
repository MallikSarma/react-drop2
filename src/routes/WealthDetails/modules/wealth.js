import request from "../../../util/request";
import update from "react/lib/update";
import services from "../../../services";
import { push } from "react-router-redux";
import validations from "../../../util/validations";
import constants from "./actionConstants";
import { FormattedMessage } from "react-intl";
import React from "react";
const {
    DASHBOARD_DETAILS,
    WEALTH_DETAILS_SIDEBAR_TOGGLE,
    WEALTH_DETAILS_LEFT_SIDEBAR_TOGGLE,
    RESET_WEALTH_ACCOUNT_DETAILS,
    UPDATE_WEALTH_READ_MESSAGES,
    WEALTH_SEARCH_FILTER_ACTIONS,
    WEALTH_TOGGLE_SEARCH_AND_CHAT,
    WEALTH_TOGGLE_POPUP_MENU,
    WEALTH_DETAILS,
    GET_SHARE_ACCOUNTS_DATA,
    UPDATE_WEALTH_TABLE_RECORDS,
    TOGGLE_DISPLAYED_WEALTHS,
    GET_SLIDER_POSITION
} = constants;
export function toggleDisplayedWealths(payload) {
    return {
        type: TOGGLE_DISPLAYED_WEALTHS,
        payload
    };
}
export function getSliderPosition(payload) {
    return {
        type: GET_SLIDER_POSITION,
        payload
    };
}
export function getAsyncDashboardData () {
    return (dispatch, store) => {
        const payload = {};
        request.post(services.getDashboardData)
        .send(payload)
        .finish((error, res) => {
            setTimeout(()=>{
                dispatch({
                    type: DASHBOARD_DETAILS,
                    payload: res.body
                });
            }, 2000);
       });
    };
}
export function navigatePage(payload) {
    let locationArray = window.location.pathname.split(/(\/)/);
    if (window.location.pathname.match(/[\/]$/)){
        locationArray = locationArray.slice(0,locationArray.length - 5);
    }
    else {
        locationArray = locationArray.slice(0,locationArray.length - 4);
    }
    return push(locationArray.join("") + "/dashboard/" + payload);
}
export function navigateToDifferentPages(payload) {
    const {address, same} = payload;
    let locationArray = window.location.pathname.split(/(\/)/);
    let spliceIndex = window.location.pathname.match(/[\/]$/) ? -5 : -3;
    if (same) {
        spliceIndex = window.location.pathname.match(/[\/]$/) ? -5 : -3;
    }
    locationArray.splice(spliceIndex);
    const location = locationArray.join("") + address;
    return push(location);
}
export function menuButtonClick() {
    return {
        type: WEALTH_DETAILS_SIDEBAR_TOGGLE
    };
}
export function leftMenuButtonClick() {
    return {
        type: WEALTH_DETAILS_LEFT_SIDEBAR_TOGGLE
    };
}
export function resetWealthDetails() {
    return {
        type: RESET_WEALTH_ACCOUNT_DETAILS
    };
}
export function readMessage(payload) {
    return {
        type: UPDATE_WEALTH_READ_MESSAGES
    };
}
export function searchFilterActions(payload){
    return {
        type: WEALTH_SEARCH_FILTER_ACTIONS,
        payload
    };
}
export function toggleSearchChat(payload){
    return {
        type: WEALTH_TOGGLE_SEARCH_AND_CHAT,
        payload
    };
}
export function togglePopupMenu(payload){
    return {
        type: WEALTH_TOGGLE_POPUP_MENU,
        payload
  };
}
export function getWealthDetails(type) {
    return (dispatch, store) => {
        const endpointMap = {
            shares: services.getSharesInvestmentDetails,
            unitTrust: services.getUnitTrustDetails
        };
        const payload = {};
        request.post(endpointMap[type])
            .send(payload)
            .finish((error, res) => {
            setTimeout(()=>{
                dispatch({
                    type: WEALTH_DETAILS,
                    payload: res.body
                });
            }, 2000);
        });
    };
}
export function getShareAccountsData(payload) {
    return {
        type:GET_SHARE_ACCOUNTS_DATA,
        payload
    };
}
export function updateTableRecords(payload) {
    return {
        type: UPDATE_WEALTH_TABLE_RECORDS,
        payload
    };
}
function handleToggleDisplayedWealths(state, action) {
    const intNumOfDisplay = action.payload;
    if (intNumOfDisplay){
        return update(state, { intNumOfDisplayedWealths: {
            $set: intNumOfDisplay
        }});
    } else {
        const newCount = state.intNumOfDisplayedWealths ? state.intNumOfDisplayedWealths + 6 : 12;
        return update(state, { intNumOfDisplayedWealths: {
            $set: newCount
        }});
    }
}
function handleDashboardDetails(state, action) {
    return update(state, {
        dashboardDetails: {
            $set: action.payload
        }
    });
}
function handleSidebarToggle(state) {
    return update(state, {
        showSideBar: {
            $set: !state.showSideBar
        }
    });
}
function handleLeftSidebarToggle(state) {
    return update(state, {
        showLeftSideBar: {
            $set: !state.showLeftSideBar
        }
    });
}
function handleReset(state) {
    return initialState;
}
function handleUpdateReadMessages(state, action) {
    return update(state, {
        currentIndex: {
            $set: state.currentIndex === state.dashboardDetails.sideContent.unreadMessages.length - 1 ? 0 : state.currentIndex + 1
        }
    });
}
function handleToggleSearchChat(state, action){
    if (!action.payload){
        return update(state,{
            webchat: {
                $set: false
            },
            showSearchModal: {
                $set: false
            }
        });
    }
    return update(state,{
        [action.payload]: {
            $set:!state[action.payload]
        }
    });
}
function handlePopupMenu(state, action){
    return update(state, {
        popupOpen: {
                $set: action.payload ? false : !state.popupOpen
        }
    });
}
function handleWealthDetails(state, action) {
    return update(state, {
        wealthDetails: {
            $set: action.payload
        },
        shareAccountsDetails:{
           $set: action.payload.accounts[0],
        },
        shareFundDetails:{
          $set: action.payload.fundHouse[0]
        }
    });
}
function handleShareAccountsData(state, action) {
    const {key, value} = action.payload;
    return update(state, {
        [key]:{
            $set:value
        }
    });
}
function handleUpdateTableRecords(state, action) {
    return update(state, {
        tableData: {
            tableStartIndex: {
                $set: action.payload
            }
        }
    });
}
function handleGetSliderPosition(state, action){
    return update(state, {
        sliderPosition:{
            $set: action.payload
        }
    });
}
const ACTION_HANDLERS = {
    DASHBOARD_DETAILS: handleDashboardDetails,
    WEALTH_DETAILS_SIDEBAR_TOGGLE:handleSidebarToggle,
    WEALTH_DETAILS_LEFT_SIDEBAR_TOGGLE:handleLeftSidebarToggle,
    RESET_WEALTH_ACCOUNT_DETAILS:handleReset,
    UPDATE_WEALTH_READ_MESSAGES: handleUpdateReadMessages,
    WEALTH_TOGGLE_SEARCH_AND_CHAT: handleToggleSearchChat,
    WEALTH_TOGGLE_POPUP_MENU: handlePopupMenu,
    WEALTH_DETAILS:handleWealthDetails,
    GET_SHARE_ACCOUNTS_DATA:handleShareAccountsData,
    UPDATE_WEALTH_TABLE_RECORDS:handleUpdateTableRecords,
    TOGGLE_DISPLAYED_WEALTHS:handleToggleDisplayedWealths,
    GET_SLIDER_POSITION:handleGetSliderPosition
};
const initialState = {
    currentPage: "accounts",
    currentIndex: 0,
    tableData: {
        tableStartIndex: 0
    },
};
export default function wealthReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
