import React from "react";
import * as css from "./SideBar.scss";
import SidebarTable from "../../routes/WealthDetails/components/SidebarTable";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import PopupMenuDropDown from "../../routes/AccountDetails/components/PopupMenuDropDown";
import classnames from "classnames";
const defaultMessages = defineMessages({
    stockHeader:{
        id: "app.dashboard.stockHeader",
        defaultMessage: "STOCK"
    },
    lastHeader: {
        id: "app.dashboard.lastHeader",
        defaultMessage: "LAST"
    },
    changeHeader: {
        id: "app.dashboard.changeHeader",
        defaultMessage: "CHANGE"
    },
    stockPicks: {
        id: "app.dashboard.stockPicks",
        defaultMessage: "MAYBANK STOCK PICKS"
    },
    yield: {
        id: "app.dashboard.yield",
        defaultMessage: "YIELD"
    },
    logout: {
        id: "app.dashboard.logout",
        defaultMessage: "LOGOUT",
    },
    transfer: {
        id: "app.dashboard.transfer",
        defaultMessage: "TRANSFER"
    },
    skip: {
        id: "app.dashboard.skip",
        defaultMessage: "SKIP"
    },
    quickTransfer: {
        id: "app.dashboard.quickTransfer",
        defaultMessage: "QUICK PAY & TRANSFER"
    },
    announcement: {
        id: "app.dashboard.announcement",
        defaultMessage: "READ"
    },
    promotion: {
        id: "app.dashboard.promotion",
        defaultMessage: "READ"
    },
    notification: {
        id: "app.dashboard.notification",
        defaultMessage: "READ"
    },
    billpresentment: {
        id: "app.dashboard.billpresentment",
        defaultMessage: "VIEW BILL"
    },
    goaltransfer: {
        id: "app.dashboard.goaltransfer",
        defaultMessage: "TRANSFER"
    }
});

const myobj = {
     "maybankStockPicks":[{
        "name":"Panamy",
        "last":39.200,
        "change":1.400
    },{
        "name":"Aji",
        "last":14.460,
        "change":0.460
    },{
        "name":"Prkcorp",
        "last":2.380,
        "change":0.200
    }]
};

