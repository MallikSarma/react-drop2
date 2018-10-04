import React from "react";
import * as css from "./wealth.scss";
import msLocaleData from "react-intl/locale-data/ms";
import { IntlProvider, defineMessages, addLocaleData } from "react-intl";
import SideBar from "../../../components/SideBar";
import RightSideBarContainer from "../../../components/RightSideBarContainer";
import LeftSideBarContainer from "../../../components/LeftSideBarContainer";
import Navigation from "../../../components/Navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Loader from "../../../components/LoaderNew";
import WebChatModal from "../../../components/WebChatModal";
import SearchModal from "../../../components/SearchModal";
import WealthAccountsContainer from "./WealthAccountsContainer";
import UnitTrustAccountContainer from "./UnitTrustAccountContainer";
import WealthModal from "./WealthModal";
import classnames from "classnames";
addLocaleData(msLocaleData);
class Wealth extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            navigationMobileExpanded: false
        };
    }

    componentWillMount() {
        this.props.resetWealthDetails();
        this.props.getWealthDetails(this.props.params.wealthType);
        this.props.getAsyncDashboardData();
    }


    componentWillUnmount() {
        this.props.resetWealthDetails();
    }
    checkFooterBackground(){
        return this.props.wealthDetails && this.props.wealthDetails.wealthTypes === "shares";
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
            this.props.resetWealthDetails();
        }
    }

    render() {
        const { pageContent, sideContent, m2uLite, bannerDetails } = this.props.dashboardDetails || {};
        const loaded = !!(this.props.wealthDetails && this.props.dashboardDetails);
        const containerClasses = classnames({
            [css.wealthContainer]: true,
            [css.mobileRTL]: this.props.showSideBar,
            [css.stillLoading]: !loaded,
            row: true
        });
        const sideBarDetails = sideContent || {};
        const {lastLogin, imTeen} = this.props.dashboardDetails || {};
        let tab = "";
        if (this.props.wealthDetails) {
            tab = this.props.wealthDetails.tab;
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
        const wealthTypes = this.props.wealthDetails ? this.props.wealthDetails.wealthTypes : "";
        return (
            <IntlProvider locale={this.props.locale} defaultLocale={'en-US'} messages={this.props.messages}>
                <div className={containerClasses} onScroll={(ev)=>this.setScrollPosition(ev.target.scrollTop)}>
                    <div className={`${css.container}`}>
                        <Loader loaded={loaded}>
                            <div className={topSectionClasses}>
                                <Header
                                    menuButtonClick={this.props.menuButtonClick}
                                    leftMenuButtonClick={this.props.leftMenuButtonClick}
                                    lastLogin={lastLogin}
                                    currentPage={this.props.currentPage}
                                    navigateToDifferentPages={this.props.navigateToDifferentPages}
                                />
                                <div className={css.navigation}>
                                    <Navigation
                                        details
                                        navigatePage={this.props.navigatePage}
                                        pageContent={pageContent}
                                        currentTab={tab}
                                        imTeen={imTeen}
                                        navigationMobileExpanded={this.state.navigationMobileExpanded}
                                        toggleNavigationState={()=>this.toggleNavigationState()}
                                        incrementCardsShown={this.props.incrementCardsShown}
                                        togglePopupMenu={this.props.togglePopupMenu}
                                        handleNextIndex={this.props.handleNextIndex}
                                    />
                                </div>
                            </div>
                            <div className={contentContainerClasses}>
                                <div className="container-fluid">
                                {
                                    this.props.params.wealthType === "shares" &&
                                    <WealthAccountsContainer
                                        wealthDetails={this.props.wealthDetails}
                                        wealthType = {this.props.params.wealthType}
                                        getShareAccountsData={this.props.getShareAccountsData}
                                        shareAccountsDetails={this.props.shareAccountsDetails}
                                        updateTableRecords={this.props.updateTableRecords}
                                        tableData={this.props.tableData}
                                        intNumOfDisplayedWealths={this.props.intNumOfDisplayedWealths}
                                        toggleDisplayedWealths={this.props.toggleDisplayedWealths}
                                    />
                                }
                                {
                                    this.props.params.wealthType === "unitTrust" &&
                                    <UnitTrustAccountContainer
                                        wealthDetails={this.props.wealthDetails}
                                        wealthType = {this.props.params.wealthType}
                                        getShareAccountsData={this.props.getShareAccountsData}
                                        shareAccountsDetails={this.props.shareAccountsDetails}
                                        shareFundDetails={this.props.shareFundDetails}
                                        updateTableRecords={this.props.updateTableRecords}
                                        tableData={this.props.tableData}
                                        toggleDisplayedWealths={this.props.toggleDisplayedWealths}
                                    />
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
                                <Footer  bannerDetails={bannerDetails || {}}/>
                                </div>
                            </div>
                            <SideBar
                                navigateToDifferentPages={this.props.navigateToDifferentPages}
                                m2uLite={m2uLite}
                                sideBarDetails={sideBarDetails}
                                readMessage={this.props.readMessage}
                                toggleSearchModal = {this.props.toggleSearchChat.bind(this,"showSearchModal")}
                                currentIndex={this.props.currentIndex}
                                wealthDetails={this.props.wealthDetails}
                            />
                                {
                                this.props.showSideBar &&
                                <RightSideBarContainer
                                    navigateToDifferentPages={this.props.navigateToDifferentPages}
                                    m2uLite={m2uLite}
                                    sideBarDetails={sideBarDetails}
                                    readMessage={this.props.readMessage}
                                    show={this.props.showSideBar} onClose={this.props.menuButtonClick}
                                    currentIndex={this.props.currentIndex}
                                    wealthDetails={this.props.wealthDetails}
                                />
                            }
                            {
                                this.props.showLeftSideBar &&
                                <LeftSideBarContainer leftMenuButtonClick={this.props.leftMenuButtonClick} toggleSearchModal={this.props.toggleSearchChat.bind(this,"showSearchModal")} handleNavigation={(page)=>this.handleNavigation(page)} currentPage={this.props.currentPage} show={this.props.showLeftSideBar} onClose={this.props.leftMenuButtonClick}/>
                            }
                            {/*<WealthModal getSliderPosition={this.props.getSliderPosition} sliderPosition={this.props.sliderPosition}/>*/}
                        </Loader>
                    </div>
                </div>
            </IntlProvider>
        );
    }
}

export default Wealth;