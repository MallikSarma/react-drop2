import React from "react";
import * as css from "./FixedDepositsContainer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import AccountTable from "../../../../components/AccountTable";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import FixedDepositCard from "../FixedDepositCard";
import PopupFixedDeposit  from "../PopupFixedDeposit";
import PopupMenuDropDown from "../PopupMenuDropDown";
import _ from "lodash";
const defaultMessages = defineMessages({
    certNumberHeader:{
        id: "app.details.certNumberHeader",
        defaultMessage: "CERT NUMBER"
    },
    principalHeader: {
        id: "app.details.principalHeader",
        defaultMessage: "PRINCIPAL"
    },
    termHeader: {
        id: "app.details.termHeader",
        defaultMessage: "TERM"
    },
    interestPaHeader:{
        id: "app.details.interestPaHeader",
        defaultMessage: "INTEREST (p.a)"
    },
    placementDateHeader: {
        id: "app.details.placementDateHeader",
        defaultMessage: "PLACEMENT DATE"
    },
    maturityDateHeader: {
        id: "app.details.maturityDateHeader",
        defaultMessage: "MATURITY DATE"
    },
    interestPaymentHeader: {
        id: "app.details.interestPaymentHeader",
        defaultMessage: "INTEREST PAYMENT"
    },
    uponMaturityHeader: {
        id: "app.details.uponMaturityHeader",
        defaultMessage: "UPON MATURITY"
    },
    months: {
        id: "app.details.months",
        defaultMessage: "months"
    },
    certificates: {
        id: "app.details.certificates",
        defaultMessage: "CERTIFICATES"
    },
    makePlacement: {
        id: "app.details.makePlacement",
        defaultMessage: "MAKE PLACEMENT"
    },
    youAreOnlyAllowed: {
        id: "app.details.youAreOnlyAllowed",
        defaultMessage: "You are only allowed to uplift or manage this certificate at the branch."
    }
});
export const FixedDepositsContainer = ({ intl, currentAccount, accountTransactions, detailType, manageFD,togglePlacementFD, upliftManageFD, tableData, getTableData, popupOpen, togglePopupMenu, requestArray, getAsyncMoreAccTransactions }) => {
    const { formatMessage , formatNumber } = intl;
    const {reqInfo} = accountTransactions || {};
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    function getData(){
        return accountTransactions.certificates || [];
    }
    let cols = [
      {
        property: "certNumber",
        header: {
          label: formatMessage(defaultMessages.certNumberHeader)
        }
      },
      {
        property: "principal",
        header: {
          label: formatMessage(defaultMessages.principalHeader)
        }
      },
      {
        property: "term",
        header: {
          label: formatMessage(defaultMessages.termHeader)
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "interestPa",
        header: {
          label: formatMessage(defaultMessages.interestPaHeader)
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "placementDate",
        header: {
          label: formatMessage(defaultMessages.placementDateHeader)
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "maturityDate",
        header: {
          label: formatMessage(defaultMessages.maturityDateHeader)
        }
      },
      {
        property: "interestPayment",
        header: {
          label: formatMessage(defaultMessages.interestPaymentHeader)
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "uponMaturity",
        header: {
          label: formatMessage(defaultMessages.uponMaturityHeader)
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "menu",
        header: {
          label: ""
        }
      }

    ];
    function getFooter(){
        return  (
                    <div className={css.footer}>
                        <div className={`row ${css.tableFooter}`}>
                            <div className={`col-xs-1 ${css.pullHeaderLeft}`}>
                                {
                                    requestArray && requestArray.length >= 1 &&
                                    <a className={css.back_arrow} onClick={getAsyncMoreAccTransactions.bind(this, {"reduce":true})}><img src="static/icons/next.svg"/></a>
                                }
                            </div>
                            <div className="col-xs-10"/>
                            <div className={`col-xs-1 ${css.pullHeaderRight}`}>
                                {
                                    reqInfo && reqInfo.showMore &&
                                    <a className={css.next_arrow} onClick={getAsyncMoreAccTransactions}><img src="static/icons/next.svg"/></a>
                                }
                            </div>
                        </div>
                    </div>
                );
    }
    function getHeader(){
        return (<div>
                    <div className={css.headerRow}>
                        <div className={`col-xs-12 col-sm-6 ${css.pullHeaderLeft}`}>
                            <h6>{formatMessage(defaultMessages.certificates)}</h6>
                        </div>
                        <div className={`col-xs-12 col-sm-6 ${css.pullHeaderRight}`}>
                            <Button className="btn btn-success" onClick={()=>togglePlacementFD()}>
                                {formatMessage(defaultMessages.makePlacement)}
                                <img src="m2u/static/icons/add_white.svg"/>
                            </Button>
                        </div>
                    </div>
                </div>);
    }
    function openManageUplift(index, ev) {
        ev.stopPropagation();
        upliftManageFD(index);
    }
    function handleUpliftManage(row) {
        return (key, ev)=>{
            //ev.stopPropagation();
            let newState = Object.assign({},row);
            newState.state = key;
            upliftManageFD(newState);
        };
    }
    function getRender(row, rowIndex) {
        const tooltip = (
            <Tooltip  className={css.tooltipWrapper} id="tooltip">{formatMessage(defaultMessages.youAreOnlyAllowed)}</Tooltip>
        );
        return {
            "certNumber": <span>{row.certNumber}</span>,
            "principal": <div><span className={css.currency}>{row.amountCurrency}</span><span>{formatNumber(Math.abs(row.principal), decimalDigits)}</span></div>,
            "term": <span className={css.months}>{row.termInMonths} {formatMessage(defaultMessages.months)}</span>,
            "interestPa": <span>{row.interestPA}</span>,
            "placementDate": <span>{row.placementDate}</span>,
            "maturityDate": <span>{row.maturityDate}</span>,
            "interestPayment": <span>{row.interestPayment}</span>,
            "uponMaturity": <span>{row.uponMaturity}</span>,
            "menu" : <div className={css.menu}>
                       { row.managementAllowed ?
                            <div>
                                <span onClick={openManageUplift.bind(this, rowIndex)}>
                                    <img
                                        src="static/icons/show_more.svg"
                                    />
                                </span>
                                {
                                    manageFD.rowIndex === rowIndex &&
                                    <PopupFixedDeposit handleUpliftManage={handleUpliftManage(row)} upliftManageFD={upliftManageFD}/>
                                }
                            </div>
                            :
                            <OverlayTrigger placement="bottom" overlay={tooltip}>
                                <span>
                                    <img
                                        className={css.disabled}
                                        src="static/icons/show_more.svg"
                                    />
                                </span>
                            </OverlayTrigger>
                        }
                    </div>
        };
    }
    const data = getData();
    const tableHeader = getHeader();
    const tableFooter = getFooter();
    const {panelData} = currentAccount;
    return (<div className={`row ${css.fixedDepositsAccountContainer}`}>
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-12" />
                        <div className="col-xs-12 col-sm-12">
                            <div className={`row ${css.accountInfo}`}>
                                <div className="col-xs-10">
                                    <span>{currentAccount.longName} </span>
                                    <span className={css.number}>{currentAccount.displayNumber}</span>
                                </div>
                                <div className="col-xs-2" />
                            </div>
                            <div className={`${css.accountInfo} container-fluid`}>
                                <FixedDepositCard accountDetails={panelData}/>
                            </div>
                        </div>
                        <div className="col-xs-12" />
                    </div>
                    <div className={`row ${css.tableHolder}`}>
                        <div className="col-xs-12 col-sm-1" />
                        <div className="col-xs-12 col-sm-10">
                            <div className={`${css.detailsTable}`}>
                                <AccountTable tableContainerClass={css.scrollTable} data={data} getRender={getRender} tableFooter={tableFooter} tableHeader={tableHeader} cols={cols}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-1" />
                    </div>
                </div>
            </div>);
};

FixedDepositsContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(FixedDepositsContainer);
