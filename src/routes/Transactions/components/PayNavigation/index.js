import React from "react";
import * as css from "./PayNavigation.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
import { DropdownButton, MenuItem } from "react-bootstrap";
const defaultMessages = defineMessages({
    pay: {
        id: "app.transactions.pay",
        defaultMessage: "PAY",
    },
    transfer: {
        id: "app.transactions.transfer",
        defaultMessage: "TRANSFER"
    },
    reload: {
        id: "app.transactions.reload",
        defaultMessage: "RELOAD"
    }
});
export const PayNavigation = ({
        intl,
        payNavigationMobileExpanded,
        navigatePage,
        currentTab,
        toggleNavigationState,
        resetStore,
        getAsyncPayDetails,
        getAsyncPayeeList
    }) => {
    const { formatMessage } = intl;
    function navigateHelper(tab){
        resetStore();
        navigatePage(tab);
        getAsyncPayDetails(tab);
        getAsyncPayeeList(tab);

    }
    function getPayAccountTabs() {
        let tabs = ["pay", "transfer", "reload"];
        return tabs.map((tab)=>{
            const tabClass = classnames({
                [css.selected]: currentTab === tab,
                "col-lg-1 col-md-1 col-sm-1 hidden-xs": true,
                [css["nav-tabs"]]: true
            });
            return (<div className={tabClass} key={tab} onClick={navigateHelper.bind(this,tab)}>
                        <div className={css.desktopcontainer}>
                            <div className={css.typeName}>
                                {formatMessage(defaultMessages[tab || "pay"])}
                            </div>
                        </div>
                    </div>);
        });
    }
    function getPayMobileAccountTabs() {
        let tabs = ["pay", "transfer", "reload"];
        const dropDownImage = payNavigationMobileExpanded ? "m2u/static/icons/close_dropdown.svg" : "m2u/static/icons/open_dropdown.svg";
        let currentSelection = (<div className={css["nav-tabs"]}>
                                    <div className={css.typeName}>
                                        {formatMessage(defaultMessages[currentTab || "pay"])}
                                    </div>
                                    { <img src={dropDownImage}/>
                                    }
                                </div>);
        return (<div className={`${css.mobileNavigation} col-xs-12 col-md-12 hidden-lg hidden-md hidden-sm`}>
                    <DropdownButton title={currentSelection} id="bg-justified-dropdown" onToggle={toggleNavigationState} noCaret>
                        {
                            tabs.filter(el=>el !== currentTab).map((tab, tabIndex)=>{
                                return (<MenuItem key={tabIndex} onClick={navigatePage.bind(this,tab)}>
                                            {<div className={css["nav-tabs"]}>
                                                <div className={css.typeName}>
                                                    {formatMessage(defaultMessages[tab])}
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
                    <div className="col-sm-1"/>
                    <div className="col-sm-3"/>
                    {getPayAccountTabs()}
                    {getPayMobileAccountTabs()}
                    <div className="col-sm-3"/>
                </div>
            </div>
        </div>
    );
};

PayNavigation.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(PayNavigation);
