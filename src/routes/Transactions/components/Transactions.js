import React from "react";
import { IntlProvider,addLocaleData,defineMessages } from "react-intl";
import msLocaleData from "react-intl/locale-data/ms";
import * as css from "./Transactions.scss";
import RightSideBarContainer from "../../../components/RightSideBarContainer";
import LeftSideBarContainer from "../../../components/LeftSideBarContainer";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PaymentSummary from "../../../components/PaymentSummary";
import FavoriteSummary from "../../../components/FavoriteSummary";
import classnames from "classnames";
import RecipientContainer from "./RecipientContainer";
import PayFromToContainer from "./PayFromToContainer";
import PayModals from "../../../components/PayModals";
import ReloadModal from "../../../components/ReloadModal";
import TransferModals from "../../../components/TransferModals";
import Loader from "../../../components/LoaderNew";
import FavoriteModal from "./FavoriteModal";
import Notifications from "react-notification-system";
import Confirm from "../../../components/Confirm";
import SaveReceipt from "../../../components/SaveReceipt";
import OneTimePassword from "../../../components/OneTimePassword";
import PayNavigation from "./PayNavigation";
import JomPayTermModal from "../../../components/PayModals/JomPayTermModal";
import PdfViewer from "../../../components/PdfViewer";
import MultiTransactionSticky from "../../../components/MultiTransactionSticky";
addLocaleData(msLocaleData);
const defaultMessages = defineMessages({
    newFavoriteSuccessfullyAdded: {
        id: "app.transaction.newFavoriteSuccessfullyAdded",
        defaultMessage: "New Favorite Successfully Added"
    },
    newFavoriteSuccessfullyMessage: {
        id: "app.transaction.newFavoriteSuccessfullyMessage",
        defaultMessage: "My TNB has been added as one of your favorite payments"
    },
    favoriteSuccessfullyEdited: {
        id: "app.transaction.favoriteSuccessfullyEdited",
        defaultMessage: "Favorite Successfully Edited"
    },
    favoriteSuccessfullyRemoved: {
        id: "app.transaction.favoriteSuccessfullyRemoved",
        defaultMessage: "Favorite Successfully Removed"
    },
    emptyAmount:{
        id: "app.transactions.emptyAmount",
        defaultMessage:"Amount should not be empty"
    },
    nickNameError:{
        id: "app.transactions.nickNameError",
        defaultMessage:"Nick Name should not be empty"
    }
});
const style = {
    Containers: {
        DefaultStyle: {
            position: "fixed",
            padding:"0",
            width:"100%"
        }
    },
    NotificationItem:{
        DefaultStyle: {
            position: "fixed",
            bottom: 0
        },
        success: {
            borderTop: "none",
            backgroundColor: "#389A6E"
        },
        error: {
            borderTop: "none",
            backgroundColor: "#DA4747"
        }
    },
    Title: {
        DefaultStyle: {
            fontSize: "1.6rem",
            fontWeight: 500,
            color: "#fff"
        }
    },
    Dismiss: {
        DefaultStyle: {
            backgroundColor: "transparent",
            fontSize: "2.6rem",
            fontFamily: "Lato"
        }
    }
};
class Transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payNavigationMobileExpanded: false
        };
    }
    componentWillMount() {
        if (!this.props.params.tab){
            this.props.navigatePage();
        }
        this.props.getAsyncDashboardData();
        this.props.getAsyncPayDetails("pay");
        this.props.getAsyncPayeeList("pay");
    }
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }
    componentWillReceiveProps(props){
        if (Object.keys(props.notification).length && (!this.refs.notificationSystem.state.notifications.length || this.refs.notificationSystem.state.notifications.find(not=>not.uid !== props.notification.uid))){
            this.refs.notificationSystem.state.notifications.filter(not=>not.uid !== props.notification.uid).forEach((notification)=>{
                this._notificationSystem.removeNotification(notification);
            });
            this._notificationSystem.addNotification(props.notification);
        } else if (!props.errorName.length){
            this.refs.notificationSystem.state.notifications.forEach((notification)=>{
                this._notificationSystem.removeNotification(notification);
            });
        }
    }
    handleNavigation(page) {
        if (!page.same){
            this.props.navigateToDifferentPages(page);
            this.props.resetStore();
        }
    }
    toggleNavigationState() {
        this.setState({
            payNavigationMobileExpanded: !this.state.payNavigationMobileExpanded
        });
    }
    openTermsPdf() {
        this.props.handlePDFUrl(this.props.payDetailsData.termConditionURL);
    }
    render() {
        const {PaymentModal} = PayModals;
        const {TransferModal} = TransferModals;
        const { messages, locale } = this.props;
        const { pageContent, sideContent, m2uLite } = this.props.dashboardDetails;
        const sideBarDetails = sideContent || {};
        const containerClasses = classnames({
            [css.transactionContainer]: true,
            [css.mobileRTL]: this.props.showSideBar,
            [css.stillLoading]: !pageContent,
            row: true
        });
        const contentContainerClasses = classnames({
            [css.container]: true
        });
        const contentWrapper = classnames({
            [css.paddingLeft]: this.props.showLeftSideBar,
            [css.paddingRight]: this.props.showSideBar
        });
        const lastLogin = this.props.dashboardDetails.lastLogin || {};
        const data = this.props.payDetailsData || {};
        const {nextPage,previousPage,currentPageNo} = this.props.payDetailsData;
        const currentTab = this.props.params.tab;
        const recipientsMap = {
            "pay" : this.props.payDetailsData.favorites,
            "transfer" : this.props.payDetailsData.toAccounts,
            "reload" : this.props.payDetailsData.favorites
        };
        const recipients = recipientsMap[currentTab];
        const tacRequired = this.props.payDetailsData.tacRequest;
        return (
            <IntlProvider locale={locale} defaultLocale={'en-US'} messages={messages}>
               <div className={containerClasses} onClick={()=>this.props.toggleFavoritePopup()}>
                    { this.props.jompayTerms &&
                        <JomPayTermModal toggleJompayTerm={this.props.toggleJompayTerm}/>
                    }
                    { this.props.paymentModalOpen && currentTab === "transfer" &&
                        <TransferModal
                            getInputData={this.props.getInputData}
                            togglePaymentModal={this.props.togglePaymentModal}
                            toggleSwitch={this.props.toggleSwitch}
                            data={this.props.payDetailsData}
                            tempToSection = {this.props.tempToSection}
                            asyncSendQuickPay = {this.props.asyncSendTransfer}
                            asyncSendMultiplePay = {this.props.asyncSendMultiplePay}
                        />
                    }
                    { this.props.paymentModalOpen && currentTab === "pay" &&
                        <PaymentModal
                            errorName={this.props.errorName}
                            resetError={this.props.resetError}
                            getInputData={this.props.getInputData}
                            jompay = {this.props.payeeInfo.name.toUpperCase() === "JOMPAY"}
                            togglePaymentModal={this.props.togglePaymentModal}
                            toggleSwitch={this.props.toggleSwitch}
                            data={this.props.payDetailsData}
                            tempToSection = {this.props.tempToSection}
                            asyncSendQuickPay={this.props.asyncSendPay}
                            openPdf={()=>this.openTermsPdf()}
                            asyncSendMultiplePay = {this.props.asyncSendMultiplePay}
                            sendAsyncMultiTransaction = {this.props.sendAsyncMultiTransaction}
                            showMultipleSticky = {this.props.showMultipleSticky}
                        />
                    }
                    {  this.props.paymentModalOpen && currentTab === "reload" &&
                        <ReloadModal
                            getInputData={this.props.getInputData}
                            togglePaymentModal={this.props.togglePaymentModal}
                            toggleSwitch={this.props.toggleSwitch}
                            data={data}
                            tempToSection = {this.props.tempToSection}
                            asyncSendQuickPay={this.props.asyncSendPayReload}
                        />
                    }
                    { this.props.favoriteModalOpen &&
                        <FavoriteModal
                            paymentSummaryData={this.props.paymentSummaryData}
                            errorName={this.props.errorName}
                            resetError={this.props.resetError}
                            asyncToggleFavoriteModal = {this.props.asyncToggleFavoriteModal}
                            toggleFavoriteModal = {this.props.toggleFavoriteModal}
                            asyncToggleJompayModal = {this.props.asyncToggleJompayModal}
                            inputData={this.props.inputData}
                            getInputData={this.props.getInputData}
                            payDetailsData={this.props.payDetailsData}
                            favoriteInfo = {this.props.favoriteInfo}
                            jompay = {this.props.payeeInfo.name.toUpperCase() === "JOMPAY"}
                            payeeList = {this.props.payeeList}
                            showSummary = {this.props.showSummary}
                            currentTab = {currentTab}
                        />
                    }
                    <div className={contentContainerClasses}>
                        <div className={contentWrapper}>
                            <Header
                                currentPage={this.props.currentPage}
                                navigateToDifferentPages={(page)=>this.handleNavigation(page)}
                                menuButtonClick={this.props.menuButtonClick}
                                leftMenuButtonClick={this.props.leftMenuButtonClick}
                                lastLogin={lastLogin}
                                showSideBar={this.props.showSideBar}
                                toggleSearchModal={this.props.toggleSearchModal}
                            />
                            {
                                !this.props.showSummary &&
                                <PayNavigation
                                    payNavigationMobileExpanded={this.state.payNavigationMobileExpanded}
                                    toggleNavigationState={()=>this.toggleNavigationState()}
                                    navigatePage={this.props.navigatePage}
                                    currentTab={this.props.params.tab}
                                    resetStore={this.props.resetStore}
                                    getAsyncPayDetails={this.props.getAsyncPayDetails}
                                    getAsyncPayeeList={this.props.getAsyncPayeeList}
                                />
                            }
                            <div className={`${css.withSide} container-fluid ${css.summaryContainer}`}>
                                <Loader loaded={!!data.accounts}>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            {!this.props.showSummary && !this.props.showFavoriteSummary &&
                                                <div>
                                                    <PayFromToContainer data = {data}
                                                        payeeList = {this.props.payeeList}
                                                        userPayeeInput = {this.props.userPayeeInput}
                                                        updatePaymentList = {this.props.updatePaymentList}
                                                        updateAccountSelection = {this.props.updateAccountSelection}
                                                        fromAccount = {this.props.fromAccount}
                                                        updatePayeeSelection = {this.props.updatePayeeSelection}
                                                        payeeInfo = {this.props.payeeInfo}
                                                        asyncToggleJompayModal = {this.props.asyncToggleJompayModal}
                                                        togglePaymentModal={this.props.togglePaymentModal}
                                                        getAsyncPayDetails={this.props.getAsyncPayDetails}
                                                        selectedRecipientList = {this.props.selectedRecipientList}
                                                        currentTab={currentTab}
                                                    />
                                                <RecipientContainer
                                                    togglePaymentModal={this.props.togglePaymentModal}
                                                    toggleFavoritePopup={this.props.toggleFavoritePopup}
                                                    toggleFavoriteModal={this.props.toggleFavoriteModal}
                                                    favoritePopup={this.props.favoritePopup}
                                                    recipients={recipients}
                                                    pagination = {{"nextPage" : nextPage, "previousPage" : previousPage, "currentPageNo" : currentPageNo}}
                                                    updateFavoriteList = {this.props.updateFavoriteList}
                                                    currentTab = {currentTab}
                                                />
                                                </div>
                                            }
                                            {
                                                this.props.showSummary &&
                                                <PaymentSummary
                                                    data={this.props.paymentSummaryData}
                                                    confirm={this.props.confirm}
                                                    editClick={this.props.editClick}
                                                    toggleFavoriteModal={this.props.toggleFavoriteModal}
                                                />
                                            }
                                            {
                                                this.props.showMultipleSticky &&
                                                <div className={css.stickyConfirmation}>
                                                    <MultiTransactionSticky
                                                        sendAsyncMultiTransaction = {this.props.sendAsyncMultiTransaction}
                                                        selectedRecipientList = {this.props.selectedRecipientList}
                                                        currentTab = {currentTab}
                                                    />
                                                </div>
                                            }
                                            {
                                                this.props.showFavoriteSummary &&
                                                <FavoriteSummary
                                                    confirm={this.props.confirm}
                                                    data={this.props.paymentSummaryData}
                                                    editClick={this.props.editClick}
                                                    toggleFavoriteModal={this.props.toggleFavoriteModal}
                                                    toggleFavoriteSummary={this.props.toggleFavoriteSummary}
                                                />
                                            }
                                            {
                                                (this.props.showSummary || this.props.showFavoriteSummary) &&
                                                <div className={css.stickyConfirmation}>
                                                {
                                                    !this.props.confirm && !this.props.tacRequest &&
                                                    <Confirm
                                                        tacRequest = {tacRequired}
                                                        confirmDetails={this.props.confirmDetails}
                                                        quickPaySummary={this.props.tempToSection}
                                                        asyncConfirmQuickPay={this.props.asyncConfirmPayTransfer}
                                                    />
                                                }
                                                {
                                                    this.props.tacRequest && tacRequired &&
                                                    <OneTimePassword
                                                        tacRequest = {tacRequired}
                                                        updateUserDetails = {this.props.getInputData}
                                                        asyncCheckOTP={this.props.asyncCheckOTP}
                                                        mobileDisplay="016-355XXXX"
                                                    />
                                                }
                                                {
                                                    this.props.confirm &&
                                                    <SaveReceipt
                                                        quickPaySummary={this.props.tempToSection}
                                                        doneGoBack={this.props.doneGoBack}
                                                    />
                                                }
                                                </div>
                                            }
                                            <Footer hideBanner bannerDetails={this.props.dashboardDetails.bannerDetails}/>
                                        </div>
                                    </div>
                                </Loader>                        
                            </div>
                        </div>
                        {
                            this.props.showSideBar &&
                            <RightSideBarContainer currentPage={this.props.currentPage} navigateToDifferentPages={this.props.navigateToDifferentPages} m2uLite={m2uLite} sideBarDetails={sideBarDetails} asyncReadMessage={this.props.asyncReadMessage} show={this.props.showSideBar} onClose={this.props.menuButtonClick} getAsyncQuickPayDetails={()=>{}}/>
                        }
                        {
                            this.props.showLeftSideBar &&
                            <LeftSideBarContainer lastLogin={lastLogin} handleNavigation={(page)=>this.handleNavigation(page)} currentPage={this.props.currentPage} show={this.props.showLeftSideBar} onClose={this.props.leftMenuButtonClick}/>
                        }
                    </div>
                }
                {
                    this.props.receiptUrl &&
                    <PdfViewer
                        receiptUrl={this.props.receiptUrl}
                        downloadPdf={null}
                        scaleValue={this.props.pdfScale}
                        toggleScale={this.props.togglePdfScale}
                        handlePDFUrl={this.props.handlePDFUrl}
                        updatePDFpages={this.props.updatePDFpages}
                        pdfPages={this.props.pdfPages}
                    />
                }
                <Notifications style={style} ref="notificationSystem"/>
                </div>
            </IntlProvider>
        );
    }
}

export default Transactions;
