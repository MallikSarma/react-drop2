import React from "react";
import * as css from "./SavingAccountContainer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import AvailableBalanceCard from "../AvailableBalanceCard";
import AccountDetailsCard from "../AccountDetailsCard";
import AccountTable from "../../../../components/AccountTable";
import classnames from "classnames";
import { DropdownButton, MenuItem, Button } from "react-bootstrap";
import CasaLiteAccountDetails from "../CasaLiteAccountDetails";
import PopupMenuDropDown from "../PopupMenuDropDown";
const defaultMessages = defineMessages({
    asOf: {
        id: "app.details.asOf",
        defaultMessage: "As of"
    },
    dateHeader:{
        id: "app.details.dateHeader",
        defaultMessage: "Date"
    },
    descriptionHeader: {
        id: "app.details.descriptionHeader",
        defaultMessage: "Description"
    },
    amountHeader: {
        id: "app.details.amountHeader",
        defaultMessage: "Amount"
    },
    allTransactions:{
        id: "app.details.allTransactions",
        defaultMessage: "All Transaction History"
    },
    debitCard: {
        id: "app.details.debitCard",
        defaultMessage: "Debit Card Transaction"
    },
    m2uTransaction: {
        id: "app.details.m2uTransaction",
        defaultMessage: "M2U Transaction"
    },
    m2uPay: {
        id: "app.details.m2uPay",
        defaultMessage: "M2U Pay"
    },
    lastNDays: {
        id: "app.details.lastNDays",
        defaultMessage: "Last {count} days"
    },
    requestHardCopy: {
        id: "app.details.requestHardCopy",
        defaultMessage: "REQUEST HARD COPY"
    },
    viewStatement: {
        id: "app.details.viewStatement",
        defaultMessage: "VIEW STATEMENT"
    }
});
export const SavingAccountContainer = ({
        intl,
        handlePDFUrl,
        accountDetails,
        asyncRefreshTablePeriod,
        tableData,
        handleUpdate,
        getRequestHardCopyData,
        toggleRequestHardCopyPopup,
        viewStatementPdf,
        toggleViewStatementPdf,
        detailType,
        popupOpen,
        togglePopupMenu,
        currentAccount,
        accountTransactions,
        accountsInfo,
        getAsyncAccTransaction,
        getAsyncMoreAccTransactions,
        requestArray}) => {
    const { formatMessage , formatNumber } = intl;
    const {reqInfo} = accountTransactions || {};
    const currentTableInfo = {
        transactionType: tableData.transactionType || "allTransactions",
        period: tableData.timeSpan || currentAccount.transactionPeriod
    };
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    let transactionTitle = <span>{formatMessage(defaultMessages[currentTableInfo.transactionType])}<img src="m2u/static/icons/open_dropdown.svg"/></span>;
    let periodTitle = <span>{formatMessage(defaultMessages.lastNDays, {count: currentTableInfo.period})}<img src="m2u/static/icons/open_dropdown.svg"/></span>;
    function getData(){
        return accountTransactions && accountTransactions.transaction || [];
    }
    let cols = [
      {
        property: "date",
        header: {
          label: (formatMessage(defaultMessages.dateHeader)).toUpperCase()
        },
        props:{
            className: "hidden-sm hidden-xs"
        }
      },
      {
        property: "description",
        header: {
          label: (formatMessage(defaultMessages.descriptionHeader)).toUpperCase()
        },
        props:{
            className: "hidden-sm hidden-xs"
        }
      },
      {
        property: "details",
        header: {
          label: (formatMessage({ id: "app.logout.details" })).toUpperCase()
        },
        props:{
            className: `hidden-lg hidden-md ${css.details}`
        }
      },
      {
        property: "amount",
        header: {
          label: (formatMessage(defaultMessages.amountHeader)).toUpperCase()
        },
        props:{
            className: css.amountHeader
        }
      },
      {
        property: "option",
        header: {
          label: ""
        },
        props:{
            className: css.option
        }
      }
    ];
    function viewStatement(){
        toggleViewStatementPdf();
    }
    function getFooter(){
        return  (
                    <div className={`row ${css.tableFooter}`}>
                        <div className={`col-xs-12 col-sm-1 ${css.pullHeaderLeft}`}>
                            {
                                requestArray && requestArray.length >= 1 &&
                                <a className={css.back_arrow} onClick={getAsyncMoreAccTransactions.bind(this, {"reduce":true})}><img src="static/icons/next.svg"/></a>
                            }
                        </div>
                        <div className={`col-xs-12 col-sm-5 ${css.pullHeaderRight}`}>
                            <Button onClick={toggleRequestHardCopyPopup.bind(this,true)} className={`${css.requestCopy} btn btn-default`}>{formatMessage(defaultMessages.requestHardCopy)}<img src="static/icons/download.svg"/></Button>
                        </div>
                        <div className={`col-xs-12 col-sm-5  ${css.pullHeaderLeft}`}>
                            <Button onClick={viewStatement} className="btn btn-default">{formatMessage(defaultMessages.viewStatement)}<img src="static/icons/document.svg"/></Button>
                        </div>
                        <div className={`col-xs-12 col-sm-1 ${css.pullHeaderRight}`}>
                            {
                                reqInfo && reqInfo.showMore &
                                <a className={css.next_arrow} onClick={getAsyncMoreAccTransactions}><img src="static/icons/next.svg"/></a>
                            }
                        </div>
                    </div>
                );
    }
    function getHeader(){
        const {transactionTypes} = currentAccount;
        return (<div>
                    <div className="hidden-md hidden-lg hidden-sm hidden-md hidden-sm">
                        <div className={`col-sm-6 col-xs-12 ${css.pullHeaderLeft}`}>
                            <select className="form-control" onChange={(ev)=>getAsyncAccTransaction({value: ev.target.value, key: "transactionType"})}>
                                {
                                    transactionTypes.map(name=>
                                        <option key={name} value={name}>
                                            {formatMessage(defaultMessages[name])}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className={`col-sm-6 col-xs-12 ${css.pullHeaderRight}`}>
                            <select className="form-control" onChange={(ev)=>getAsyncAccTransaction({value: ev.target.value, key: "timeSpan"})}>
                                <option value="30">
                                    {formatMessage(defaultMessages.lastNDays, {count : 30})}
                                </option>
                                <option value="60">
                                    {formatMessage(defaultMessages.lastNDays, {count : 60})}
                                </option>
                                <option value="90">
                                    {formatMessage(defaultMessages.lastNDays, {count : 90})}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className={`row hidden-xs ${css.selectWrapper}`}>
                        <div className={`col-xs-6 ${css.pullHeaderLeft}`}>
                            <DropdownButton id="total-card-dropdown" noCaret title={transactionTitle}>
                                {
                                    transactionTypes.map(name=>
                                        <MenuItem key={`menuitem-${name}`} onClick={getAsyncAccTransaction.bind(this, {value: name, key: "transactionType"})}>
                                            {formatMessage(defaultMessages[name])}
                                        </MenuItem>
                                    )
                                }
                            </DropdownButton>
                        </div>
                        <div className={`col-xs-6 ${css.pullHeaderRight}`}>
                            <DropdownButton id="total-card-dropdown" noCaret title={periodTitle}>
                                <MenuItem onClick={getAsyncAccTransaction.bind(this, {key: "timeSpan", value:30})}>
                                    {formatMessage(defaultMessages.lastNDays, {count : 30})}
                                </MenuItem>
                                <MenuItem onClick={getAsyncAccTransaction.bind(this, {key: "timeSpan", value:60})}>
                                    {formatMessage(defaultMessages.lastNDays, {count : 60})}
                                </MenuItem>
                                <MenuItem onClick={getAsyncAccTransaction.bind(this, {key: "timeSpan", value:90})}>
                                    {formatMessage(defaultMessages.lastNDays, {count : 90})}
                                </MenuItem>
                            </DropdownButton>
                        </div>
                    </div>
                </div>);
    }
    function getRender(row) {
        const amountClass = classnames({
            [css.amounts]: true,
            [css.negativeAmount] : row.amount < 0
        });
        return {
            "date": <span>{row.transactionDate}</span>,
            "description": <span>{row.description}</span>,
            "details": <div>
                            <span>{row.description}</span><br/>
                            <span className={css.detailDate}>{row.transactionDate}</span>
                        </div>,
            "amount":   <div className={amountClass}>
                            <span className={css.currency}>{row.amountCurrency}</span>
                            <span>{formatNumber(Math.abs(row.amount), decimalDigits)}</span>
                        </div>,
            "option":   <div>
                            <div className={css.download}>
                                {/* row.receiptUrl &&
                                    <a onClick={handlePDFUrl.bind(this,row.receiptUrl)} >
                                        <img src="static/icons/download.svg"/>
                                    </a>
                                    ||
                                    ""
                                */}
                            </div>
                        </div>
        };
    }
    const data = getData();
    const tableHeader = getHeader();
    const tableFooter = getFooter();
    const {panelData} = currentAccount;
    const {lastUpdated, availableBalance, moneyIn, moneyOut} = currentAccount.pageData || {};
    const typesMap = {
        S: "Savings",
        FD: "Fixed Deposit",
        CL: "Casalite"
    };
    return (<div className={` row ${css.savingAccountContainer}`}>
                <div className="col-lg-1 col-md-1"/>
                <div className="col-sm-12 col-md-10">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={`row ${css.accountInfo}`}>
                                <div className={`col-xs-10 ${css.accountName}`}>
                                    <span>{currentAccount.longName} </span>
                                    {
                                        currentAccount.type &&
                                        <span>({typesMap[currentAccount.type]})</span>
                                    }
                                    <span className={css.number}>{currentAccount.displayNumber}</span>
                                </div>
                                <div className="col-xs-1"/>
                                <div className="col-xs-1">
                                    <div onClick={(ev)=>{ev.stopPropagation(); togglePopupMenu();}} className={css.moreIcon}>
                                        <img src="static/icons/show_more.svg"/>
                                        {
                                            popupOpen &&
                                            <PopupMenuDropDown detailType={detailType} cardType={accountsInfo.dashboardType} togglePopupMenu={togglePopupMenu}/>
                                        }
                                    </div>
                                </div>
                            </div>
                                {
                                    currentAccount.type === "CL" &&
                                    <div className={`row ${css.accountInfo}`}>
                                        <div className="col-xs-12">
                                            <CasaLiteAccountDetails accountDetails={currentAccount.pageData}/>
                                        </div>
                                    </div>
                                    ||
                                    <div className={`row ${css.accountInfo}`}>
                                        <div className="col-xs-12">
                                            <div className={`${css.availableBalanceSection} container-fluid`}>
                                                { <div className="row">
                                                    <div className={`col-sm-4 col-xs-12 ${css.firstCard}`}>
                                                        <AvailableBalanceCard currency={availableBalance.currency} availableBalance={availableBalance.value} />
                                                    </div>
                                                    <div className={`col-sm-4 col-xs-12 ${css.secondCard}`}>
                                                        <AvailableBalanceCard moneyIn={moneyIn.value} currency={moneyIn.currency}/>
                                                    </div>
                                                    <div className={`col-sm-4 col-xs-12 ${css.lastCard}`}>
                                                        <AvailableBalanceCard moneyOut={moneyOut.value} currency={moneyOut.currency}/>
                                                    </div>
                                                </div>}
                                                <div className={css.lastUpdated}>
                                                    <span>*{formatMessage(defaultMessages.asOf)}</span>
                                                    {<span>{lastUpdated}</span>}
                                                </div>
                                            </div>
                                            {
                                                panelData &&
                                                <div>
                                                   {<AccountDetailsCard details={panelData}/>}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }
                        </div>
                    </div>
                </div>
                <div className="col-lg-1 col-md-1"/>
                <div className="col-xs-12">
                    <div className={`row ${css.tableHolder}`}>
                        <div className="col-xs-12 col-sm-1" />
                        <div className="col-xs-12 col-sm-10">
                            <div className={`${css.detailsTable}`}>
                                {<AccountTable data={data} getRender={getRender} tableFooter={tableFooter} tableHeader={tableHeader} cols={cols}/>}
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-1" />
                    </div>
                </div>
            </div>);
};

SavingAccountContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(SavingAccountContainer);