export const SideBar = ({
                userProfile,
                personalMessage,
                quickPayOptions,
                popupOpen,
                togglePopupMenu,
                updateTableRecords,
                wealthDetails,
                manageFD,
                togglePlacementFD,
                upliftManageFD,
                tableData,
                intl,
                mobile,
                navigateToDifferentPages,
                getTableData,
                currentIndex,
                sideBarDetails,
                casaLite,
                readMessage,
                toggleSearchModal,
                getAsyncQuickPayDetails,
                quickPaySummary
            }) => {
    const { formatMessage } = intl;
    const {maybankStockPicks} = wealthDetails || {};
    function getQuickpayData(option) {
        getAsyncQuickPayDetails(option);
    }
    function getQuickPayTransfer() {
    if (!quickPayOptions || !quickPayOptions.quickLink) {
        return;
    }
    return  (<div className="row">
                {
                    quickPayOptions.quickLink.map((option, index)=>{
                        return (<div className={css.quickItem} key={index} onClick={!quickPaySummary && getQuickpayData.bind(this,option)}>
                                    <div className={`col-xs-2 ${css.big_radio_container}`}>
                                        <div className={`${css.big_radio_wrapper}`}>
                                                <img src="m2u/static/icons/big_unselected_radio_button.svg"/>
                                        </div>
                                    </div>
                                    <div className="col-xs-10">
                                    <h6>
                                        {option.title}
                                    </h6>
                                    <span>
                                        {option.subTitle}
                                    </span>
                                    </div>
                                </div>);
                    })
                }
            </div>);
    }
    const classes = classnames({
        "hidden-sm": !mobile,
        "hidden-xs": !mobile,
        "hidden-md": !mobile,
        [css.side_bar_wrapper]: true
    });
    const defaultData = {
        profileImage: "m2u/static/img/profile_pic.svg",
        unreadMessages: []
    };
    let unreadMessages = personalMessage && personalMessage.messages ? personalMessage.messages : defaultData.unreadMessages;
    const messageType = unreadMessages[currentIndex] ? unreadMessages[currentIndex].type : "announcement";
    function nextMessage() {
        readMessage();
    }

    let cols = [
      {
        property: "stock",
        header: {
          label: formatMessage(defaultMessages.stockHeader)
        }
      },
      {
        property: "last",
        header: {
          label: formatMessage(defaultMessages.lastHeader)
        }
      },
      {
        property: "change",
        header: {
          label: formatMessage(defaultMessages.changeHeader)
        }
      }
    ];


    function getData(){
        return myobj.maybankStockPicks;
    }

    function getHeader(){
        return (
                    <div className={css.headerRow}>
                    <div className={css.headerContainer}>
                        <div className={`col-xs-10 col-sm-10 ${css.pullHeaderLeft}`}>
                            <span className={css.headerText}> {formatMessage(defaultMessages.stockPicks)}{"*"} </span>
                            <span className={css.subHeaderText}> {"("}{formatMessage(defaultMessages.yield)}{")"} </span>
                        </div>
                        <div className={`col-xs-2 col-sm-2 ${css.pullHeaderRight}`}>
                            <div className={css.moreIconPopUp} onClick={(ev)=>{ev.stopPropagation(); togglePopupMenu();}}>
                                <img src="static/icons/show_more_white.svg"/>
                            </div>
                        </div>
                    </div>
                    </div>
                );
    }
    function getRender(row, rowIndex) {
        return {
            "stock": <span>{row.name}</span>,
            "last": <span>{row.last}</span>,
            "change": <span className={css.lastCol}>{row.change}</span>
        };
    }

    const data = getData().slice(0, 0 + 10);
    const tableHeader = getHeader();

    return (
        <div className={classes}>
                <div className={` row ${css.side_bar_top_nav}`}>
                    <div className="col-xs-3" onClick={navigateToDifferentPages.bind(this, {address:"inbox/"})}>
                        <img
                            className={`${css.envelop} img-responsive`}
                            src="m2u/static/icons/evelope_white.svg"
                        />
                    </div>
                    <div className={`col-xs-3  ${css.settings_icon_wrapper}`}>
                        <img
                            className={`${css.settings} img-responsive`}
                            src="m2u/static/icons/settings_white.svg"
                        />
                    </div>
                    <div className={`col-xs-6 ${css.logout_icon_wrapper}`} onClick={navigateToDifferentPages.bind(this, {address: "logout"})} style={{paddingRight: "1.5rem"}}>
                        <img src="m2u/static/icons/unlocked_gold.svg"/>
                        <span>{formatMessage(defaultMessages.logout)}</span>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-md-12 ${css.avatar_container}`}>
                        <div className={css.avatar_wrapper} >
                            <img
                                className="img-circle"
                                src={userProfile.profileImageUrl}
                            />
                            <div className={`pull-right ${css.messages_count_circle}`}>
                                <span>{personalMessage && personalMessage.newInboxCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-md-12 ${css.truncated_messages_container}`}>
                        <div className="row">
                            <div className="col-md-12">
                            <span>
                                {unreadMessages[currentIndex] ? unreadMessages[currentIndex].title : ""}
                            </span>
                            </div>
                        </div>
                        {
                            !casaLite &&
                            <div className="row">
                                <div className={`col-md-12 ${css.messages_buttons_container}`}>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <button type="button"  className={`btn ${css["btn-default-white"]}`} onClick={nextMessage}>
                                                {formatMessage(defaultMessages.skip)}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {
                    !casaLite &&
                    <div>
                        <div className="row">
                            <div className={`${css.divider}`}>
                                <hr/>
                            </div>
                        </div>
                        {!maybankStockPicks &&
                        <div>
                            <div className="row">
                                <div className={`col-md-12 ${css.quick_pay_trans_header}`}>
                                    <div className="row">
                                        <div className="col-xs-10">
                                            <span>{formatMessage(defaultMessages.quickTransfer)}</span>
                                        </div>
                                        <div className="col-xs-2">
                                            <img
                                            className={css.transactionIcon}
                                            src="m2u/static/icons/transaction_white.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={`col-md-12 ${css.quick_pay_transactions}`}>
                                    {getQuickPayTransfer()}
                                </div>
                            </div>
                        </div>
                            ||
                            <div className="row">
                                <div className={`col-xs-12 ${css.wealth_sidebar_section_table}`}>
                                  <SidebarTable data={data} getRender={getRender} tableHeader={tableHeader} cols={cols}/>
                                </div>
                            </div>
                        }
                        <div className="hidden-sm hidden-xs hidden-md searchButton">
                            <span onClick={toggleSearchModal}>
                                <img src="m2u/static/icons/search.svg" />
                            </span>
                        </div>
                    </div>

                }
        </div>
    );
};
SideBar.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(SideBar);
