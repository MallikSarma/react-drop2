import React from "react";
import * as css from "./details.scss";
import msLocaleData from "react-intl/locale-data/ms";
import SideBar from "../../../components/SideBar";
import RightSideBarContainer from "../../../components/RightSideBarContainer";
import LeftSideBarContainer from "../../../components/LeftSideBarContainer";
import Navigation from "../../../components/Navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SavingAccountContainer from "./SavingAccountContainer";
import FixedDepositsContainer from "./FixedDepositsContainer";
import CardsAccountDetailsContainer from "./CardsAccountDetailsContainer";
import RewardDetailsContainer from "./RewardDetailsContainer";
import LoanDetailsContainer from "./LoanDetailsContainer";
import Loader from "../../../components/LoaderNew";
import classnames from "classnames";
import PdfViewer from "../../../components/PdfViewer";
import PlacementModal from "./PlacementModal";
import RedrawModal from "./RedrawModal";
import RequestHardCopyModal from "./RequestHardCopyModal";
import FdManagePopup from "./FdManagePopup";
import FdUpliftmentModal from "./FdUpliftmentModal";
import AccountTransactionSummary from "./AccountTransactionSummary";
import Notifications from "react-notification-system";
import WebChatModal from "../../../components/WebChatModal";
import SearchModal from "../../../components/SearchModal";
import OneTimePassword from "../../../components/OneTimePassword";
import Confirm from "../../../components/Confirm";
import SaveReceipt from "../../../components/SaveReceipt";
import TACRequest from "../../Login/components/RequestOTP";
import PayModals from "../../../components/PayModals";
import TransferModals from "../../../components/TransferModals";
import ReloadModal from "../../../components/ReloadModal";
import PaymentSummary from "../../../components/PaymentSummary";

import { IntlProvider, defineMessages, addLocaleData } from "react-intl";
addLocaleData(msLocaleData);
const defaultMessages = defineMessages({
    yourRequestHasBeen: {
        id: "app.details.yourRequestHasBeen",
        defaultMessage: "Your request has been processed."
    }
});

