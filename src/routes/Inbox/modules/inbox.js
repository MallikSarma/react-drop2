import request from "../../../util/request";
import update from "react/lib/update";
import services from "../../../services";
import { push } from "react-router-redux";
import constants from "./actionConstants";
import validations from "../../../util/validations";
const {
    INBOX_MESSAGES,
    CURRENT_INBOX_MESSAGE,
    INBOX_SIDEBAR_TOGGLE,
    INBOX_LEFT_SIDEBAR_TOGGLE,
    RESET_STORE,
    DASHBOARD_DETAILS,
    UPDATE_READ_MESSAGES,
    CONFIRM,
    DONE,
    EDIT_CLICKED,
    TOGGLE_QUICK_PAY_TRANSFER,
    GET_INPUT_DATA,
    QUICK_PAY_SUCCESS,
    UPDATE_PDF_PAGES,
    TOGGLE_VIEW_BILL_PDF,
    TOGGLE_PDF_VIEW,
    TOGGLE_PDF_SCALE,
    TOGGLE_SEARCH_AND_CHAT,
    SEARCH_FILTER_ACTIONS
} = constants;
export function readMessage (payload) {
    return {
        type: UPDATE_READ_MESSAGES
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
export function resetStore() {
    return {
      type: RESET_STORE
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
export function navigatePage(payload){
    let locationArray = window.location.pathname.split(/(\/)/);
    if (window.location.pathname.match(/[\/]$/)){
      locationArray = locationArray.slice(0,locationArray.length - 5);
    }
    else {
      locationArray = locationArray.slice(0,locationArray.length - 4);
    }
    return push(locationArray.join("") + "/dashboard/" + payload);
}
export function menuButtonClick(){
  return {
    type: INBOX_SIDEBAR_TOGGLE
  };
}
export function leftMenuButtonClick(){
  return {
    type: INBOX_LEFT_SIDEBAR_TOGGLE
  };
}
export function readCurrentMessage(payload){
    return {
    type: CURRENT_INBOX_MESSAGE,
    payload
  };
}
export function getAsyncInboxData(){
    return (dispatch, store) => {
      const payload = {};
      request.post(services.getInboxData)
        .send(payload)
        .finish((error, res) => {
            setTimeout(()=>{
              dispatch({
                  type: INBOX_MESSAGES,
                  payload: res.body
              });
            }, 2000);
       });
    };
}
export function toggleQuickPayTransferModal(payload) {
    return {
        type: TOGGLE_QUICK_PAY_TRANSFER,
        payload
    };
}
export function toggleViewBillPdf(payload){
    return {
        type:TOGGLE_VIEW_BILL_PDF,
        payload
    };
}
export function togglePdfScale(payload) {
    return {
        type: TOGGLE_PDF_SCALE,
        payload
    };
}
export function handlePDFUrl(payload){
    return {
        type: TOGGLE_PDF_VIEW,
        payload
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
export function editClick(payload) {
    return {
        type: EDIT_CLICKED,
        payload
    };
}
export function confirmDetails(payload) {
  return {
      type: CONFIRM
    };
}
export function doneGoBack() {
  return (dispatch, store) => {
    dispatch({
        type: DONE
    });
    };
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
          .send(store().inbox.tempToSection)
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
          .send(store().inbox.tempToSection)
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
export function updatePDFpages(payload) {
    return {
        type: UPDATE_PDF_PAGES,
        payload
    };
}
function handleCurrentInboxMessage(state,action){
    return update(state, {
        currentInboxId: {
            $set: action.payload
        }
    });
}
function handleInboxData(state,action){
    return update(state, {
      inboxData: {
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
function handleUpdateReadMessages(state, action) {
    return update(state, {
        currentIndex: {
            $set: state.currentIndex === state.dashboardDetails.sideContent.unreadMessages.length - 1 ? 0 : state.currentIndex + 1
        }
    });
}
function handleResetStore() {
    return initialState;
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
    certificateSummary: {
      $set: null
    },
    redrawSummary: {
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
        transfer:{
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
            "fromAccount": action.payload.accounts[0].accountNumber
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
function handleToggleViewBillPdf(state, action) {
    let pdfUrl = state.inboxData.inboxContent.inbox[0].billDetails || {};
    let change = {
        receiptUrl: {
            $set: pdfUrl.billPdfUrl
        }
    };
    return update(state, change);
}
function handlePdfView(state, action){
    return update(state, {
        receiptUrl: {
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
function handleSearchFilter(state, action) {
    return update(state, {
        searchText: {
            $set: action.payload
        }
    });
}
const ACTION_HANDLERS = {
    INBOX_MESSAGES: handleInboxData,
    CURRENT_INBOX_MESSAGE: handleCurrentInboxMessage,
    INBOX_SIDEBAR_TOGGLE : handleSidebarToggle,
    INBOX_LEFT_SIDEBAR_TOGGLE : handleLeftSidebarToggle,
    RESET_STORE: handleResetStore,
    UPDATE_READ_MESSAGES: handleUpdateReadMessages,
    DONE:handleDone,
    CONFIRM:handleConfirm,
    EDIT_CLICKED:handleEditClicked,
    TOGGLE_QUICK_PAY_TRANSFER: handleToggleQuickPayTransferModal,
    GET_INPUT_DATA: handleInputData,
    QUICK_PAY_SUCCESS:handleQuickPaySuccess,
    UPDATE_PDF_PAGES: handleUpdatePDFPages,
    TOGGLE_VIEW_BILL_PDF:handleToggleViewBillPdf,
    TOGGLE_PDF_SCALE: handlePDFScale,
    TOGGLE_PDF_VIEW:handlePdfView,
    TOGGLE_SEARCH_AND_CHAT:handleToggleSearchChat,
    SEARCH_FILTER_ACTIONS:handleSearchFilter
};
const initialState = {
  currentIndex: 0
};
export default function inboxReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
