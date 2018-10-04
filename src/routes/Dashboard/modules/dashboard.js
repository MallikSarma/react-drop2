import request from "../../../util/request";
import update from "react/lib/update";
import services from "../../../services";
import { push } from "react-router-redux";
import constants from "./actionConstants";
import validations from "../../../util/validations";
import React from "react";
import { FormattedMessage } from "react-intl";
const {
    DASHBOARD_DETAILS,
    SIDEBAR_TOGGLE,
    LEFT_SIDEBAR_TOGGLE,
    TOGGLE_POPUP_MENU,
    UPDATE_READ_MESSAGES,
    UPDATE_TOTAL_SPENDING,
    GOALS_UPDATE_INDEX,
    TOGGLE_SEARCH_AND_CHAT,
    RESET_DASHBOARD,
    CARD_ACTIONS,
    REMOVE_NOTIFICATION,
    SEARCH_FILTER_ACTIONS,
    ADD_NOTIFICATION,
    TOGGLE_QUICK_PAY_TRANSFER,
    UPDATE_ACCOUNT_SELECTION,
    GET_INPUT_DATA,
    UPDATE_ERROR,
    UPDATE_INPUT_CARD_DETAILS,
    QUICK_PAY_SUCCESS,
    CONFIRM,
    DONE,
    EDIT_CLICKED,
    RESET_LOGIN_STORE,
    SET_CURRENT_ACCOUNT,
    USER_PROFILE,
    SHOW_MORE_CARDS
} = constants;
const retrievalStartIndex = "000000000000000000000000";
export function resetLoginStore(){
    return (dispatch, store) => {
        dispatch({
            type: USER_PROFILE,
            payload: store().login.userProfile
        });
        dispatch({
            type: RESET_LOGIN_STORE
        });
    };
}
export function toggleQuickPayTransferModal(payload) {
    return {
        type: TOGGLE_QUICK_PAY_TRANSFER,
        payload
    };
}
export function editClick(payload) {
    return {
        type: EDIT_CLICKED,
        payload
    };
}
export function updateInputCardDetails(payload) {
    return {
        type: UPDATE_INPUT_CARD_DETAILS,
        payload
    };
}
export function updateAccountSelection(payload) {
    return {
        type: UPDATE_ACCOUNT_SELECTION,
        payload
    };
}

