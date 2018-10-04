import React from "react";
import * as css from "./Dashboard.scss";
import { IntlProvider, defineMessages } from "react-intl";
import {addLocaleData} from "react-intl";
import msLocaleData from "react-intl/locale-data/ms";
import SideBar from "../../../components/SideBar";
import RightSideBarContainer from "../../../components/RightSideBarContainer";
import LeftSideBarContainer from "../../../components/LeftSideBarContainer";
import Navigation from "../../../components/Navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CardsContainer from "./CardsContainer";
import GoalsContainer from "./GoalsContainer";
import TotalSpendingContainer from "./TotalSpendingContainer";
import Loader from "../../../components/LoaderNew";
import classnames from "classnames";
import Card from "./Card";
import RewardCard from "./RewardCard";
import WealthCard from "./WealthCard";
import ActivateCardModal from "./ActivateCardModal";
import SetPinModal from "./SetPinModal";
import ImportantNoticeModal from "./ImportantNoticeModal";
import WebChatModal from "../../../components/WebChatModal";
import SearchModal from "../../../components/SearchModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import PayModals from "../../../components/PayModals";
import TransferModals from "../../../components/TransferModals";
import ReloadModal from "../../../components/ReloadModal";
import OneTimePassword from "../../../components/OneTimePassword";
import Notifications from "react-notification-system";
import PaymentSummary from "../../../components/PaymentSummary";
import Confirm from "../../../components/Confirm";
import SaveReceipt from "../../../components/SaveReceipt";
import WealthContainer from "./WealthContainer";
import Slider from "../../../components/Slider";
addLocaleData(msLocaleData);
const defaultMessages = defineMessages({
    dashboardGreeting: {
        id: "app.dashboard.rewards",
        defaultMessage: "REWARDS"
    },
    otherAccounts: {
        id: "app.dashboard.otherAccounts",
        defaultMessage: "OTHER ACCOUNTS",
    },
    cardActivationSuccessText:{
        id: "app.dashboard.cardActivationSuccessText",
        defaultMessage: "You have sucessfully activated your credit card",
    },
    cardActivationSuccessSecondary:{
        id: "app.dashboard.cardActivationSuccessSecondary",
        defaultMessage: "14 Jan 2016",
    },
    setPinSuccessText:{
        id: "app.dashboard.setPinSuccessText",
        defaultMessage: "You have sucessfully set PIN for Maybank World MasterCard",
    },
    setPinSuccessSecondary:{
        id: "app.dashboard.setPinSuccessSecondary",
        defaultMessage: "14 Jan 2016",
    },
    emptyAmount: {
        id: "app.dashboard.emptyAmount",
        defaultMessage: "Amount should not be empty"
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
class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            navigationMobileExpanded: false,
            goalsIndex: 0
        };
    }

    componentWillMount() {
        this.props.resetLoginStore();
        if (!this.props.params.tab){
            this.props.navigatePage();
        }
        this.props.getAsyncDashboardData();
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
    toggleNavigationState() {
        this.setState({
            navigationMobileExpanded: !this.state.navigationMobileExpanded
        });
    }

    toggleGoalsIndex(newIndex) {
        this.setState({
            goalsIndex: newIndex
        });
    }

    checkFooterBackground(){
        const { accountsInfo } = this.props.dashboardDetails;
        if (!accountsInfo){
            return false;
        }
        const currentTab = this.props.params.tab;
        const footerBackgroundMap = {
            casa: "otherAccountsSummary",
            cards: "rewardDetails",
            fixedDeposit: "accSummary",
            loans: "accountDetails"
        };
        return !!accountsInfo[footerBackgroundMap[currentTab]];
    }

    resetPopup() {
        if (Object.keys(this.props.popupMenu).length){
            this.props.togglePopupMenu();
        }
    }

    handleNavigation(page) {
        if (!page.same){
            this.props.navigateToDifferentPages(page);
            this.props.resetDashboard();
        }
    }

    setScrollPosition(scrollTop){
        if (scrollTop >= 147 !== this.state.fixHeader){
            this.setState({
                fixHeader: scrollTop >= 147
            });
        }
    }

    otpCheck(){
        this.props.asyncCheckOTPOnCardsActions({
            cardDetails:{cardDetails:this.props.cardActions.cardDetails}
        });
    }

    render() {
        const { cardActions } = this.props;
        const { personalMessage, accumulatedAmount, accountsInfo, quickPayOptions, pageContent, m2uLite } = this.props.dashboardDetails;
        const {accumulatedInfo} = accumulatedAmount || {};
        const accountsInformation = this.props.dashboardDetails.accountsInfo || {};
        const {dashboardType} = accountsInformation;
        const spendings = accountsInfo ? accountsInfo.cardsConsumption : {};
        const accountDetails = accountsInfo && this.props.params.tab ? accountsInfo.accSummary : [];
        let {retrievalReference} = accountsInfo && this.props.params.tab ? accountsInfo : {};
        if (!retrievalReference){
            retrievalReference = {};
        }
        const otherAccounts = accountsInfo && this.props.params.tab === "casa" ? accountsInfo.otherAccountsSummary : [];
        const defaultWealth = {
            zeroInvestments: [],
            wealthDetails: []
        };
        const {zeroInvestments, wealthDetails} = (accountsInfo && this.props.params.tab === "wealth") ? accountsInfo.wealth : defaultWealth;
        const containerClasses = classnames({
            [css.dashboardContainer]: true,
            [css.mobileRTL]: this.props.showSideBar,
            [css.stillLoading]: !pageContent,
            row: true
        });
        const rewardDetails = accountsInfo ? accountsInfo.rewards : [];
        const goalsDetails = accountsInfo  && this.props.params.tab ? accountsInfo.goals : [];
        const cardsContainerProps = {
            incrementCardsShown: this.props.incrementCardsShown,
            togglePopupMenu : this.props.togglePopupMenu,
            popupMenu : this.props.popupMenu,
            path: this.props.params.tab,
            modifyCardActions: this.props.modifyCardActions
        };
        const lastLogin = this.props.dashboardDetails.lastLogin || {};
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
        const {PaymentModal} = PayModals;
        const {TransferModal} = TransferModals;
        return (
            <IntlProvider locale={this.props.locale} defaultLocale={'en-US'} messages={this.props.messages}>
                <div className={containerClasses} onClick={()=>this.resetPopup()} onScroll={(ev)=>this.setScrollPosition(ev.target.scrollTop)}>
                    <div className={css.container}>
                        <Loader loaded={!!this.props.dashboardDetails.accumulatedAmount}>
                            <div className={topSectionClasses}>
                                <Header
                                    menuButtonClick={this.props.menuButtonClick}
                                    leftMenuButtonClick={this.props.leftMenuButtonClick}
                                    lastLogin={lastLogin}
                                    currentPage={this.props.currentPage}
                                    navigateToDifferentPages={(page)=>this.handleNavigation(page)}
                                    userProfile={this.props.userProfile}
                                />
                                { !this.props.quickPaySummary &&
                                <div className={css.navigation}>
                                    <Navigation
                                        dashboardTypes = {this.props.userProfile.dashboardType}
                                        navigatePage={this.props.navigatePage}
                                        accumulatedAmount={accumulatedInfo || {}}
                                        imTeen={this.props.dashboardDetails.imTeen}
                                        currentTab={this.props.params.tab}
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
                            { !this.props.quickPaySummary &&
                                <div>
                                    {
                                        this.props.params.tab !== "wealth" &&
                                        <div>
                                            <CardsContainer
                                                goToAccountDetails={this.props.goToAccountDetails}
                                                Card={Card}
                                                cardType={"Card"}
                                                cardDetails={accountDetails}
                                                {...cardsContainerProps}
                                                setCurrentAccount={this.props.setCurrentAccount}
                                                retrievalReference={retrievalReference}
                                                retrievalStartIndex={this.props.retrievalStartIndex}
                                                getAsyncMoreBalanceCards={this.props.getAsyncMoreBalanceCards}
                                                dashboardType={dashboardType}
                                            />
                                        </div>
                                    }
                                    {
                                        this.props.params.tab === "casa" && dashboardType === "casa"  && !m2uLite &&
                                        <div className="container-fluid">
                                            <GoalsContainer
                                                goalsDetails={goalsDetails}
                                                goalsIndex={this.state.goalsIndex}
                                                goalsStartIndex={this.props.goalsStartIndex}
                                                handleNextIndex={this.props.handleNextIndex}
                                                onClick={(newIndex)=>this.toggleGoalsIndex(newIndex)}
                                                getAsyncMoreBalanceCards={this.props.getAsyncMoreBalanceCards}
                                            />
                                            { !this.props.dashboardDetails.imTeen &&
                                            <div className="row">
                                                <CardsContainer
                                                    goToAccountDetails={this.props.goToAccountDetails}
                                                    Card={Card}
                                                    cardType={"otherAccounts"}
                                                    cardDetails={otherAccounts}
                                                    {...cardsContainerProps}
                                                    title={defaultMessages.otherAccounts}
                                                    setCurrentAccount={this.props.setCurrentAccount}
                                                    retrievalReference={retrievalReference}
                                                    retrievalStartIndex={this.props.retrievalStartIndex}
                                                    getAsyncMoreBalanceCards={this.props.getAsyncMoreBalanceCards}
                                                    dashboardType={dashboardType}
                                                />
                                            </div>
                                            }
                                        </div>
                                    }
                                    {
                                        this.props.params.tab === "cards" &&
                                        <div>
                                            <TotalSpendingContainer
                                                updateTotalSpendingInfo={this.props.updateTotalSpendingInfo}
                                                spendings={spendings}
                                                totalSpendingInfo={this.props.totalSpendingInfo}
                                            />
                                            <CardsContainer
                                                goToAccountDetails={this.props.goToAccountDetails}
                                                Card={RewardCard}
                                                cardType={"RewardCard"}
                                                cardDetails={rewardDetails}
                                                accSummary={accountsInfo}
                                                {...cardsContainerProps}
                                                title={defaultMessages.dashboardGreeting}
                                                setCurrentAccount={this.props.setCurrentAccount}
                                                retrievalReference={retrievalReference}
                                                retrievalStartIndex={this.props.retrievalStartIndex}
                                                getAsyncMoreBalanceCards={this.props.getAsyncMoreBalanceCards}
                                                dashboardType={dashboardType}
                                             />
                                        </div>
                                    }
                                    {
                                        this.props.params.tab === "wealth" &&
                                        <div>
                                            { !wealthDetails &&
                                            <div>
                                                <Slider/>
                                                <CardsContainer
                                                    goToAccountDetails={()=>{}}
                                                    Card={WealthCard}
                                                    cardType={"WealthCard"}
                                                    cardDetails={zeroInvestments}
                                                    {...cardsContainerProps}
                                                    setCurrentAccount={this.props.setCurrentAccount}
                                                    retrievalReference={retrievalReference}
                                                    retrievalStartIndex={this.props.retrievalStartIndex}
                                                    dashboardType={dashboardType}
                                                />
                                            </div>
                                            ||
                                            <WealthContainer
                                                wealthDetails={wealthDetails}
                                                goToWealthDetails={this.props.goToWealthDetails}
                                                path={this.props.params.tab}
                                            />
                                            }
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
                                    <Footer
                                        whiteBackground={this.checkFooterBackground()}
                                        accumulatedAmount={this.props.dashboardDetails.accumulatedAmount}
                                    />
                                </div>
                                ||
                                <div>
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
                                readMessage={this.props.readMessage}
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
                                    readMessage={this.props.readMessage}
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
                                <LeftSideBarContainer lastLogin={lastLogin} leftMenuButtonClick={this.props.leftMenuButtonClick} toggleSearchModal={this.props.toggleSearchChat.bind(this,"showSearchModal")} handleNavigation={(page)=>this.handleNavigation(page)} currentPage={this.props.currentPage} show={this.props.showLeftSideBar} onClose={this.props.leftMenuButtonClick}/>
                            }
                        </Loader>
                    </div>
                    {
                        cardActions.activateCard &&
                        <ActivateCardModal asyncCheckCardsActions={this.props.asyncCheckCardsActions} updateInputCardDetails={this.props.updateInputCardDetails} toggleActivateModal={this.props.modifyCardActions} data={cardActions.cardDetails}/>
                    }
                    { this.props.showQuickPay && this.props.quickPayDetails.quickOption === "pay" &&
                        <PaymentModal
                            errorName={this.props.errorName}
                            resetError={this.props.resetError}
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
                    {
                        cardActions.setPin &&
                        <SetPinModal asyncCheckCardsActions={this.props.asyncCheckCardsActions} updateInputCardDetails={this.props.updateInputCardDetails} toggleSetpinModal={this.props.modifyCardActions} data={cardActions.cardDetails}/>
                    }
                    {
                        cardActions.activationConfirmation &&
                        <ConfirmationModal
                            headerText={{id: "app.dashboard.activationConfirmation"}}
                            bodyText ={{id: "app.dashboard.activatetionText"}}
                            okBtnText={{id: "app.dashboard.activationOkBtnText"}}
                            cancelBtnText={{id: "app.dashboard.activationCancelBtnText"}}
                            cancelAction={this.props.modifyCardActions.bind(this,null)}
                            okAction={this.props.modifyCardActions.bind(this,{setPin:true,cardDetails:cardActions.cardDetails})}
                        />
                    }
                    {   cardActions.activateCard && cardActions.showOneTime &&
                        <OneTimePassword tacRequest asyncCheckOTP={this.props.asyncCheckOTPOnCardsActions.bind(this,{
                            cardDetails:{activationConfirmation:true,cardDetails:cardActions.cardDetails}
                            })}/>
                    }
                    {   cardActions.setPin && cardActions.showOneTime &&
                        <OneTimePassword tacRequest asyncCheckOTP={()=>this.otpCheck()}/>
                    }
                    <Notifications style={style} ref="notificationSystem"/>
                </div>
            </IntlProvider>

        );
    }
}

export default Dashboard;
