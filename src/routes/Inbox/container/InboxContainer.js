import { connect } from "react-redux";
import Inbox from "../components/Inbox";
import {updateIntl} from "react-intl-redux";
import {
    getAsyncInboxData,
    readCurrentMessage,
    menuButtonClick,
    leftMenuButtonClick,
    navigateToDifferentPages,
    resetStore,
    readMessage,
    toggleQuickPayTransferModal,
    getAsyncQuickPayDetails,
    editClick,
    confirmDetails,
    doneGoBack,
    getInputData,
    asyncSendQuickPay,
    asyncConfirmQuickPay,
    updatePDFpages,
    toggleViewBillPdf,
    togglePdfScale,
    handlePDFUrl,
    toggleSearchChat,
    searchFilterActions
} from "../modules/inbox";
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
    inboxData:state.inbox.inboxData,
    currentInboxId: state.inbox.currentInboxId || 0,
    showSideBar: state.inbox.showSideBar,
    showLeftSideBar: state.inbox.showLeftSideBar,
    dashboardDetails: state.dashboard.dashboardDetails || {},
    currentIndex: state.inbox.currentIndex,
    showQuickPay: state.inbox.showQuickPay,
    quickPayDetails: state.inbox.quickPayDetails,
    tempToSection: state.inbox.tempToSection,
    quickPaySummary: state.inbox.quickPaySummary,
    confirm:state.inbox.confirm,
    pdfPages: state.inbox.pdfPages,
    pdfScale: state.inbox.pdfScale || 1,
    receiptUrl: state.inbox.receiptUrl,
    showSearchModal: state.inbox.showSearchModal,
    webchat: state.inbox.webchat,
    userProfile: state.dashboard.userProfile || [],
    searchText: state.inbox.searchText
});

const mapDispatchToProps = {
    updateMessages,
    getAsyncInboxData,
    readCurrentMessage,
    menuButtonClick,
    leftMenuButtonClick,
    navigateToDifferentPages,
    resetStore,
    readMessage,
    toggleQuickPayTransferModal,
    getAsyncQuickPayDetails,
    editClick,
    confirmDetails,
    doneGoBack,
    getInputData,
    asyncSendQuickPay,
    asyncConfirmQuickPay,
    updatePDFpages,
    toggleViewBillPdf,
    togglePdfScale,
    handlePDFUrl,
    toggleSearchChat,
    searchFilterActions
};


export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
