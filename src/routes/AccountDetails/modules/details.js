import request from "../../../util/request";
import update from "react/lib/update";
import services from "../../../services";
import { push } from "react-router-redux";
import validations from "../../../util/validations";
import _ from "lodash";
import constants from "./actionConstants";
import { FormattedMessage } from "react-intl";
import React from "react";
const {
    ACCOUNT_DETAILS_SIDEBAR_TOGGLE,
    MODIFY_TABLE_TYPE,
    ACCOUNT_DETAILS_LEFT_SIDEBAR_TOGGLE,
    TOGGLE_PDF_SCALE,
    TOGGLE_PDF_VIEW,
    UPDATE_READ_MESSAGES,
    RESET_ACCOUNT_DETAILS,
    UPDATE_PDF_PAGES,
    TOGGLE_PLACEMENT_FD,
    UPLIFT_MANAGE_FD,
    UPDATE_REWARD,
    UPDATE_PLACEMENT_DATA,
    TOGGLE_REDRAW_LOAN,
    UPDATE_REDRAW_DATA,
    SET_REQUEST_HARD_COPY_DATA,
    TOGGLE_REQUEST_HARD_COPY_POPUP,
    REQUEST_HARD_COPY_SUCCESS,
    REMOVE_NOTIFICATION,
    ADD_NOTIFICATION,
    TOGGLE_VIEW_STATEMENT_PDF,
    MAKE_PLACEMENT_SUCCESS,
    UPDATE_ERROR,
    TOGGLE_POPUP_MENU,
    SET_UPLIFT_MANAGE_DATA,
    CONFIRM,
    TOGGLE_SEARCH_AND_CHAT,
    SEARCH_FILTER_ACTIONS,
    REQUEST_TAC_SUCCESS,
    OTP_SUCCESS,
    DONE,
    EDIT_CLICKED,
    REDRAW_SUCCESS,
    TOGGLE_QUICK_PAY_TRANSFER,
    GET_INPUT_DATA,
    QUICK_PAY_SUCCESS,
    GET_ACCOUNT_TRANSACTION,
    SHOW_MORE_ACCOUNT_TRANSACTION
} = constants;
const retrievalStartIndex = "000000000000000000000000";
export function searchFilterActions(payload){
    return {
        type: SEARCH_FILTER_ACTIONS,
        payload
    };
}
export function toggleSearchChat(payload){
    return {
        type: TOGGLE_SEARCH_AND_CHAT,
        payload
    };
}
export function removeNotifications(payload) {
  return {
      type: REMOVE_NOTIFICATION
    };
}
export function togglePopupMenu(payload){
    return {
        type: TOGGLE_POPUP_MENU,
        payload
  };
}
export function triggerNotification(payload) {
  return (dispatch, store) => {
  const notificationOpts = {
    uid: Math.random(),
    title: payload.title,
    message: payload.message,
    position: "bc",
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
export function toggleQuickPayTransferModal(payload) {
    return {
        type: TOGGLE_QUICK_PAY_TRANSFER,
        payload
    };
}
export function getAsyncLoanTransfer () {
    return (dispatch, store) => {
        const payload = {};
        request.post(services.getAsyncLoanTransfer)
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
export function getAsyncCardPaymentInfo () {
    return (dispatch, store) => {
        const payload = {};
        request.post(services.getCardTransfer)
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
export function getAsyncAccTransaction (payload) {
    return (dispatch, store) => {
        let data = {
            "reqInfo":{
                "retrievalReference":retrievalStartIndex,
                "retrievalMode":"1"
            },
            "idx": store().dashboard.currentAccount.idx,
            "code":store().dashboard.currentAccount.code,
            "type":store().dashboard.currentAccount.type,
            "displayNumber":store().dashboard.currentAccount.displayNumber,
            ...store().details.tableData
        };
        if (payload){
            data[payload.key] = payload.value;
        }
        request.post(services.getAccTransaction)
            .send(data)
            .finish((error, res) => {
                dispatch({
                    type: GET_ACCOUNT_TRANSACTION,
                    payload: {
                        response:res.body,
                        currentRequest: {
                            "retrievalReference":retrievalStartIndex,
                            "retrievalMode":"1"
                        }
                    }
                });
                if (payload){
                    dispatch({
                        type: MODIFY_TABLE_TYPE,
                        payload
                    });
                }
            });
    };
}
export function getAsyncMoreAccTransactions (payload) {
    return (dispatch, store) => {
        const reqInfo = payload.reduce ? store().details.requestArray[store().details.requestArray.length - 1] : store().details.accountTransactions.reqInfo;
        let data = {
            reqInfo,
            "idx": store().dashboard.currentAccount.idx,
            "code":store().dashboard.currentAccount.code,
            "type":store().dashboard.currentAccount.type,
            "displayNumber":store().dashboard.currentAccount.displayNumber,
            ...store().details.tableData
        };
        request.post(services.getAccTransactionMore)
            .send(data)
            .finish((error, res) => {
                dispatch({
                    type: SHOW_MORE_ACCOUNT_TRANSACTION,
                    payload: {
                        response: res.body,
                        reqInfo,
                        previousRequest: store().details.currentRequest,
                        reduce: payload.reduce
                    }
                });
                if (payload){
                    dispatch({
                        type: MODIFY_TABLE_TYPE,
                        payload
                    });
                }
            });
    };
}

export function getAsyncRewardDetails(payload) {
    return (dispatch, store) => {
        let data = {
            "idx": store().dashboard.currentAccount.idx,
            "code":store().dashboard.currentAccount.code,
            "type":store().dashboard.currentAccount.type
        };
        request.post(services.getRewardCardDetails)
            .send(data)
            .finish((error, res) => {
                dispatch({
                    type: UPDATE_REWARD,
                    payload: res.body
                });
                if (payload){
                    dispatch({
                        type: "SET_CURRENT_ACCOUNT",
                        payload
                    });
                }
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
        type: ACCOUNT_DETAILS_SIDEBAR_TOGGLE
    };
}
export function editClick(payload) {
    return {
        type: EDIT_CLICKED,
        payload
    };
}
export function updatePDFpages(payload) {
    return {
        type: UPDATE_PDF_PAGES,
        payload
    };
}
export function leftMenuButtonClick() {
    return {
        type: ACCOUNT_DETAILS_LEFT_SIDEBAR_TOGGLE
    };
}
export function resetAccountDetails() {
    return {
        type: RESET_ACCOUNT_DETAILS
    };
}
export function togglePlacementFD(payload){
    return {
        type:TOGGLE_PLACEMENT_FD,
        payload
    };
}
export function toggleRedrawLoan(payload){
    return {
        type:TOGGLE_REDRAW_LOAN,
        payload
    };
}
export function upliftManageFD(payload) {
    return {
        type: UPLIFT_MANAGE_FD,
        payload
    };
}
export function updatePlacementData(payload){
    return {
        type: UPDATE_PLACEMENT_DATA,
        payload
    };
}
export function updateRedrawData(payload){
    return {
        type: UPDATE_REDRAW_DATA,
        payload
    };
}
export function togglePdfScale(payload) {
    return {
        type: TOGGLE_PDF_SCALE,
        payload
    };
}
function handlePopupMenu(state, action){
    return update(state, {
        popupOpen: {
                $set: action.payload ? false : !state.popupOpen
        }
    });
}
export function handlePDFUrl(payload){
    return {
        type: TOGGLE_PDF_VIEW,
        payload
    };
}
export function confirmDetails(payload) {
  return {
      type: CONFIRM
    };
}
export function readMessage (payload) {
    return {
        type: UPDATE_READ_MESSAGES,
        payload
    };
}
export function setRequestHardCopyData(payload) {
    return {
        type:SET_REQUEST_HARD_COPY_DATA,
        payload
    };
}
export function setUpliftManageData(payload) {
    return {
        type:SET_UPLIFT_MANAGE_DATA,
        payload
    };
}
export function toggleRequestHardCopyPopup(payload){
    return {
        type:TOGGLE_REQUEST_HARD_COPY_POPUP,
        payload
    };
}
export function toggleViewStatementPdf(payload){
    return {
        type:TOGGLE_VIEW_STATEMENT_PDF,
        payload
    };
}
export function asyncCheckRequestHardCopy() {
  return (dispatch, store) => {
    dispatch({
        type: REQUEST_HARD_COPY_SUCCESS
    });
    dispatch(triggerNotification({
        title: <FormattedMessage id="app.details.requestHardCopy"/>,
        message: <FormattedMessage id = "app.details.yourRequestHasBeen"/>,
        level: "success"
    }));
  };
}
export function asyncCheckMakePlacement() {
  return (dispatch, store) => {
    const {agreeConditions} = store().details.placementData;
    const {state} = validations.checkAgreeTerms(agreeConditions);
    if (state) {
        dispatch({
          type: UPDATE_ERROR
        });
        dispatch({
          type: REMOVE_NOTIFICATION
        });
        dispatch({
            type: UPDATE_ERROR
        });
        request.post(services.getFDCertificateSummary)
          .send(store().details.placementData)
          .finish((error, res) => {
            dispatch({
              type: MAKE_PLACEMENT_SUCCESS,
              payload: {
              certificateSummary: update(res.body,{
                    makePlacementModal: {
                        $set: true
                    }
              })
            }
            });
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
export function asyncConfirmMakePlacement() {
    return (dispatch, store) => {
        request.post(services.getFDCertificateSuccessSummary)
          .send(store().details.placementData)
          .finish((error, res) => {
            dispatch({
              type: MAKE_PLACEMENT_SUCCESS,
              payload: {
              certificateSummary: update(res.body,{
                    makePlacementModal: {
                        $set: true
                    }
              })
            }
            });
         });
    };
}
export function asyncCheckRedraw() {
  return (dispatch, store) => {
    const {agreeConditions} = store().details.redrawData;
    const {state} = validations.checkAgreeTerms(agreeConditions);
    if (state) {
        dispatch({
          type: UPDATE_ERROR
        });
        dispatch({
          type: REMOVE_NOTIFICATION
        });
        dispatch({
            type: UPDATE_ERROR
        });
        request.post(services.getRedrawSummary)
          .send(store().details.redrawData)
          .finish((error, res) => {
            dispatch({
              type: REDRAW_SUCCESS,
              payload: {
              redrawSummary: update(res.body,{
                    redrawModal: {
                        $set: true
                    }
              })
            }
            });
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
export function asyncConfirmRedraw() {
    return (dispatch, store) => {
        request.post(services.getRedrawSuccessSummary)
          .send(store().details.redrawData)
          .finish((error, res) => {
            dispatch({
              type: REDRAW_SUCCESS,
              payload: {
              redrawSummary: update(res.body,{
                    redrawModal: {
                        $set: true
                    }
              })
            }
            });
         });
    };
}
export function asyncCheckUpliftManage(payload) {
  return (dispatch, store) => {
    const {agreeConditions} = store().details.upliftManageFDdata;
    const {state} = validations.checkAgreeTerms(agreeConditions);
    if (state) {
        dispatch({
          type: UPDATE_ERROR
        });
        dispatch({
          type: REMOVE_NOTIFICATION
        });
        dispatch({
            type: UPDATE_ERROR
        });
        request.post(services.getFDCertificateSummary)
          .send(store().details.upliftManageFDdata)
          .finish((error, res) => {
            dispatch({
              type: MAKE_PLACEMENT_SUCCESS,
              payload: {
              certificateSummary: update(res.body,{
                    [payload]: {
                        $set: true
                    }
              })
            }
            });
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
export function asyncConfirmUpliftManage(payload) {
    return (dispatch, store) => {
        request.post(services.getFDCertificateSuccessSummary)
          .send(store().details.placementData)
          .finish((error, res) => {
            dispatch({
              type: MAKE_PLACEMENT_SUCCESS,
              payload: {
              certificateSummary: update(res.body,{
                    [payload]: {
                        $set: true
                    }
              })
            }
            });
         });
    };
}
export function asyncRequestTAC() {
  return (dispatch, store)=> {
        dispatch({
          type: REQUEST_TAC_SUCCESS
        });
  };
}
export function asyncCheckOTP() {
  return (dispatch, store) => {
    dispatch({
        type: OTP_SUCCESS
    });
    };
}
export function doneGoBack() {
  return (dispatch, store) => {
    dispatch({
        type: DONE
    });
    };
}
export function handleUpdatePlacementData(state, action){
    const {key, value} = action.payload;
    if (key === "amount") {
        if (!validations.checkNumber(value)){
            return state;
        }
    }
    return update(state, {
        placementData: {
            [key]:{
                $set:value
            }
        }
    });
}
export function handleUpdateRedrawData(state, action){
    const {key, value} = action.payload;
    if (key === "amount") {
        if (!validations.checkNumber(value)){
            return state;
        }
    }
    return update(state, {
        redrawData: {
            [key]:{
                $set:value
            }
        }
    });
}
export function getInputData(payload) {
    return {
        type:GET_INPUT_DATA,
        payload
    };
}
export function asyncSendQuickPay() {
    return (dispatch, store) => {
        request.post(services.getQuickPaySummary)
          .send(store().details.tempToSection)
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
export function asyncConfirmQuickPay() {
    return (dispatch, store) => {
        request.post(services.getQuickPaySuccessSummary)
          .send(store().details.tempToSection)
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
function handleAccountDetails(state, action) {
    return update(state, {
        accountDetails: {
            $set: action.payload
        }
    });
}

function handleUpdateReadMessages(state, action) {
    return update(state, {
        currentIndex: {
            $set: state.currentIndex === action.payload - 1 ? 0 : state.currentIndex + 1
        }
    });
}
function handlePdfView(state, action){
    return update(state, {
        receiptUrl: {
            $set: action.payload
        }
    });
}
function handleUpdateReward(state,action){
    return update(state,{
        refreshRewards:{
            $set: action.payload
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

function handleModifyTableData(state, action) {
    if (action.payload.reduce){
        let reducedArray = state.requestArray.pop();
        return update(state, {
            requestArray:{
                $set: reducedArray
            }
        });
    }
    return update(state, {
        tableData: {
            [action.payload.key]: {
                $set: action.payload.value
            }
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
function handleToggleRedrawLoan(state, action){
    let change = {
        redrawData: {
            $set:{
                toAccount: state.accountDetails.allAccounts[0],
                accountInfo: {
                    name:state.accountDetails.name,
                    number:state.accountDetails.number
                },
                processingFee: state.accountDetails.processingFee
            }
        },
        showRedraw: {
            $set: !state.showRedraw
        }
    };
    return update(state, change);
}
function handleTogglePlacementFD(state, action){
    let change = {
        placementData: {
            $set:{
                transferFrom: state.accountTransactions.defaultData.allAccounts[0],
                term: state.accountTransactions.defaultData.term[0],
                interestFrequency: state.placementData.term ? state.placementData.term.interestFrequency[0] : state.accountTransactions.defaultData.term[0].interestFrequency[0],
                interestMode: state.accountTransactions.defaultData.interestMode[0],
                maturityInstructions: state.accountTransactions.defaultData.maturityInstructions[0]
            }
        },
        showMakePlacement: {
            $set: !state.showMakePlacement
        }
    };
    return update(state, change);
}
function handleUpliftManageFD(state, action) {
    if (typeof action.payload === "undefined"){
        return update(state, {
            manageFD: {
                $set: null
            }
        });
    }
    if (typeof action.payload === "number") {
        return update(state, {
            manageFD: {
                $set: {
                    rowIndex: action.payload
                }
            }
        });
    }
    let change = {
            upliftManageFDdata: {
                $set: action.payload
        }
    };
    return update(state, change);
}
function handleSetUpliftManageData(state, action) {
    const {key, value} = action.payload;
    return update(state, {
        upliftManageFDdata: {
            [key]:{
                $set:value
            },
        }
    });
}
function handleReset(state) {
    return initialState;
}
function handleRequestHardCopyData(state, action) {
    const {key, value} = action.payload;
    return update(state, {
        requestHardCopy: {
            [key]:{
                $set:value
            }
        }
    });
}
function handleToggleRequestHardCopyPopup(state,action) {
    let change = {
        requestHardCopy: {
            $set:{
                statementDetails: state.accountTransactions.statementDetails[0],
                collectionModes: state.accountTransactions.collectionModes[0]
            }
        },
        showMakeRequestHardCopy: {
            $set: !state.showMakeRequestHardCopy
        }
    };
    return update(state, change);
}
function handleRequestHardCopySuccess(state) {
    return update( state,{
        requestHardCopySuccess: {
            $set: true
        }
    });
}
function handleToggleViewStatementPdf(state, action) {
    let change = {
        viewStatementPdf: {
            $set:{
                statementDetails: action.payload || state.accountTransactions.statementDetails[0]
            }
        },
        receiptUrl: {
            $set: action.payload ? action.payload.statementPdfUrl : state.accountTransactions.statementDetails[0].statementPdfUrl
        }
    };
    return update(state, change);
}
function handleError(state, action){
  return update(state, {
    errorName: {
      $set: action.payload
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
function handleMakePlacementSuccess(state, action){
      let newState = Object.assign({},state);
      newState.certificateSummary = action.payload.certificateSummary;
      return newState;
}
function handleRedrawSuccess(state, action){
      let newState = Object.assign({},state);
      newState.redrawSummary = action.payload.redrawSummary;
      return newState;
}
function handleConfirm(state, action){
        return update( state,{
        confirm: {
            $set: true
        }
    });
}
function handleTACRequestSuccess(state) {
  return update(state, {
    tacRequest: {
      $set: true
    }
  });
}
function handleOTPSuccess(state) {
  return update(state, {
    confirm: {
      $set: true
    }
  });
}
function handleDone(state) {
  return update(state, {
    certificateSummary: {
      $set: null
    },
    showMakePlacement:{
        $set: false
    },
    upliftManageFDdata:{
        $set: false
    },
    confirm:{
        $set: false
    },
    requestTac:{
        $set: false
    },
    tacRequest:{
        $set: false
    },
    redrawSummary:{
        $set: null
    },
    placementData: {
        $set: false
    },
    showRedraw: {
        $set: false
    },
    quickPaySummary: {
      $set: null
    },
    showQuickPay:{
        $set: false
    },
    tempToSection:{
        $set: false
    },
    quickPayDetails:{
        $set: false
    }
  });
}
function handleEditClicked(state, action){
      return update(state, {
    certificateSummary: {
      $set: null
    },
    redrawSummary: {
      $set: null
    },
    quickPaySummary: {
      $set: null
    },
    [action.payload]:{
        $set: true
    }
  });

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
            "payOption": action.payload.cardPayment ? "anyAmount" : "",
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
            "name":action.payload.isFavourite ? action.payload.transactionInfo.name : action.payload.transactionInfo.serviceProviderName,
            "fromAccount": action.payload.accounts[0].accountNumber,
            "amount" : action.payload.transactionInfo.reloadAmount ? action.payload.transactionInfo.reloadAmount[0] : "",
            "mobileNumber" : action.payload.transactionInfo.mobileNumber,
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

function handleInputData(state, action) {
    const {key, value} = action.payload;
    const checkArray = ["amount", "accountNumber", "phoneNumber"];
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
function handleQuickPaySuccess(state, action){
    return update(state,{
        quickPaySummary: {
            $set: action.payload.quickPaySummary
        },
        showQuickPay:{
            $set: false
        }
    });
}
function handeAccountTransactions(state, action) {
    return update(state, {
        accountTransactions: {
            $set: action.payload.response
        },
        currentRequest:{
            $set: action.payload.currentRequest
        }
    });
}
function handleShowMoreAccTransactions(state, action){
    if (!action.payload.reduce){
        return update(state, {
            accountTransactions: {
                $set: action.payload.response
            },
            requestArray:{
                $push: [action.payload.previousRequest] || []
            },
            currentRequest: {
                $set: action.payload.reqInfo
            }
        });
    }
    return update(state, {
            accountTransactions: {
                $set: action.payload.response
            },
            requestArray:{
                $splice: [[state.requestArray.length - 1]]
            }
        });
}
const ACTION_HANDLERS = {
    ACCOUNT_DETAILS_SIDEBAR_TOGGLE: handleSidebarToggle,
    ACCOUNT_DETAILS_LEFT_SIDEBAR_TOGGLE:handleLeftSidebarToggle,
    ACCOUNT_DETAILS: handleAccountDetails,
    MODIFY_TABLE_TYPE: handleModifyTableData,
    UPDATE_READ_MESSAGES: handleUpdateReadMessages,
    TOGGLE_PDF_SCALE: handlePDFScale,
    TOGGLE_PDF_VIEW:handlePdfView,
    RESET_ACCOUNT_DETAILS: handleReset,
    TOGGLE_PLACEMENT_FD:handleTogglePlacementFD,
    UPLIFT_MANAGE_FD: handleUpliftManageFD,
    UPDATE_PDF_PAGES: handleUpdatePDFPages,
    UPDATE_REWARD:handleUpdateReward,
    UPDATE_PLACEMENT_DATA : handleUpdatePlacementData,
    TOGGLE_REDRAW_LOAN:handleToggleRedrawLoan,
    UPDATE_REDRAW_DATA:handleUpdateRedrawData,
    SET_REQUEST_HARD_COPY_DATA:handleRequestHardCopyData,
    TOGGLE_REQUEST_HARD_COPY_POPUP:handleToggleRequestHardCopyPopup,
    REQUEST_HARD_COPY_SUCCESS:handleRequestHardCopySuccess,
    TOGGLE_VIEW_STATEMENT_PDF:handleToggleViewStatementPdf,
    UPDATE_ERROR:handleError,
    TOGGLE_POPUP_MENU: handlePopupMenu,
    SET_UPLIFT_MANAGE_DATA:handleSetUpliftManageData,
    MAKE_PLACEMENT_SUCCESS:handleMakePlacementSuccess,
    TOGGLE_SEARCH_AND_CHAT: handleToggleSearchChat,
    REQUEST_TAC_SUCCESS:handleTACRequestSuccess,
    OTP_SUCCESS:handleOTPSuccess,
    DONE:handleDone,
    CONFIRM:handleConfirm,
    EDIT_CLICKED:handleEditClicked,
    REDRAW_SUCCESS:handleRedrawSuccess,
    TOGGLE_QUICK_PAY_TRANSFER: handleToggleQuickPayTransferModal,
    GET_INPUT_DATA: handleInputData,
    QUICK_PAY_SUCCESS:handleQuickPaySuccess,
    GET_ACCOUNT_TRANSACTION:handeAccountTransactions,
    SEARCH_FILTER_ACTIONS: handleSearchFilter,
    SHOW_MORE_ACCOUNT_TRANSACTION: handleShowMoreAccTransactions
};
const initialState = {
    tableData: {
        timeSpan: 30,
        transactionType: ""
    },
    placementData:{},
    redrawData:{},
    currentPage: "accounts",
    currentIndex: 0,
    requestArray: []
};
export default function detailsReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
