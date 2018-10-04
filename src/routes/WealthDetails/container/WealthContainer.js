import { connect } from "react-redux";
import {} from "../modules/wealth";
import Wealth from "../components/Wealth";
import { updateIntl } from "react-intl-redux";
import {
    navigateToDifferentPages,
    resetWealthDetails,
    menuButtonClick,
    leftMenuButtonClick,
    getAsyncDashboardData,
    readMessage,
    getWealthDetails,
    navigatePage,
    togglePopupMenu,
    toggleSearchChat,
    searchFilterActions,
    getShareAccountsData,
    updateTableRecords,
    toggleDisplayedWealths,
    getSliderPosition
  } from "../modules/wealth";
function updateMessages(locale) {
  return (dispatch, state)=> {
    dispatch(updateIntl({
      locale,
      messages: state().messages[locale]
    }));
  };
}

const mapStateToProps = (state) => ({
    locale: state.intl.locale,
    messages: state.intl.messages,
    dashboardDetails: state.wealth.dashboardDetails,
    wealthDetails: state.wealth.wealthDetails,
    showSideBar: state.wealth.showSideBar,
    showLeftSideBar: state.wealth.showLeftSideBar,
    currentPage: state.wealth.currentPage,
    showSearchModal: state.wealth.showSearchModal,
    popupOpen: state.wealth.popupOpen,
    webchat: state.wealth.webchat,
    searchText: state.wealth.searchText,
    currentIndex: state.wealth.currentIndex,
    shareAccountsDetails:state.wealth.shareAccountsDetails,
    tableData: state.wealth.tableData || {},
    intNumOfDisplayedWealths: state.wealth.intNumOfDisplayedWealths || 6,
    sliderPosition:state.wealth.sliderPosition,
    shareFundDetails:state.wealth.shareFundDetails
});

const mapDispatchToProps = {
    updateMessages,
    navigateToDifferentPages,
    resetWealthDetails,
    menuButtonClick,
    leftMenuButtonClick,
    getAsyncDashboardData,
    readMessage,
    getWealthDetails,
    navigatePage,
    togglePopupMenu,
    toggleSearchChat,
    searchFilterActions,
    getShareAccountsData,
    updateTableRecords,
    toggleDisplayedWealths,
    getSliderPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(Wealth);