export function getInputData(payload) {
    return {
        type:GET_INPUT_DATA,
        payload
    };
}
export function modifyCardActions(payload) {
    return {
        type: CARD_ACTIONS,
        payload
    };
}
export function menuButtonClick() {
    return {
        type: SIDEBAR_TOGGLE
    };
}
export function confirmDetails(payload) {
  return {
      type: CONFIRM
    };
}
export function doneGoBack() {
    return {
        type: DONE
    };
}
export function navigateToDifferentPages(payload) {
    const {address} = payload;
    let locationArray = window.location.pathname.split(/(\/)/);
    const spliceIndex = window.location.pathname.match(/[\/]$/) ? -5 : -3;
    locationArray.splice(spliceIndex);
    const location = locationArray.join("") + address;
    return push(location);
}
export function resetError() {
  return {
    type: UPDATE_ERROR
  };
}
export function resetDashboard(){
    return {
        type: RESET_DASHBOARD
    };
}
export function toggleSearchChat(payload){
    return {
        type: TOGGLE_SEARCH_AND_CHAT,
        payload
    };
}
export function searchFilterActions(payload){
    return {
        type: SEARCH_FILTER_ACTIONS,
        payload
    };
}
export function togglePopupMenu(payload){
    return {
        type: TOGGLE_POPUP_MENU,
    payload
  };
}
export function leftMenuButtonClick() {
    return {
        type: LEFT_SIDEBAR_TOGGLE
    };
}
export function updateTotalSpendingInfo(payload) {
    return {
        type: UPDATE_TOTAL_SPENDING,
        payload
    };
}
export function goToAccountDetails(payload) {
    let locationArray = window.location.pathname.split(/(\/)/);
    let locationToSlice = locationArray.length - 3;
    if (window.location.pathname.match(/[\/]$/)) {
        locationToSlice = locationArray.length - 5;
    }
    locationArray = locationArray.slice(0, locationToSlice);
    return push(locationArray.join("") + "details/" + payload);
}
export function goToWealthDetails(payload) {
    let locationArray = window.location.pathname.split(/(\/)/);
    let locationToSlice = locationArray.length - 3;
    if (window.location.pathname.match(/[\/]$/)) {
        locationToSlice = locationArray.length - 5;
    }
    locationArray = locationArray.slice(0, locationToSlice);
    return push(locationArray.join("") + "wealth/" + payload);
}
export function navigatePage(payload) {
    return (dispatch, store) => {
        if (!payload) {
            let defaultPath = window.location.pathname.match(/[\/]$/) ? "casa" : "/casa";
            return push(window.location.pathname + defaultPath);
        }
        let locationArray = window.location.pathname.split(/(\/)/);
        let locationToChange = locationArray.length - 3;
        if (!window.location.pathname.match(/[\/]$/)) {
            locationToChange = locationArray.length - 1;
        }
        locationArray[locationToChange] = payload;
        dispatch(push(locationArray.join("")));
        let queryInfo = {
            retrievalReference: {
                balance: retrievalStartIndex
            },
            dashboardType: payload
        };
        if (payload === "casa"){
            queryInfo.retrievalReference.goal = retrievalStartIndex;
            queryInfo.retrievalReference.others = retrievalStartIndex;
        }
        request.post(services.getAccSummary)
            .send(queryInfo)
            .finish((error, res) => {
                dispatch({
                    type: DASHBOARD_DETAILS,
                    payload: {
                        key: "accountsInfo",
                        value: res.body
                    }
                });
            });
        };
}
export function getAsyncQuickPayDetails () {
    return (dispatch, store) => {
        const payload = {};
        request.post(services.getQuickPayDetails)
            .send(payload)
            .finish((error, res) => {
                setTimeout(()=>{
                    dispatch({
                        type: TOGGLE_QUICK_PAY_TRANSFER,
                        payload: res.body
                    });
                }, 200);
            });
    };
}
export function getAsyncDashboardData () {
    return (dispatch, store) => {
        request.get(services.getAccumulatedAmount)
            .finish((error, res) => {
                dispatch({
                    type: DASHBOARD_DETAILS,
                    payload: {
                        key: "accumulatedAmount",
                        value: res.body
                    }
                });
            });
        const payload = {
            retrievalReference: {
                balance: retrievalStartIndex,
                goal: retrievalStartIndex,
                others: retrievalStartIndex
            },
            dashboardType: "casa"
        };
        request.post(services.getAccSummary)
            .send(payload)
            .finish((error, res) => {
                dispatch({
                    type: DASHBOARD_DETAILS,
                    payload: {
                        key: "accountsInfo",
                        value: res.body
                    }
                });
            });
        request.get(services.getQuickLink)
            .finish((error, res) => {
                dispatch({
                    type: DASHBOARD_DETAILS,
                    payload: {
                        key: "quickPayOptions",
                        value: res.body
                    }
                });
            });
        request.get(services.getPersonalMsg)
            .finish((error, res) => {
                dispatch({
                    type: DASHBOARD_DETAILS,
                    payload: {
                        key: "personalMessage",
                        value: res.body
                    }
                });
            });
    };
}
export function getAsyncMoreBalanceCards(payload){
    return (dispatch, store) => {
        if (payload.reduce){
            dispatch({
                type: SHOW_MORE_CARDS,
                payload
            });
            return;
        }
        request.post(services.getAccSummaryMore)
            .send({
                "retrievalReference":store().dashboard.dashboardDetails.accountsInfo.retrievalReference[payload],
                "type": payload,
                "dashboardType": store().dashboard.dashboardDetails.accountsInfo.dashboardType
            })
            .finish((error, res) => {
                dispatch({
                    type: SHOW_MORE_CARDS,
                    payload: res.body
                });
            });
    };
}
export function asyncSendQuickPay() {
    return (dispatch, store) => {
        if (!store().dashboard.tempToSection.amount){
            dispatch({
              type: UPDATE_ERROR,
              payload: "amountError"
            });
            dispatch(triggerNotification({
              title: <FormattedMessage id = "app.dashboard.emptyAmount"/>
            }));
            return;
        }
        request.post(services.getQuickPaySummary)
          .send(store().dashboard.tempToSection)
          .finish((error, res) => {
            dispatch({
                type: TOGGLE_QUICK_PAY_TRANSFER
            });
            dispatch({
              type: QUICK_PAY_SUCCESS,
              payload: {
              quickPaySummary: update(res.body,{
                    quickPayModal: {
                        $set: true
                    }
              })
            }
            });
         });
    };
}
export function asyncConfirmQuickPay() {
    return (dispatch, store) => {
        request.post(services.getQuickPaySuccessSummary)
          .send(store().dashboard.tempToSection)
          .finish((error, res) => {
            dispatch({
              type: QUICK_PAY_SUCCESS,
              payload: {
              quickPaySummary: update(res.body,{
                    quickPayModal: {
                        $set: true
                    }
              })
            }
            });
         });
    };
}
export function handleToggleQuickPayTransferModal(state,action) {
    if (!action.payload){
        return update(state, {
            showQuickPay: {
                $set: null
            }
        });
    }
    const mapForQuick = {
        "transfer":{
            "isFavourite":action.payload.isFavourite,
            "fromAccount": action.payload.accounts[0].accountNumber,
            "currency": action.payload.currency,
            "transactionType" : action.payload.transactionTypes ? action.payload.transactionTypes[0] : "",
            "transferMode": action.payload.transferModes ? action.payload.transferModes[0] : "",
            "effectiveDate" : action.payload.currentEffectiveDate ? action.payload.currentEffectiveDate.display : ""
        },
        "pay": {
            "isFavourite":action.payload.isFavourite,
            "effectiveDate": action.payload.currentEffectiveDate ? action.payload.currentEffectiveDate.display : "",
            "fromAccount": action.payload.accounts[0].accountNumber,
            "notes": action.payload.transactionInfo.notes
        },
        "reload": {
            "isFavourite":action.payload.isFavourite,
            "fromAccount": action.payload.accounts[0].accountNumber,
            "amount" : action.payload.transactionInfo.reloadAmount ? action.payload.transactionInfo.reloadAmount[0] : "",
            "effectiveDate" : action.payload.currentEffectiveDate ? action.payload.currentEffectiveDate.display : ""
        }
    };
    let payOptions = mapForQuick[action.payload.quickOption];
    if (action.payload.quickOption === "pay"){
        if (action.payload.transactionInfo.zakat){
            payOptions.zakatTypes = action.payload.zakatTypes ? action.payload.zakatTypes[0] : "";
        }
        else if (action.payload.transactionInfo.epf){
            payOptions.epfAccountType = action.payload.epfAccountTypes ? action.payload.epfAccountTypes[0] : "";
        }
        else if (action.payload.transactionInfo.lhdn){
            payOptions.assessmentYear = action.payload.lhdnInfo ? action.payload.lhdnInfo.assessmentYears[0] : "";
            payOptions.paymentCode = action.payload.lhdnInfo ? action.payload.lhdnInfo.paymentCode[0] : "";
        }
        else if (action.payload.transactionInfo.jompayRefList){
            payOptions.jompayRefList = action.payload.transactionInfo.jompayRefList;
        }
    }
    payOptions = {...payOptions, ... action.payload.transactionInfo};
    return update(state, {
        showQuickPay: {
            $set: !state.showQuickPay
        },
        quickPayDetails: {
            $set: action.payload
        },
        tempToSection: {
            $set:payOptions
        },
        showSideBar: {
            $set: false
        }
    });
}
export function handleNextIndex(payload) {
    return {
        type: GOALS_UPDATE_INDEX,
        payload
    };
}
export function readMessage (payload) {
    return {
        type: UPDATE_READ_MESSAGES
    };
}
export function asyncCheckOTPOnCardsActions(payload) {
    const cardDetails =  payload.cardDetails;
  return (dispatch, store) => {
    const updatedCardDetails = update(cardDetails, {
        cardDetails: {
            conditionAgreed: {
                $set: false
            }
        }
    });
    const title = store().dashboard.cardActions.activateCard ? "app.dashboard.cardActivationSuccessText" : "app.dashboard.setPinSuccessText";
    const message = store().dashboard.cardActions.activateCard ? "app.dashboard.cardActivationSuccessSecondary" : "app.dashboard.setPinSuccessSecondary";
    dispatch(triggerNotification({
        title: <FormattedMessage id = {title}/>,
        message: <FormattedMessage id = {message}/>,
        level: "success"
    }));
    dispatch({
        type: CARD_ACTIONS,
        payload:updatedCardDetails
    });
  };
}
export function removeNotifications(payload) {
  return {
      type: REMOVE_NOTIFICATION
    };
}
export function triggerNotification(payload) {
  return (dispatch, store) => {
  const notificationOpts = {
    uid: Math.random(),
    title: payload.title,
    message: payload.message,
    position: "br",
    autoDismiss: 3,
    level: payload.level || "error",
    onRemove: dispatch.bind(this,removeNotifications())
  };
    return dispatch({
        type: ADD_NOTIFICATION,
        payload: {
          notification: notificationOpts
        }
    });
  };
}
export function setCurrentAccount(payload) {
    return {
        type: SET_CURRENT_ACCOUNT,
        payload
    };
}
function handleDashboardDetails(state, action) {
    return update(state, {
        dashboardDetails: {
            [action.payload.key]: {
                $set: action.payload.value
            }
        },
        initialretrievalKeys:{
            $set: action.payload.key === "accountsInfo" ? action.payload.value.retrievalReference : state.initialretrievalKeys
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
function handlePopupMenu(state, action){
    if (!action.payload) {
        return update(state, {
            popupMenu: {
                $set: null
            }
        });
    }
    const cardType = action.payload.cardType;
    const newIndex = action.payload.index;
    let updatedState = state;
    if (!state.popupMenu) {
        updatedState = update(state, { popupMenu: {
            $set: {}
        }});
    }
    const change = {
        popupMenu: {
            $set: {
                [cardType]: newIndex
            }
        }
    };
    return update(updatedState, change);
}
function handleUpdateReadMessages(state, action) {
    return update(state, {
        currentIndex: {
            $set: state.currentIndex === state.dashboardDetails.personalMessage.messages.length - 1 ? 0 : state.currentIndex + 1
        }
    });
}
function handleUpdateTotalSpending(state, action) {
    return update(state, {
        totalSpendingInfo: {
            $set: {
                card: action.payload.month ? state.totalSpendingInfo.card : action.payload.card,
                month: action.payload.month
            }
        }
    });
}
export function asyncCheckCardsActions(payload) {
  return (dispatch, store) => {
    const {conditionAgreed} = store().dashboard.cardActions.cardDetails;
    const {state} = validations.checkAgreeTerms(conditionAgreed);
    if (state) {
        dispatch({
          type: CARD_ACTIONS,
          payload
        });
        dispatch({
          type: UPDATE_ERROR
        });
        dispatch({
          type: REMOVE_NOTIFICATION
        });
    }
    else {
        dispatch({
          type: UPDATE_ERROR,
          payload: "termsError"
        });
        dispatch(triggerNotification({
          title: <FormattedMessage id = "app.registration.agreeConditions"/>
        }));
      }
  };
}
function handleInputCardDetails(state,action) {
    const {key, value} = action.payload;
   return update(state, {
        cardActions:{
            cardDetails: {
                [key]:{
                    $set:value
                }
            }
        }
    });
}
function handleUpdateGoalsIndex(state, action) {
    return update(state, {
        goalsStartIndex: {
            $set: action.payload
        }
    });
}
function handleUpdateAccountSelection(state,action) {
    return update(state, {
        fromAccount: {
            $set: action.payload
        }
    });
}
function handleCardActions(state, action) {
    return update( state, {
        cardActions: {
            $set: action.payload
        },
        popupMenu: {
            $set: null
        }
    });
}
function handleSearchFilter(state, action) {
    return update(state, {
        searchText: {
            $set: action.payload
        }
    });
}
function handleInputData(state, action) {
    const {key, value} = action.payload;
    const checkArray = ["amount", "accountNumber", "phoneNumber", "mobileNumber"];
    if (checkArray.includes(key)) {
        if (!validations.checkNumber(value)){
            return state;
        }
    }
    return update(state, {
        tempToSection: {
            [key]:{
                $set: value
            }
        }
    });
}
function handleResetDashboard() {
    return initialState;
}
function handleError(state, action){
  return update(state, {
    errorName: {
      $set: action.payload
    }
  });
}
function handleUpdateAccountSelection(state) {
    return state;
}
function handleQuickPaySuccess(state, action){
      let newState = Object.assign({},state);
      newState.quickPaySummary = action.payload.quickPaySummary;
      return newState;
}
function handleConfirm(state, action){
        return update( state,{
        confirm: {
            $set: true
        }
    });
}
function handleDone(state) {
  return update(state, {
    quickPaySummary: {
      $set: false
    },
    showQuickPay:{
        $set: false
    },
    tempToSection:{
        $set: false
    },
    confirm:{
        $set: false
    },
    quickPayDetails:{
        $set: false
    }
  });
}
function handleEditClicked(state, action){
    return update(state, {
        quickPaySummary: {
          $set: null
        },
        [action.payload]:{
            $set: true
        }
  });

}
function handleUserProfile(state, action){
    return update(state, {
        userProfile: {
            $set: action.payload
        }
    });
}
function handleSetCurrentAccount(state, action){
    return update(state, {
        currentAccount: {
            $set: action.payload
        }
    });
}
function handleGetMoreBalanceCards(state, action){
    if (action.payload.reduce){
        const {retrievalKey, dataKey} = action.payload.key;
        let change = {
            accSummary:{
                $splice: [[6]]
            }
        };
        if (state.dashboardDetails.accountsInfo.dashboardType === "casa"){
            change = {
                accSummary:{
                    $splice: [[6]]
                },
                goals:{
                    $splice: [[3]]
                }
            };
        }
        return update(state, {
            dashboardDetails:{
                accountsInfo: {
                    ...change,
                    retrievalReference :{
                        [retrievalKey]: {
                            $set: state.initialretrievalKeys[retrievalKey]
                        }
                    },
                },
            }
        });
    }
    let change = {
            accSummary:{
                $push: action.payload.accSummary || []
            }
    };
    if (state.dashboardDetails.accountsInfo.dashboardType === "casa"){
        change = {
            accSummary:{
                $push: action.payload.accSummary || []
            },
            goals:{
                $push: action.payload.goals || []
            },
            otherAccountsSummary:{
                $push: action.payload.otherAccountsSummary || []
            }
        };
    }
    return update(state, {
        dashboardDetails:{
            accountsInfo: {
                ...change,
                retrievalReference: {
                    $merge: action.payload.retrievalReference
                }
            }
        }
    });
}
const ACTION_HANDLERS = {
    DASHBOARD_DETAILS: handleDashboardDetails,
    SIDEBAR_TOGGLE: handleSidebarToggle,
    LEFT_SIDEBAR_TOGGLE:handleLeftSidebarToggle,
    TOGGLE_POPUP_MENU: handlePopupMenu,
    UPDATE_READ_MESSAGES: handleUpdateReadMessages,
    UPDATE_TOTAL_SPENDING: handleUpdateTotalSpending,
    GOALS_UPDATE_INDEX: handleUpdateGoalsIndex,
    TOGGLE_SEARCH_AND_CHAT: handleToggleSearchChat,
    RESET_DASHBOARD: handleResetDashboard,
    CARD_ACTIONS: handleCardActions,
    UPDATE_ERROR:handleError,
    SEARCH_FILTER_ACTIONS: handleSearchFilter,
    UPDATE_INPUT_CARD_DETAILS:handleInputCardDetails,
    TOGGLE_QUICK_PAY_TRANSFER: handleToggleQuickPayTransferModal,
    GET_INPUT_DATA : handleInputData,
    UPDATE_ACCOUNT_SELECTION: handleUpdateAccountSelection,
    QUICK_PAY_SUCCESS:handleQuickPaySuccess,
    CONFIRM:handleConfirm,
    DONE:handleDone,
    EDIT_CLICKED:handleEditClicked,
    USER_PROFILE: handleUserProfile,
    SET_CURRENT_ACCOUNT: handleSetCurrentAccount,
    SHOW_MORE_CARDS:handleGetMoreBalanceCards
};

const initialState = {
    dashboardDetails: {},
    totalSpendingInfo: {},
    currentPage: "accounts",
    currentIndex: 0,
    retrievalStartIndex
};
export default function dashboardReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
