import request from "../../../util/request";
import update from "react/lib/update";
import services from "../../../services";
import { push } from "react-router-redux";
import validations from "../../../util/validations";
import constants from "./actionConstants";
import React from "react";
import { FormattedMessage } from "react-intl";
const {
    TRANSACTION_DASHBOARD_DETAILS,
    TRANSACTION_SIDEBAR_TOGGLE,
    TRANSACTION_LEFT_SIDEBAR_TOGGLE,
    UPDATE_READ_MESSAGES,
    TOGGLE_FAVORITE_POPUP,
    PAY_DETAILS_DATA,
    RESET_TRANSACTIONS,
    UPDATE_PAYMENT_LIST,
    PAYEE_DATA,
    TOGGLE_PAYMENT_MODAL,
    UPDATE_ACCOUNT_SELECTION,
    GET_TRANSACTION_INPUT_DATA,
    UPDATE_PAYEE_SELECTION,
    TOGGLE_JOMPAY_MODAL,
    TOGGLE_FAVORITE_MODAL,
    UPDATE_FAVORITE_LIST,
    PAY_TRANSFER_SUCCESS,
    UPDATE_ERROR,
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    CONFIRM,
    NEW_FAVORITE_LIST,
    DONE,
    EDIT_CLICKED,
    UPDATE_PDF_PAGES,
    TOGGLE_PDF_SCALE,
    TOGGLE_PDF_VIEW,
    OTP_SUCCESS,
    ADD_MULTIPLE_RECIPIENT
} = constants;
export function updateFavoriteList(payload) {
    return (dispatch, store) => {
        dispatch({
            type: UPDATE_FAVORITE_LIST,
            payload
        });
        request.get(services.getAsyncFavorites)
        .finish((error, res) => {
            setTimeout(()=>{
                dispatch({
                    type: NEW_FAVORITE_LIST,
                    payload: res.body.favorites
                });
            }, 200);
        });
    };
}
export function resetError() {
  return {
    type: UPDATE_ERROR
  };
}
export function addMultipleRecipient(payload) {
    return {
        type: ADD_MULTIPLE_RECIPIENT,
        payload
    };
}
export function editClick(payload) {
    return {
        type: EDIT_CLICKED,
        payload
    };
}
export function asyncCheckOTP() {
  return (dispatch, store) => {
    dispatch({
        type: OTP_SUCCESS
    });
    };
}
export function confirmDetails(payload) {
  return {
      type: CONFIRM
    };
}
export function asyncToggleJompayModal(payload) {
    return (dispatch, store) => {
        request.get(services.getAsyncJomPayBiller)
        .finish((error, res) => {
            setTimeout(()=>{
                dispatch({
                    type: TOGGLE_JOMPAY_MODAL,
                    payload: update(res.body,{
                        jompayRefList: {
                            $set: ["",""]
                        },
                        keepClosedPayment:{
                            $set: !payload
                        }
                    })
                });
            }, 2000);
       });
    };
}
export function asyncToggleFavoriteModal(payload)
{
    const successMessages = {
        "editFavorite" : {
            title: <FormattedMessage id = "app.transaction.favoriteSuccessfullyEdited"/>,
            message: <FormattedMessage id = "app.transaction.newFavoriteSuccessfullyMessage"/>,
            level: "success"
        },
        "removeFavorite" : {
            title: <FormattedMessage id = "app.transaction.favoriteSuccessfullyRemoved"/>,
            message: <FormattedMessage id = "app.transaction.newFavoriteSuccessfullyMessage"/>,
            level: "success"
        }
    };
    return (dispatch, store) => {
        if (!store().transactions.favoriteInfo.nickName){
            dispatch({
              type: UPDATE_ERROR,
              payload: "nickNameError"
            });
            dispatch(triggerNotification({
              title: <FormattedMessage id = "app.transactions.nickNameError"/>
            }));
            return;
        }
        if (store().transactions.favoriteInfo.billRegister && !store().transactions.favoriteInfo.termsConditions){
            dispatch({
              type: UPDATE_ERROR,
              payload: "termsError"
            });
            dispatch(triggerNotification({
              title: <FormattedMessage id = "app.registration.agreeConditions"/>
            }));
            return;
        }
        request.post(services.getFavoriteSummary)
          .send(store().transactions.favoriteInfo.tempToSection)
          .finish((error, res) => {
            dispatch({
              type: PAY_TRANSFER_SUCCESS,
              payload: {
                    paymentSummaryData: res.body,
                    showFavoriteSummary:true
                }
            });
            return;
         });

        if (store().transactions.favoriteInfo.successMessages){
            dispatch(triggerNotification(
                successMessages[store().transactions.favoriteInfo.successMessages]
            ));
        }
        dispatch({
            type: TOGGLE_FAVORITE_MODAL,
            payload
        });
    };
}
export function toggleFavoriteModal(payload) {
     return {
        type: TOGGLE_FAVORITE_MODAL,
        payload
    };
}
export function togglePdfScale(payload) {
    return {
        type: TOGGLE_PDF_SCALE,
        payload
    };
}
export function updatePDFpages(payload) {
    return {
        type: UPDATE_PDF_PAGES,
        payload
    };
}
export function handlePDFUrl(payload){
    return {
        type: TOGGLE_PDF_VIEW,
        payload
    };
}
export function updatePayeeSelection(payload) {
    return (dispatch, store) => {
        dispatch({
            type: UPDATE_PAYEE_SELECTION,
            payload
        });
        request.get(services.getAsyncFavorites)
        .finish((error, res) => {
            setTimeout(()=>{
                dispatch({
                    type: NEW_FAVORITE_LIST,
                    payload: res.body.favorites
                });
            }, 2000);
        });
    };
}
export function updateAccountSelection(payload) {
    return {
        type: UPDATE_ACCOUNT_SELECTION,
        payload
    };
}
export function getAsyncPayeeList(payload) {
    const payeeLisMap = {
        "pay": services.getAsyncPayeeList,
        "transfer" : services.getAsyncPayeeList,
        "reload" : services.getAsyncReloadList
    };
    return (dispatch, store) => {
        request.get(payeeLisMap[payload])
        .finish((error, res) => {
            setTimeout(()=>{
                dispatch({
                    type: PAYEE_DATA,
                    payload: res.body
                });
            }, 2000);
        });
    };
}
export function togglePaymentModal(payload) {
    return {
        type: TOGGLE_PAYMENT_MODAL,
        payload
    };
}
export function menuButtonClick() {
    return {
        type: TRANSACTION_SIDEBAR_TOGGLE
    };
}
export function leftMenuButtonClick() {
    return {
        type: TRANSACTION_LEFT_SIDEBAR_TOGGLE
    };
}
export function toggleFavoritePopup(payload){
    return {
        type:TOGGLE_FAVORITE_POPUP,
        payload
    };
}
export function toggleJompayTerm(payload) {
    return (dispatch, store) => {
        return dispatch({
          type: GET_TRANSACTION_INPUT_DATA,
          payload: {key:"termsConditions",value:payload.termsConditions}
        });
    };
}
export function getInputData(payload) {
    return {
        type:GET_TRANSACTION_INPUT_DATA,
        payload
    };
}
export function resetStore() {
    return {
        type:RESET_TRANSACTIONS
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
export function navigatePage(payload) {
    if (!payload) {
        let defaultPath = window.location.pathname.match(/[\/]$/) ? "pay" : "/pay";
        return push(window.location.pathname + defaultPath);
    }
    let locationArray = window.location.pathname.split(/(\/)/);
    let locationToChange = locationArray.length - 3;
    if (!window.location.pathname.match(/[\/]$/)) {
        locationToChange = locationArray.length - 1;
    }
    locationArray[locationToChange] = payload;
    return push(locationArray.join(""));
}
export function getAsyncDashboardData () {
    return (dispatch, store) => {
        const payload = {};
        request.post(services.getDashboardData)
        .send(payload)
        .finish((error, res) => {
            setTimeout(()=>{
                dispatch({
                    type: TRANSACTION_DASHBOARD_DETAILS,
                    payload: res.body
                });
            }, 2000);
        });
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
export function removeNotifications(payload) {
    return {
        type: REMOVE_NOTIFICATION
    };
}
export function sendAsyncMultiTransaction() {
    return (dispatch, store) => {
        request.post(services.getQuickPaySummary)
            .send(store().transactions.tempToSection)
            .finish((error, res) => {
                dispatch({
                  type: PAY_TRANSFER_SUCCESS,
                  payload: {
                        paymentSummaryData: res.body,
                        showSummary:true,
                        showMultipleSticky: false,
                        paymentModalOpen:false
                    }
                });
            });
    };
}
export function asyncSendPay(payload) {
    return (dispatch, store) => {
        if (!store().transactions.tempToSection.amount){
            dispatch({
              type: UPDATE_ERROR,
              payload: "amountError"
            });
            dispatch(triggerNotification({
              title: <FormattedMessage id = "app.transactions.emptyAmount"/>
            }));
            return;
        }
        if (store().transactions.tempToSection.ref1 && !store().transactions.tempToSection.termsConditions){
            dispatch({
              type: UPDATE_ERROR,
              payload: "termsError"
            });
            dispatch(triggerNotification({
              title: <FormattedMessage id = "app.registration.agreeConditions"/>
            }));
            return;
        }
        request.post(services.getQuickPaySummary)
          .send(store().transactions.tempToSection)
          .finish((error, res) => {
            dispatch({
                type: TOGGLE_PAYMENT_MODAL,
            });
            dispatch({
              type: PAY_TRANSFER_SUCCESS,
              payload: {
                    paymentSummaryData: res.body,
                    showSummary:true
                }
            });
         });
    };
}
export function asyncSendMultiplePay() {
    return (dispatch, store) => {
        if (!store().transactions.tempToSection.amount){
            dispatch({
              type: UPDATE_ERROR,
              payload: "amountError"
            });
            dispatch(triggerNotification({
              title: <FormattedMessage id = "app.transactions.emptyAmount"/>
            }));
            return;
        }
        if (store().transactions.tempToSection.ref1 && !store().transactions.tempToSection.termsConditions){
            dispatch({
              type: UPDATE_ERROR,
              payload: "termsError"
            });
            dispatch(triggerNotification({
              title: <FormattedMessage id = "app.registration.agreeConditions"/>
            }));
            return;
        }
        request.post(services.getQuickPaySummary)
          .send(store().transactions.tempToSection)
          .finish((error, res) => {
                dispatch({
                    type: TOGGLE_PAYMENT_MODAL,
                });
                dispatch({
                    type: ADD_MULTIPLE_RECIPIENT,
                    payload: store().transactions.tempToSection
                });
         });
    };
}
export function asyncSendPayReload() {
    return (dispatch, store) => {
        request.post(services.getQuickPaySummary)
          .send(store().transactions.tempToSection)
          .finish((error, res) => {
            dispatch({
              type: PAY_TRANSFER_SUCCESS,
              payload: {
                    paymentSummaryData: res.body,
                    showSummary:true
                }
            });
         });
    };
}
export function asyncSendTransfer() {
    return (dispatch, store) => {
        if (!store().transactions.tempToSection.amount){
            dispatch({
              type: UPDATE_ERROR,
              payload: "amountError"
            });
            dispatch(triggerNotification({
              title: <FormattedMessage id = "app.transactions.emptyAmount"/>
            }));
            return;
        }
        request.post(services.getQuickPaySummary)
          .send(store().transactions.tempToSection)
          .finish((error, res) => {
            dispatch({
                type: TOGGLE_PAYMENT_MODAL,
            });
            dispatch({
              type: PAY_TRANSFER_SUCCESS,
              payload: {
                    paymentSummaryData: res.body,
                    showSummary:true
                }
            });
         });
    };
}
export function asyncConfirmPayTransfer() {
    return (dispatch, store) => {
        request.post(services.getQuickPaySuccessSummary)
          .send(store().transactions.tempToSection)
          .finish((error, res) => {
            dispatch({
                type: PAY_TRANSFER_SUCCESS,
                payload: {
                        paymentSummaryData:res.body,
                        showSummary:true
                    }
            });
         });
    };
}
export function getAsyncPayDetails(payload) {
    const detailsMap = {
        "pay": services.getAsyncPayDetails,
        "transfer" : services.getAsyncTransferDetails,
        "reload" : services.getAsyncReloadDetails
    };
    return (dispatch, store) => {
        request.get(detailsMap[payload])
        .finish((error, res) => {
            setTimeout(()=>{
                dispatch({
                    type: PAY_DETAILS_DATA,
                    payload: res.body
                });
            }, 2000);
        });
    };
}
export function asyncReadMessage (payload) {
    return (dispatch, store) => {
        let newMessages = store().transactions.dashboardDetails.sideContent.unreadMessages.map(msg=>{
            return update(msg, {
                read: {
                    $set: (msg.read ? msg.read : msg.msg === payload.msg)
                }
            });
        });
        dispatch({
            type: UPDATE_READ_MESSAGES,
            payload:newMessages
        });
    };
}
export function updatePaymentList(payload) {
    return {
        type: UPDATE_PAYMENT_LIST,
        payload
    };
}
function handleToggleJompayModal(state,action) {
    return update(state, {
        paymentModalOpen: {
            $set: action.payload ? action.payload.keepClosedPayment : !state.paymentModalOpen
        },
        tempToSection: {
            $set: action.payload
        },
        favoriteInfo: {
            $set: action.payload
        }
    });
}
function handleUpdatePaymentList(state,action) {
    return update(state, {
        userPayeeInput: {
            $set: action.payload
        }
    });
}
function handleDashboardDetails(state, action) {
    let updatedPayload = update(action.payload, {
        sideContent: {
            unreadMessages: {
                $apply: (messages)=>{
                    return messages.map(msg=>{
                        return {
                            msg,
                            read: false
                        };
                    });
                }
            }
        }
    });
    return update(state, {
        dashboardDetails: {
            $set: updatedPayload
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
function handleUpdatePayeeSelection(state,action) {
    let changes = {
        payeeInfo: {
            $set: action.payload
        }
    };
    if (!state.payeeInfo) {
        if (action.payload.name.toUpperCase() === "JOMPAY"){
            changes.userPayeeInput = {
                $set: ""
            };
        }
    } else if (action.payload.name !== state.payeeInfo.name) {
        changes.userPayeeInput = {
            $set: ""
        };
    }
    return update(state, changes);
}
function handleUpdateFavoriteList(state,action) {
    return state;
}
function handleUpdateAccountSelection(state,action) {
    return update(state, {
        fromAccount: {
            $set: action.payload
        }
    });
}
function handleToggleFavoritePopup(state,action) {
    if (!action.payload) {
        return update(state, {
            favoritePopup: {
                $set: null
            }
        });
    }
    const newNumber = action.payload;
    let updatedState = state;
    const change = {
        favoritePopup: {
            $set:  newNumber
        }
    };
    return update(updatedState, change);
}
function handleUpdateReadMessages(state, action) {
    return update(state, {
        dashboardDetails: {
            sideContent: {
                unreadMessages: {
                    $set: action.payload
                }
            }
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
    let change = {
        tempToSection: {
            [key]: {
                $set: value
            }
        }
    };
    if (state.favoriteModalOpen){
        change = {
            favoriteInfo: {
                [key] : {
                    $set: value
                }
            }
        };
    }
    return update(state, change);
}
export function doneGoBack() {
    return (dispatch, store) => {
        dispatch({
            type: DONE
        });
        dispatch(triggerNotification({
          title: <FormattedMessage id = "app.transaction.newFavoriteSuccessfullyAdded"/>,
          message: <FormattedMessage id = "app.transaction.newFavoriteSuccessfullyMessage"/>,
          level: "success"
        }));
    };
}
function handleDone(state) {
  return update(state, {
            tempToSection: {$set:false},
            confirm: {$set:false},
            showSummary: {$set:false},
            paymentModalOpen:{$set:false},
            selectedRecipientList:{$set:[]},
            showFavoriteSummary: {$set:false},
            showMultipleSticky:{$set:false}
        });
}
function handlePayDetailsData(state, action) {
    return update( state, {
        payDetailsData: {
            $set: action.payload
        }
    });
}
function handlePayeeData(state, action){
  return update( state, {
        payeeList: {
            $set: action.payload
        }
    });
}
function handleError(state, action){
    return update(state, {
        errorName: {
            $set: action.payload
        }
    });
}
function handleUpdatePDFPages(state, action) {
    return update(state, {
        pdfPages: {
            $set: action.payload
        }
    });
}
function handlePdfView(state, action){
    return update(state, {
        receiptUrl: {
            $set: action.payload
        },
        paymentModalOpen: {
            $set: !state.paymentModalOpen
        }
    });
}
function handlePDFScale(state, action) {
    let currentScale = state.pdfScale || 1;
    return update(state, {
        pdfScale: {
            $set: action.payload ? currentScale + 0.2 : currentScale - 0.2
        }
    });
}
function handleToggleFavoriteModal(state, action) {
    if (state.favoriteModalOpen) {
        return update(state, {
            favoriteInfo:{
                $set: null
            },
            favoriteModalOpen: {
                $set: !state.favoriteModalOpen
            }
        });
    }
    return update(state, {
            favoriteInfo:{
                $set: action.payload || state.favoriteInfo || {}
            },
            favoriteModalOpen: {
                $set: !state.favoriteModalOpen
            }
        });
}
function handleTogglePaymentModal(state, action) {
    if (!action.payload) {
        return update(state, {
            paymentModalOpen: {
                $set: !state.paymentModalOpen
            }
        });
    }
    const mapForPay = {
        "transfer":{
            "currency": action.payload.currency,
            "transactionType" : action.payload.transactionTypes ? action.payload.transactionTypes[0] : "",
            "transferMode": action.payload.transferModes ? action.payload.transferModes[0] : "",
            "effectiveDate" : action.payload.currentEffectiveDate ? action.payload.currentEffectiveDate.display : ""
        },
        "pay": {
            "isFavourite":action.payload.isFavourite,
            "effectiveDate": action.payload.currentEffectiveDate ? action.payload.currentEffectiveDate.display : "",
            "fromAccount": action.payload.tempToSection && action.payload.tempToSection.accountNumber,
            "notes": action.payload.transactionInfo && action.payload.transactionInfo.notes || []
        },
        "reload": {
            "effectiveDate": action.payload.currentEffectiveDate ? action.payload.currentEffectiveDate.display : ""
        }
    };
    let payOptions = mapForPay[action.payload.quickOption];
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
        paymentModalOpen: {
            $set: !state.paymentModalOpen
        },
        tempToSection: {
            $set:action.payload.tempToSection || state.payload
        },
        showSideBar: {
            $set: false
        }
    });
}
function handleAddMultipleRecipient(state, action) {
    return update( state,{
        selectedRecipientList: {
            $push: [action.payload]
        },
        showMultipleSticky:{
            $set: true
        },
        tempToSection:{
            $set:null
        }
    });
}
function handlePayTransferSuccess(state, action){
    let newState = Object.assign({},state);
    newState.paymentSummaryData = action.payload.paymentSummaryData;
    newState.showSummary = action.payload.showSummary;
    newState.showMultipleSticky = action.payload.showMultipleSticky;
    newState.showFavoriteSummary = action.payload.showFavoriteSummary;
    if (newState.tempToSection) {
        newState.favoriteInfo = newState.tempToSection;
        newState.favoriteInfo.favouritePayee = state.payeeList.find(obj=>obj.id === newState.tempToSection.id);
    }
    newState.userPayeeInput = null;
    return newState;
}
function handleConfirm(state, action){
    return update( state,{
        confirm: {
            $set: state.payDetailsData.tacRequest ? !!state.tacRequest : true
        },
        tacRequest:{
            $set:true
        }
    });
}
function handleOTPSuccess(state) {
    return update(state, {
        confirm: {
            $set: true
        },
        tacRequest:{
            $set:false
        }
  });
}
function handleEditClicked(state, action){
    return update(state, {
        showSummary: {
            $set: null
        },
        showFavoriteSummary: {
            $set: null
        },
        paymentModalOpen:{
            $set:true
        },
        [action.payload]:{
            $set: true
        }
    });
}
function handleNewFavoriteList(state, action) {
    return update( state, {
        payDetailsData: {
            favorites: {
                $set: action.payload
            }
        }
    });
}
function handleResetTransactions() {
    return initialState;
}
const ACTION_HANDLERS = {
    TRANSACTION_DASHBOARD_DETAILS: handleDashboardDetails,
    TRANSACTION_SIDEBAR_TOGGLE: handleSidebarToggle,
    TRANSACTION_LEFT_SIDEBAR_TOGGLE:handleLeftSidebarToggle,
    UPDATE_READ_MESSAGES: handleUpdateReadMessages,
    PAY_DETAILS_DATA: handlePayDetailsData,
    TOGGLE_FAVORITE_POPUP: handleToggleFavoritePopup,
    RESET_TRANSACTIONS: handleResetTransactions,
    UPDATE_PAYMENT_LIST: handleUpdatePaymentList,
    PAYEE_DATA: handlePayeeData,
    TOGGLE_PAYMENT_MODAL: handleTogglePaymentModal,
    UPDATE_ACCOUNT_SELECTION : handleUpdateAccountSelection,
    GET_TRANSACTION_INPUT_DATA : handleInputData,
    UPDATE_PAYEE_SELECTION: handleUpdatePayeeSelection,
    TOGGLE_JOMPAY_MODAL: handleToggleJompayModal,
    TOGGLE_FAVORITE_MODAL: handleToggleFavoriteModal,
    UPDATE_FAVORITE_LIST: handleUpdateFavoriteList,
    PAY_TRANSFER_SUCCESS: handlePayTransferSuccess,
    UPDATE_ERROR:handleError,
    CONFIRM :handleConfirm,
    DONE: handleDone,
    EDIT_CLICKED:handleEditClicked,
    NEW_FAVORITE_LIST: handleNewFavoriteList,
    TOGGLE_PDF_SCALE: handlePDFScale,
    TOGGLE_PDF_VIEW:handlePdfView,
    OTP_SUCCESS:handleOTPSuccess,
    ADD_MULTIPLE_RECIPIENT: handleAddMultipleRecipient
};
const initialState = {
    currentPage: "pay&Transfer",
    inputData: {},
    selectedRecipientList: []
};
export default function transactionReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
