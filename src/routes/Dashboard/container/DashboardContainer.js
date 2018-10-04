import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";
import {updateIntl} from "react-intl-redux";
import {
    getAsyncDashboardData,
    readMessage,
    menuButtonClick,
    leftMenuButtonClick,
    navigatePage,
    togglePopupMenu,
    updateTotalSpendingInfo,
    handleNextIndex,
    goToAccountDetails,
    toggleSearchChat,
    navigateToDifferentPages,
    resetDashboard,
    modifyCardActions,
    triggerNotification,
    searchFilterActions,
    asyncCheckOTPOnCardsActions,
    updateInputCardDetails,
    toggleQuickPayTransferModal,
    getAsyncQuickPayDetails,
    updateAccountSelection,
    asyncCheckCardsActions,
    getInputData,
    asyncSendQuickPay,
    confirmDetails,
    asyncConfirmQuickPay,
    doneGoBack,
    editClick,
    resetError,
    goToWealthDetails,
    resetLoginStore,
    setCurrentAccount,
    getAsyncMoreBalanceCards
} from "../modules/dashboard";
function updateMessages(locale) {
    return (dispatch, state)=> {
        dispatch(updateIntl({
            locale,
            messages: state().messages[locale]
        }));
    };
}
function toggleLoader() {
  return (dispatch, state)=> {
    dispatch({
        type: "TOGGLE_LOADER"
    });
  };
}


const mapStateToProps = (state) => ({
    locale: state.intl.locale,
    messages: state.intl.messages,
    dashboardDetails: state.dashboard.dashboardDetails || {},
    showSideBar: state.dashboard.showSideBar,
    showLeftSideBar: state.dashboard.showLeftSideBar,
    popupMenu: state.dashboard.popupMenu || {},
    totalSpendingInfo: state.dashboard.totalSpendingInfo || {},
    goalsStartIndex: state.dashboard.goalsStartIndex || 0,
    showSearchModal: state.dashboard.showSearchModal,
    webchat: state.dashboard.webchat,
    searchfilter: state.dashboard.searchFilter,
    currentPage: state.dashboard.currentPage,
    showLoader: state.loader.showLoader,
    cardActions: state.dashboard.cardActions || {},
    notification: state.notification,
    searchText: state.dashboard.searchText,
    errorName: state.dashboard.errorName || "",
    showQuickPay: state.dashboard.showQuickPay,
    quickPayDetails: state.dashboard.quickPayDetails || {},
    fromAccount: state.dashboard.fromAccount || {},
    tempToSection: state.dashboard.tempToSection || {},
    toSection: state.dashboard.toSection || {},
    quickPaySummary:state.dashboard.quickPaySummary,
    currentIndex: state.dashboard.currentIndex,
    confirm:state.dashboard.confirm,
    userProfile: state.dashboard.userProfile || [],
    currentAccount:state.dashboard.currentAccount || {},
    retrievalStartIndex:state.dashboard.retrievalStartIndex
});

const mapDispatchToProps = {
    updateMessages,
    getAsyncDashboardData,
    menuButtonClick,
    navigatePage,
    leftMenuButtonClick,
    togglePopupMenu,
    readMessage,
    updateTotalSpendingInfo,
    handleNextIndex,
    goToAccountDetails,
    toggleSearchChat,
    navigateToDifferentPages,
    resetDashboard,
    toggleLoader,
    modifyCardActions,
    triggerNotification,
    searchFilterActions,
    asyncCheckOTPOnCardsActions,
    updateInputCardDetails,
    toggleQuickPayTransferModal,
    getAsyncQuickPayDetails,
    updateAccountSelection,
    asyncCheckCardsActions,
    getInputData,
    asyncSendQuickPay,
    confirmDetails,
    asyncConfirmQuickPay,
    doneGoBack,
    editClick,
    resetError,
    goToWealthDetails,
    resetLoginStore,
    setCurrentAccount,
    getAsyncMoreBalanceCards
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
