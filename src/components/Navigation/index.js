import React from "react";
import * as css from "./Navigation.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
import { DropdownButton, MenuItem } from "react-bootstrap";
const defaultMessages = defineMessages({
    casa: {
        id: "app.dashboard.saved",
        defaultMessage: "SAVED",
    },
    fixedDeposit: {
        id: "app.dashboard.fixedDeposit",
        defaultMessage: "FIXED DEPOSIT"
    },
    cards: {
        id: "app.dashboard.cards",
        defaultMessage: "CARDS"
    },
    loans: {
        id: "app.dashboard.loans",
        defaultMessage: "LOANS"
    },
    wealth: {
        id: "app.dashboard.wealth",
        defaultMessage: "WEALTH"
    }
});
export const Navigation = ({
        intl,
        dashboardTypes,
        incrementCardsShown,
        navigationMobileExpanded,
        toggleNavigationState,
        navigatePage,
        accumulatedAmount,
        currentTab,
        togglePopupMenu,
        handleNextIndex,
        details,
        imTeen
    }) => {
    const { formatMessage, formatNumber } = intl;
    function navigateHelper(tab){
        navigatePage(tab);
        if (!details){
            incrementCardsShown();
            togglePopupMenu();
            handleNextIndex(0);
        }
    }
    function getAccountTabs() {
        let tabs = dashboardTypes;
        if (imTeen === true){
             tabs = ["saved"];
        }
        const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
        return tabs.map((tab)=>{
            const tabClass = classnames({
                [css.selected]: currentTab === tab,
                "col-lg-2 col-md-2 col-sm-2 hidden-xs": true,
                [css["nav-tabs"]]: true
            });
            const amountClass = classnames({
                [css.amounts]: true,
                [css.negativeAmount] : accumulatedAmount[tab].accumulatedAmount < 0
            });
            return (<div className={tabClass} key={tab} onClick={navigateHelper.bind(this,tab)}>
                        <div className={css.desktopcontainer}>
                            <div className={css.typeName}>
                                {formatMessage(defaultMessages[tab])}
                            </div>
                            <div className={amountClass}>
                            {
                                !!accumulatedAmount[tab].accumulatedAmount &&
                                <div>
                                    <span className={css.currency}>{accumulatedAmount[tab].accumulatedCurrency}</span>
                                    <span>{formatNumber(Math.abs(accumulatedAmount[tab].accumulatedAmount), decimalDigits)}</span>
                                </div> ||
                                <span>--</span>
                            }
                            </div>
                        </div>
                    </div>);
        });
    }
    function getMobileAccountTabs() {
        let tabs = dashboardTypes;
        if (imTeen === true){
             tabs = ["saved"];
        }
        const dropDownImage = navigationMobileExpanded ? "m2u/static/icons/close_dropdown.svg" : "m2u/static/icons/open_dropdown.svg";
        const buttonAmountClass = classnames({
            [css.amounts]: true,
            [css.negativeAmount] : accumulatedAmount[currentTab].accumulatedAmount < 0
        });
        const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
        let currentSelection = (<div className={css["nav-tabs"]}>
                                    <div className={css.typeName}>
                                        {formatMessage(defaultMessages[currentTab])}
                                    </div>
                                     <div className={buttonAmountClass}>
                                    {
                                        !!accumulatedAmount[currentTab].accumulatedAmount &&
                                        <div>
                                            <span className={css.currency}>{accumulatedAmount[currentTab].accumulatedCurrency}</span>
                                            <span>{formatNumber(Math.abs(accumulatedAmount[currentTab].accumulatedAmount), decimalDigits)}</span>
                                        </div> ||
                                        <span>--</span>
                                    }
                                    </div>
                                    { !imTeen &&
                                        <img src={dropDownImage}/>
                                    }
                                </div>);
        return (<div className={`${css.mobileNavigation} col-xs-12 col-md-12 hidden-md hidden-lg hidden-sm`}>
                    <DropdownButton title={currentSelection} id="bg-justified-dropdown" onToggle={toggleNavigationState} noCaret>
                        {
                            tabs.map((tab, tabIndex)=>{
                                const amountClass = classnames({
                                    [css.amounts]: true,
                                    [css.negativeAmount] : accumulatedAmount[tab].accumulatedAmount < 0
                                });
                                const labelClass = classnames({
                                    [css.selectedListItem]: tab === currentTab,
                                    [css.typeName]: true
                                });
                                return (<MenuItem key={tabIndex} onClick={navigatePage.bind(this,tab)}>
                                            {<div className={css["nav-tabs"]}>
                                                <div className={labelClass}>
                                                    {formatMessage(defaultMessages[tab])}
                                                </div>
                                                <div className={amountClass}>
                                                {
                                                    !!accumulatedAmount[tab].accumulatedAmount &&
                                                    <div>
                                                        <span className={css.currency}>{accumulatedAmount[tab].accumulatedCurrency}</span>
                                                        <span>{formatNumber(Math.abs(accumulatedAmount[tab].accumulatedAmount), decimalDigits)}</span>
                                                    </div> ||
                                                    <span>--</span>
                                                }
                                                </div>
                                            </div>}
                                        </MenuItem>);
                            })
                        }
                        </DropdownButton>
                </div>);
    }
    return (
          <div className={`container-fluid ${css.container}`}>
            <div className={css.navigationContent}>
                <div className="row mobile">
                    <div className={`${css.firstBlock} col-sm-1 col-md-1`}/>
                    {getAccountTabs()}
                    {getMobileAccountTabs()}
                    <div className="col-md-1 col-sm-1"/>
                </div>
            </div>
        </div>
    );
};

Navigation.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(Navigation);