class Details extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            navigationMobileExpanded: false
        };
    }

    componentWillMount() {
        if (this.props.params.detailType === "reward"){    
            this.props.getAsyncRewardDetails();
        } else {
            this.props.getAsyncAccTransaction();
        }
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

    componentWillUnmount() {
        this.props.resetAccountDetails();
    }
    checkFooterBackground(){
        return (this.props.accountDetails && (this.props.accountDetails.cardType === "creditCard")) || (this.props.params.detailType === "reward");
    }

    toggleNavigationState() {
        this.setState({
            navigationMobileExpanded: !this.state.navigationMobileExpanded
        });
    }

    setScrollPosition(scrollTop){
        if (scrollTop >= 147 !== this.state.fixHeader){
            this.setState({
                fixHeader: scrollTop >= 147
            });
        }
    }

    handleNavigation(page) {
        if (!page.same){
            this.props.navigateToDifferentPages(page);
            this.props.resetAccountDetails();
        }
    }
    render() {
        const { personalMessage, accumulatedAmount, accountsInfo, quickPayOptions, m2uLite } = this.props.dashboardDetails;
        const {accumulatedInfo} = accumulatedAmount || {};
        const accountsInformation = this.props.dashboardDetails.accountsInfo || {};
        //const loaded = !!(this.props.accountDetails && this.props.dashboardDetails);
        const loaded = !!(this.props.dashboardDetails);
        const containerClasses = classnames({
            [css.accountContainer]: true,
            [css.mobileRTL]: this.props.showSideBar,
            [css.stillLoading]: !loaded,
            row: true
        });
        const lastLogin = this.props.dashboardDetails.lastLogin || {};
        let tab = "";
        if (this.props.accountDetails) {
            tab = this.props.accountDetails.tab;
        }
        const topSectionClasses = classnames({
            [css.paddingLeft]: this.props.showLeftSideBar,
            [css.paddingRight]: this.props.showSideBar,
            [css.topSection]: true,
            [css.topFixed]: this.state.fixHeader
        });
        const contentContainerClasses = classnames({
            [css.contentContainer]: true,
            [css.paddingLeft]: this.props.showLeftSideBar,
            [css.paddingRight]: this.props.showSideBar,
        });
        const {makePlacementModal, requestTac, uplift, manage} = this.props.certificateSummary || {};
        const {redrawModal} = this.props.redrawSummary || {};
        const detailsType = this.props.accountDetails ? this.props.accountDetails.detailsType : "";
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
                    bottom: 0,
                    right:0
                },
                success: {
                    padding: "2.4rem",
                    backgroundColor: "#389A6E"
                },
                error: {
                    padding: "2.4rem",
                    borderTop: "none",
                    backgroundColor: "#DA4747"
                }
            },
            Title: {
                DefaultStyle: {
                    fontSize: "1.6rem",
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
        const {PaymentModal} = PayModals;
        const {TransferModal} = TransferModals;
        return (
            <IntlProvider locale={this.props.locale} defaultLocale={'en-US'} messages={this.props.messages}>
                <div className={containerClasses} onClick={()=>{this.props.togglePopupMenu(true); this.props.upliftManageFD();}} onScroll={(ev)=>this.setScrollPosition(ev.target.scrollTop)}>
                    <div className={`${css.container}`}>
                        <Loader loaded={loaded}>
                            <div className={topSectionClasses}>
                                <Header
                                    menuButtonClick={this.props.menuButtonClick}
                                    leftMenuButtonClick={this.props.leftMenuButtonClick}
                                    lastLogin={lastLogin}
                                    currentPage={this.props.currentPage}
                                    navigateToDifferentPages={(page)=>this.handleNavigation(page)}
                                    userProfile={this.props.userProfile}
                                />
                                {(!this.props.certificateSummary || !this.props.redrawSummary) && (!this.props.quickPaySummary) &&
                                    <div className={css.navigation}>
                                        <Navigation
                                            details
                                            dashboardTypes = {this.props.userProfile.dashboardType}
                                            navigatePage={this.props.navigatePage}
                                            accumulatedAmount={accumulatedInfo || {}}
                                            imTeen={this.props.dashboardDetails.imTeen}
                                            currentTab={accountsInfo.dashboardType}
                                            navigationMobileExpanded={this.state.navigationMobileExpanded}
                                            toggleNavigationState={()=>this.toggleNavigationState()}
                                            incrementCardsShown={this.props.incrementCardsShown}
                                            togglePopupMenu={this.props.togglePopupMenu}
                                            handleNextIndex={this.props.handleNextIndex}
                                        />
                                    </div>
                                }
                            </div>
                            <div className={contentContainerClasses}>
                                {
                                    !this.props.quickPaySummary &&
                                    <div className="container-fluid">
                                    {
                                        accountsInfo.dashboardType === "casa" &&
                                        <SavingAccountContainer
                                            currentAccount={this.props.currentAccount}
                                            accountTransactions={this.props.accountTransactions}
                                            handlePDFUrl={this.props.handlePDFUrl}
                                            asyncRefreshTablePeriod={this.props.asyncRefreshTablePeriod}
                                            tableData={this.props.tableData}
                                            accountDetails={this.props.accountDetails}
                                            toggleRequestHardCopyPopup = {this.props.toggleRequestHardCopyPopup}
                                            asyncCheckRequestHardCopy = {this.props.asyncCheckRequestHardCopy}
                                            toggleViewStatementPdf={this.props.toggleViewStatementPdf}
                                            viewStatementPdf={this.props.viewStatementPdf}
                                            togglePopupMenu={this.props.togglePopupMenu}
                                            popupOpen={this.props.popupOpen}
                                            detailType = {this.props.params.detailType}
                                            accountsInfo={this.props.dashboardDetails || {}}
                                            getAsyncAccTransaction={this.props.getAsyncAccTransaction}
                                            getAsyncMoreAccTransactions={this.props.getAsyncMoreAccTransactions}
                                            requestArray={this.props.requestArray}
                                        />
                                    }
                                    {
                                        accountsInfo.dashboardType === "fixedDeposit" &&
                                        <div>
                                            {!this.props.certificateSummary &&
                                            <FixedDepositsContainer
                                                accountTransactions={this.props.accountTransactions}
                                                currentAccount={this.props.currentAccount}
                                                manageFD={this.props.manageFD}
                                                makePlacmentFD={this.props.makePlacmentFD}
                                                upliftManageFD={this.props.upliftManageFD}
                                                tableData={this.props.tableData}
                                                getTableData={this.props.getTableData}
                                                updateTableRecords={this.props.updateTableRecords}
                                                togglePlacementFD = {this.props.togglePlacementFD}
                                                togglePopupMenu={this.props.togglePopupMenu}
                                                popupOpen={this.props.popupOpen}
                                                detailType = {this.props.params.detailType}
                                                requestArray={this.props.requestArray}
                                                getAsyncMoreAccTransactions={this.props.getAsyncMoreAccTransactions}
                                            />
                                                ||
                                                <AccountTransactionSummary
                                                    certificateSummary={this.props.certificateSummary}
                                                    redrawSummary={this.props.redrawSummary}
                                                    confirm={this.props.confirm}
                                                    tacRequest={this.props.tacRequest}
                                                    editClick={this.props.editClick}
                                                />
                                            }
                                        </div>
                                    }
                                    {
                                        accountsInfo.dashboardType === "cards" && this.props.params.detailType !== "reward" &&
                                        <CardsAccountDetailsContainer
                                            handlePDFUrl={this.props.handlePDFUrl}
                                            getAsyncCardPaymentInfo={this.props.getAsyncCardPaymentInfo}
                                            detailType = {this.props.params.detailType}
                                            updateTableRecords={this.props.updateTableRecords}
                                            asyncRefreshTablePeriod={this.props.asyncRefreshTablePeriod}
                                            tableData={this.props.tableData}
                                            getTableData={this.props.getTableData}
                                            accountDetails={this.props.accountDetails}
                                            togglePopupMenu={this.props.togglePopupMenu}
                                            popupOpen={this.props.popupOpen}
                                            toggleViewStatementPdf={this.props.toggleViewStatementPdf}
                                            viewStatementPdf={this.props.viewStatementPdf}
                                            getAsyncAccTransaction={this.props.getAsyncAccTransaction}
                                            currentAccount={this.props.currentAccount}
                                            accountTransactions={this.props.accountTransactions}
                                            accountsInfo={this.props.dashboardDetails || {}}
                                            getAsyncMoreAccTransactions={this.props.getAsyncMoreAccTransactions}
                                            requestArray={this.props.requestArray}
                                        />
                                    }
                                    {
                                        this.props.params.detailType === "reward" &&
                                        <RewardDetailsContainer
                                            currentAccount={this.props.currentAccount}
                                            updateReward={this.props.updateReward}
                                            refreshRewards={this.props.refreshRewards}
                                            rewards={this.props.rewards}
                                            getAsyncRewardDetails={this.props.getAsyncRewardDetails}
                                        />
                                    }
                                    {
                                        accountsInfo.dashboardType === "loans" &&
                                        <div>
                                            {!this.props.redrawSummary &&
                                            <LoanDetailsContainer
                                                handlePDFUrl={this.props.handlePDFUrl}
                                                updateTableRecords={this.props.updateTableRecords}
                                                asyncRefreshTablePeriod={this.props.asyncRefreshTablePeriod}
                                                tableData={this.props.tableData}
                                                getTableData={this.props.getTableData}
                                                accountDetails={this.props.accountDetails}
                                                toggleRedrawLoan={this.props.toggleRedrawLoan}
                                                getAsyncLoanTransfer={this.props.getAsyncLoanTransfer}
                                                togglePopupMenu={this.props.togglePopupMenu}
                                                popupOpen={this.props.popupOpen}
                                                toggleViewStatementPdf={this.props.toggleViewStatementPdf}
                                                viewStatementPdf={this.props.viewStatementPdf}
                                                detailType = {this.props.params.detailType}
                                                currentAccount={this.props.currentAccount}
                                                accountTransactions={this.props.accountTransactions}
                                                getAsyncAccTransaction={this.props.getAsyncAccTransaction}
                                                accountsInfo={this.props.dashboardDetails || {}}
                                                getAsyncMoreAccTransactions={this.props.getAsyncMoreAccTransactions}
                                                requestArray={this.props.requestArray}
                                            />
                                            ||
                                            <AccountTransactionSummary
                                                redrawSummary={this.props.redrawSummary}
                                                certificateSummary={this.props.certificateSummary}
                                                confirm={this.props.confirm}
                                                tacRequest={this.props.tacRequest}
                                                editClick={this.props.editClick}
                                            />
                                            }
                                        </div>

                                    }
                                    { this.props.showSearchModal && !this.props.webchat &&
                                    <SearchModal
                                        searchFilterActions={this.props.searchFilterActions}
                                        toggleSearchChat={this.props.toggleSearchChat}
                                        searchText={this.props.searchText}
                                    />
                                    }
                                    {
                                        this.props.webchat &&
                                        <WebChatModal toggleSearchChat={this.props.toggleSearchChat}/>
                                    }
                                    {!this.props.certificateSummary &&
                                        <div className="row">
                                            <Footer
                                                whiteBackground={this.checkFooterBackground()}
                                                accumulatedAmount={this.props.dashboardDetails.accumulatedAmount}
                                            />
                                        </div>
                                    }
                                    </div>
                                    ||
                                    <div className={css.summarySection}>
                                        <PaymentSummary
                                            data={this.props.quickPaySummary}
                                            confirm={this.props.confirm}
                                            editClick={this.props.editClick}
                                            toggleFavoriteModal={()=>{}}
                                        />
                                        <div>
                                            {!this.props.confirm &&
                                            <Confirm
                                                confirmDetails={this.props.confirmDetails}
                                                quickPaySummary={this.props.quickPaySummary}
                                                asyncConfirmQuickPay={this.props.asyncConfirmQuickPay}
                                            />
                                            ||
                                            <SaveReceipt
                                                quickPaySummary={this.props.quickPaySummary}
                                                doneGoBack={this.props.doneGoBack}
                                            />
                                            }
                                        </div>
                                    </div>
                                    }
                            </div>
                            <SideBar
                                navigateToDifferentPages={this.props.navigateToDifferentPages}
                                m2uLite={m2uLite}
                                readMessage={this.props.readMessage.bind(this, personalMessage.messages.length)}
                                toggleSearchModal = {this.props.toggleSearchChat.bind(this,"showSearchModal")}
                                togglePaymentModal={this.props.togglePaymentModal}
                                getAsyncQuickPayDetails={this.props.getAsyncQuickPayDetails}
                                currentIndex={this.props.currentIndex}
                                quickPaySummary={this.props.quickPaySummary}
                                wealthDetails={this.props.wealthDetails}
                                userProfile={this.props.userProfile}
                                personalMessage={personalMessage}
                                quickPayOptions={quickPayOptions}
                            />
                                {
                                this.props.showSideBar &&
                                <RightSideBarContainer
                                    toggleSearchModal = {this.props.toggleSearchChat.bind(this,"showSearchModal")}
                                    navigateToDifferentPages={this.props.navigateToDifferentPages}
                                    m2uLite={m2uLite}
                                    currentIndex={this.props.currentIndex}
                                    readMessage={this.props.readMessage.bind(this, personalMessage.messages.length)}
                                    show={this.props.showSideBar}
                                    onClose={this.props.menuButtonClick}
                                    getAsyncQuickPayDetails={this.props.getAsyncQuickPayDetails}
                                    quickPaySummary={this.props.quickPaySummary}
                                    userProfile={this.props.userProfile}
                                    personalMessage={personalMessage}
                                    quickPayOptions={quickPayOptions}
                                />
                            }
                            {
                                this.props.showLeftSideBar &&
                                <LeftSideBarContainer leftMenuButtonClick={this.props.leftMenuButtonClick} toggleSearchModal={this.props.toggleSearchChat.bind(this,"showSearchModal")} handleNavigation={(page)=>this.handleNavigation(page)} currentPage={this.props.currentPage} show={this.props.showLeftSideBar} onClose={this.props.leftMenuButtonClick}/>
                            }
                        </Loader>
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
                                viewStatementPdf={this.props.viewStatementPdf || {}}
                                accountDetails={this.props.accountDetails}
                                toggleViewStatementPdf={this.props.toggleViewStatementPdf}
                                accountTransactions={this.props.accountTransactions}
                            />
                        }
                        {
                            this.props.showMakePlacement && !this.props.certificateSummary &&
                            <PlacementModal
                                accountTransactions={this.props.accountTransactions}
                                togglePlacementFD={this.props.togglePlacementFD}
                                updatePlacementData={this.props.updatePlacementData}
                                placementData={this.props.placementData}
                                asyncCheckMakePlacement={this.props.asyncCheckMakePlacement}
                                upliftManageFD={this.props.upliftManageFD}
                                certificateSummary={this.props.certificateSummary}

                            />
                        }
                        {
                            this.props.showRedraw && !this.props.redrawSummary &&
                            <RedrawModal
                                handlePDFUrl={this.props.handlePDFUrl}
                                accountDetails={this.props.accountDetails}
                                redrawData={this.props.redrawData}
                                updateRedrawData={this.props.updateRedrawData}
                                toggleRedrawLoan={this.props.toggleRedrawLoan}
                                asyncCheckRedraw={this.props.asyncCheckRedraw}
                            />
                        }
                        {   this.props.showMakeRequestHardCopy &&
                            <RequestHardCopyModal
                                handleUpdate={this.props.handleUpdate}
                                setRequestHardCopyData={this.props.setRequestHardCopyData}
                                requestHardCopy={this.props.requestHardCopy}
                                toggleRequestHardCopyPopup = {this.props.toggleRequestHardCopyPopup}
                                accountTransactions={this.props.accountTransactions}
                                asyncCheckRequestHardCopy={this.props.asyncCheckRequestHardCopy}
                            />
                        }
                        { this.props.showQuickPay && this.props.quickPayDetails.quickOption === "pay" &&
                            <PaymentModal
                                getInputData={this.props.getInputData}
                                togglePaymentModal={this.props.toggleQuickPayTransferModal}
                                toggleSwitch={this.props.toggleSwitch}
                                data={this.props.quickPayDetails}
                                tempToSection = {this.props.tempToSection}
                                isQuick
                                asyncSendQuickPay={this.props.asyncSendQuickPay}
                            />
                        }
                        { this.props.showQuickPay && this.props.quickPayDetails.quickOption === "reload" &&
                            <ReloadModal
                                getInputData={this.props.getInputData}
                                togglePaymentModal={this.props.toggleQuickPayTransferModal}
                                toggleSwitch={this.props.toggleSwitch}
                                data={this.props.quickPayDetails}
                                tempToSection = {this.props.tempToSection}
                                isQuick
                                asyncSendQuickPay={this.props.asyncSendQuickPay}
                            />
                        }
                        { this.props.showQuickPay && this.props.quickPayDetails.quickOption === "transfer" &&
                            <TransferModal
                                getInputData={this.props.getInputData}
                                togglePaymentModal={this.props.toggleQuickPayTransferModal}
                                toggleSwitch={this.props.toggleSwitch}
                                data={this.props.quickPayDetails}
                                tempToSection = {this.props.tempToSection}
                                isQuick
                                asyncSendQuickPay = {this.props.asyncSendQuickPay}
                            />
                        }
                        {   this.props.upliftManageFDdata.state === "uplift" && !this.props.certificateSummary &&
                            <FdUpliftmentModal
                                upliftManageFD={this.props.upliftManageFD}
                                setUpliftManageData={this.props.setUpliftManageData}
                                accountTransactions={this.props.accountTransactions}
                                upliftManageFDdata={this.props.upliftManageFDdata}
                                asyncCheckUpliftManage={this.props.asyncCheckUpliftManage}

                            />
                        }
                        {   this.props.upliftManageFDdata.state === "manage" && !this.props.certificateSummary &&
                            <FdManagePopup
                                upliftManageFD={this.props.upliftManageFD}
                                setUpliftManageData={this.props.setUpliftManageData}
                                accountDetails={this.props.accountDetails}
                                upliftManageFDdata={this.props.upliftManageFDdata}
                                asyncCheckUpliftManage={this.props.asyncCheckUpliftManage}

                            />
                        }
                        { (makePlacementModal || redrawModal) && !this.props.confirm &&
                            <Confirm
                                confirmDetails={this.props.confirmDetails}
                                asyncConfirmRedraw={this.props.asyncConfirmRedraw}
                                certificateSummary={this.props.certificateSummary}
                                redrawSummary={this.props.redrawSummary}
                                asyncConfirmMakePlacement={this.props.asyncConfirmMakePlacement}
                            />
                        }
                        { this.props.confirm &&
                            <SaveReceipt
                                doneGoBack={this.props.doneGoBack}
                                certificateSummary={this.props.certificateSummary}
                                redrawSummary={this.props.redrawSummary}
                            />
                        }
                        {   requestTac && !this.props.tacRequest && !makePlacementModal &&
                            <TACRequest TACRequest onClick={this.props.asyncRequestTAC}/>
                        }
                        { this.props.tacRequest && this.props.certificateSummary  && !this.props.confirm &&
                            <OneTimePassword
                                tacRequest
                                asyncCheckOTP={this.props.asyncCheckOTP}
                                asyncConfirmUpliftManage={this.props.asyncConfirmUpliftManage}
                                certificateSummary={this.props.certificateSummary}
                                mobileDisplay="016-355XXXX"
                            />
                        }
                    </div>
                    <Notifications style={style} ref="notificationSystem" />
                </div>
            </IntlProvider>

        );
    }
}

export default Details;