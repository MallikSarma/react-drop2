import React from "react";
import * as css from "./inbox.scss";
import { IntlProvider } from "react-intl";
import {addLocaleData} from "react-intl";
import msLocaleData from "react-intl/locale-data/ms";
import SideBar from "../../../components/SideBar";
import RightSideBarContainer from "../../../components/RightSideBarContainer";
import LeftSideBarContainer from "../../../components/LeftSideBarContainer";
import Header from "../../../components/Header";
import Loader from "../../../components/LoaderNew";
import classnames from "classnames";
import MessagesContainer from "./MessagesContainer";
import PayModals from "../../../components/PayModals";
import TransferModals from "../../../components/TransferModals";
import ReloadModal from "../../../components/ReloadModal";
import PaymentSummary from "../../../components/PaymentSummary";
import Confirm from "../../../components/Confirm";
import SaveReceipt from "../../../components/SaveReceipt";
import PdfViewer from "../../../components/PdfViewer";
import WebChatModal from "../../../components/WebChatModal";
import SearchModal from "../../../components/SearchModal";
addLocaleData(msLocaleData);
class Inbox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navigationMobileExpanded: false
        };
    }
    componentWillMount() {
        this.props.getAsyncInboxData();
    }
    componentWillUnmount() {
        this.props.resetStore();
    }
    handleNavigation(page) {
        if (!page.same){
            this.props.navigateToDifferentPages(page);
            this.props.resetStore();
        }
    }
    render() {
        const { sideContent, m2uLite } = this.props.dashboardDetails;
        const lastLogin = {};
        const containerClasses = classnames({
            [css.inboxContainer]: true,
            [css.mobileRTL]: this.props.showSideBar,
            row: true
        });
        const sideBarDetails = sideContent || {};
        const {PaymentModal} = PayModals;
        const {TransferModal} = TransferModals;
        const { personalMessage, quickPayOptions } = this.props.dashboardDetails;
        return (
            <IntlProvider locale={this.props.locale} defaultLocale={'en-US'} messages={this.props.messages}>
                <div className={containerClasses}>
                    {
                        this.props.showSideBar &&
                        <RightSideBarContainer
                            personalMessage={personalMessage}
                            quickPayOptions={quickPayOptions}
                            userProfile={this.props.userProfile}
                            toggleSearchModal = {this.props.toggleSearchChat.bind(this,"showSearchModal")}
                            sidebarPosition="relative"
                            navigateToDifferentPages={this.props.navigateToDifferentPages}
                            currentIndex={this.props.currentIndex}
                            m2uLite={m2uLite}
                            sideBarDetails={sideBarDetails}
                            readMessage={this.props.readMessage}
                            show={this.props.showSideBar}
                            onClose={this.props.menuButtonClick}
                            getAsyncQuickPayDetails={this.props.getAsyncQuickPayDetails}
                            quickPaySummary={this.props.quickPaySummary}
                        />
                    }
                    {
                        this.props.showLeftSideBar &&
                        <LeftSideBarContainer sidebarPosition="relative" toggleSearchModal={this.props.toggleSearchChat.bind(this,"showSearchModal")}  handleNavigation={(page)=>this.handleNavigation(page)} show={this.props.showLeftSideBar} onClose={this.props.leftMenuButtonClick}/>
                    }
                    <div className={`${css.container}`}>
                        <Header
                            userProfile={this.props.userProfile}
                            menuButtonClick={this.props.menuButtonClick}
                            leftMenuButtonClick={this.props.leftMenuButtonClick}
                            lastLogin={lastLogin}
                            navigateToDifferentPages={this.props.navigateToDifferentPages}
                            currentPage="accounts"
                        />
                        <Loader loaded={!!this.props.inboxData}>
                            <div className="container-fluid">
                            {
                                !this.props.quickPaySummary &&
                                <MessagesContainer
                                    inboxData = {this.props.inboxData}
                                    readCurrentMessage = {this.props.readCurrentMessage}
                                    currentInboxId = {this.props.currentInboxId}
                                    toggleViewBillPdf={this.props.toggleViewBillPdf}
                                />
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
                        </Loader>
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
                            this.props.receiptUrl &&
                            <PdfViewer
                                receiptUrl={this.props.receiptUrl}
                                downloadPdf={null}
                                scaleValue={this.props.pdfScale}
                                toggleScale={this.props.togglePdfScale}
                                handlePDFUrl={this.props.handlePDFUrl}
                                updatePDFpages={this.props.updatePDFpages}
                                pdfPages={this.props.pdfPages}
                                viewStatementPdf={this.props.viewStatementPdf}
                                accountDetails={this.props.accountDetails}
                                toggleViewBillPdf={this.props.toggleViewBillPdf}
                            />
                        }
                    </div>
                    <SideBar
                        personalMessage={personalMessage}
                        quickPayOptions={quickPayOptions}
                        userProfile={this.props.userProfile}
                        m2uLite={m2uLite}
                        currentIndex={this.props.currentIndex}
                        navigateToDifferentPages={this.props.navigateToDifferentPages}
                        sideBarDetails={sideBarDetails}
                        readMessage={this.props.readMessage}
                        getAsyncQuickPayDetails={this.props.getAsyncQuickPayDetails}
                        quickPaySummary={this.props.quickPaySummary}
                        toggleSearchModal = {this.props.toggleSearchChat.bind(this,"showSearchModal")}
                    />
                </div>
            </IntlProvider>

        );
    }
}

export default Inbox;
