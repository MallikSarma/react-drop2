import React from "react";
import * as css from "./LoanDetailsContainer.scss";
import { Panel, ProgressBar} from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import LoanInfo from "../LoanInfo";
import CardDetails from "../CardDetails";
import AccountTable from "../../../../components/AccountTable";
import classnames from "classnames";
import { DropdownButton, MenuItem, Button } from "react-bootstrap";
import PopupMenuDropDown from "../PopupMenuDropDown";
import _ from "lodash";
const defaultMessages = defineMessages({
    outstandingBalance:{
        id: "app.details.outstandingBalance",
        defaultMessage: "Outstanding Balance"
    },
    totalPaid:{
        id: "app.details.totalPaid",
        defaultMessage: "TOTAL PAID"
    },
    monthlyInstallment: {
        id: "app.details.monthlyInstallment",
        defaultMessage: "Monthly Installment"
    },
    installmentDue: {
        id: "app.details.installmentDue",
        defaultMessage: "Installment Due as of Today"
    },
    transactionHistory :{
        id: "app.details.transactionHistory",
        defaultMessage : "Transaction History"
    },
    payInAdvance: {
        id: "app.details.payInAdvance",
        defaultMessage: "Pay In Advance"
    }
});

const LoanDetailsContainer = ({
        intl,
        handlePDFUrl,
        accountDetails,
        asyncRefreshTablePeriod,
        getTableData,
        tableData,
        toggleRedrawLoan,
        getAsyncLoanTransfer,
        toggleViewStatementPdf,
        viewStatementPdf,
        detailType,
        popupOpen,
        togglePopupMenu,
        currentAccount,
        accountTransactions,
        accountsInfo,
        getAsyncAccTransaction,
        getAsyncMoreAccTransactions,
        requestArray}) => {
    const { formatMessage, formatNumber } = intl;
    const {reqInfo} = accountTransactions || {};
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    const { installmentDueTodayDate,
            installmentDueTodayValue,
            monthlyInstallmentDate,
            monthlyInstallmentValue,
            outstanding,
            paidAmount,
            lastUpdated,
            payInAdvance} = currentAccount.pageData || {};
    const totalAmount = outstanding && outstanding.value + paidAmount.value;
    const progress = outstanding && outstanding.value / totalAmount * 100;
    function viewStatement(){
        toggleViewStatementPdf();
    }
    function getLabel(mobile) {
        if (mobile){
            return (<div className={css.vbarDiv}>
                        <div className={css.progressDiv}>
                            <span className={css.vbarDivTextCredit}>{formatMessage(defaultMessages.outstandingBalance)}</span>
                            <span  className={css.vbarDivTextCreditBalance}>
                                <span className={css.vbarDivTextCreditCurrency}>{outstanding.currency}</span>
                                <span>{formatNumber(outstanding.value, decimalDigits)}</span>
                            </span>
                        </div>
                        <div className={css.progressDiv}>
                                <span className={css.vbarDivTextCredit}>{formatMessage(defaultMessages.totalPaid)}</span>
                                <span className={css.vbarDivTextCreditBalance}>
                                    <span className={css.vbarDivTextCreditCurrency}>{outstanding.currency}</span>
                                    <span>{formatNumber(totalAmount, decimalDigits)}</span>
                                </span>
                        </div>
                    </div>);
        }
        return (<div className="container-fluid">
            <div className="row">
                <div className="col-xs-6">
                    <div className={css.outstanding}>
                        <span className={css.outstandingCredit}>{formatMessage(defaultMessages.outstandingBalance)}</span>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className={css.paid}>
                        <span className={css.paidCredit}>{formatMessage(defaultMessages.totalPaid)}</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className={`col-xs-6 ${css.balances}`}>
                        <span className={css.outstandingBalance}>
                            <span className={css.currency}>{outstanding.currency}</span>
                            <span>{formatNumber(outstanding.value, decimalDigits)}</span>
                        </span>
                </div>
                <div className={`col-xs-6 ${css.balancesRight}`}>
                        <span className={css.outstandingBalance}>
                            <span className={css.currency}>{outstanding.currency}</span>
                            <span>{formatNumber(totalAmount, decimalDigits)}</span>
                        </span>
                </div>
            </div>
        </div>);
    }
    let cardDetailsData = [
        {
            "message": formatMessage(defaultMessages.monthlyInstallment),
            "amount": monthlyInstallmentValue.value,
            "dueDate": monthlyInstallmentDate.value,
            "currency":monthlyInstallmentValue.currency,
        },
        {
            "message": formatMessage(defaultMessages.installmentDue),
            "amount": installmentDueTodayValue.value,
            "dueDate": installmentDueTodayDate.value,
            "currency": installmentDueTodayValue.currency
        },
    ];
    const termLoan = currentAccount.type === "L";
    if (termLoan){
        cardDetailsData.push({
            "message": formatMessage(defaultMessages.payInAdvance),
            "amount": payInAdvance.value,
            "currency": payInAdvance.currency,
            "buttonText": formatMessage({id: "app.details.redraw"})
        });
    }

    const loanInformation = currentAccount.panelData || [];
    const cardsClass = classnames({
        "col-sm-6": !termLoan,
        "col-sm-4": termLoan
    });
    let periodTitle = <span>{formatMessage({"id":"app.details.lastNDays"}, {count: tableData.timeSpan || currentAccount.transactionPeriod})}<img src="m2u/static/icons/open_dropdown.svg"/></span>;
    function getData(){
        return accountTransactions && accountTransactions.transaction || [];
    }
    let cols = [
      {
        property: "date",
        header: {
          label: formatMessage({"id":"app.details.dateHeader"}).toUpperCase()
        },
        props:{
            className: "hidden-sm hidden-xs"
        }
      },
      {
        property: "description",
        header: {
          label: formatMessage({"id":"app.details.descriptionHeader"}).toUpperCase()
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
          label: formatMessage({"id":"app.details.amountHeader"}).toUpperCase()
        }
      }
    ];
    function togglePayRedrawModal(data){
        if (data.buttonText && data.buttonText.toUpperCase() === "REDRAW")
        {
            toggleRedrawLoan();
        } else {
            getAsyncLoanTransfer();
        }
    }
     function getFooter(){
        return  (
                    <div className={`row ${css.tableFooter}`}>
                        <div className={`col-xs-1 ${css.pullHeaderLeft}`}>
                            {
                                requestArray && requestArray.length >= 1 &&
                                <a className={css.back_arrow} onClick={getAsyncMoreAccTransactions.bind(this, {"reduce":true})}><img src="static/icons/next.svg"/></a>
                            }
                        </div>
                        <div className={`col-xs-10 ${css.pullHeaderLeft}`}>
                            <Button onClick={viewStatement} className="btn btn-default">{formatMessage({"id":"app.details.viewStatement"})}<img src="static/icons/document.svg"/></Button>
                        </div>
                        <div className={`col-xs-1 ${css.pullHeaderRight}`}>
                            {
                                reqInfo && reqInfo.showMore &&
                                <a className={css.next_arrow} onClick={getAsyncMoreAccTransactions}><img src="static/icons/next.svg"/></a>
                            }
                        </div>
                    </div>
                );
    }
    function getHeader(){
        return (<div>
                    <div className="hidden-lg col-xs-12">
                        <div className={`col-sm-6 col-xs-12 ${css.pullHeaderLeft}`}>
                            <h6>{formatMessage(defaultMessages.transactionHistory)}</h6>
                        </div>
                        <div className={`col-sm-6 col-xs-12 ${css.pullHeaderRight}`}>
                            <select className="form-control" onChange={(ev)=>getAsyncAccTransaction({value: ev.target.value, key: "timeSpan"})}>
                                <option value="30">
                                    {formatMessage({"id":"app.details.lastNDays"}, {count : 30})}
                                </option>
                                <option value="60">
                                    {formatMessage({"id":"app.details.lastNDays"}, {count : 60})}
                                </option>
                                <option value="90">
                                    {formatMessage({"id":"app.details.lastNDays"}, {count : 90})}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className={`row hidden-md hidden-sm hidden-xs ${css.selectWrapper}`}>
                        <div className={`col-xs-6 ${css.pullHeaderLeft}`}>
                            <h6>{formatMessage(defaultMessages.transactionHistory)}</h6>
                        </div>
                        <div className={`col-xs-6 ${css.pullHeaderRight}`}>
                            <DropdownButton id="total-card-dropdown" noCaret title={periodTitle}>
                                <MenuItem onClick={getAsyncAccTransaction.bind(this, {key: "timeSpan", value:30})}>
                                    {formatMessage({"id":"app.details.lastNDays"}, {count : 30})}
                                </MenuItem>
                                <MenuItem onClick={getAsyncAccTransaction.bind(this, {key: "timeSpan", value:60})}>
                                    {formatMessage({"id":"app.details.lastNDays"}, {count : 60})}
                                </MenuItem>
                                <MenuItem onClick={getAsyncAccTransaction.bind(this, {key: "timeSpan", value:90})}>
                                    {formatMessage({"id":"app.details.lastNDays"}, {count : 90})}
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
            "amount": <div className={amountClass}><span className={css.currency}>{row.amountCurrency}</span><span>{formatNumber(Math.abs(row.amount), decimalDigits)}</span>
                        {/*<span><div className={css.download}>{row.receiptUrl && <a onClick={handlePDFUrl.bind(this,row.receiptUrl)} ><img src="static/icons/download.svg"/></a> || ""}</div></span>*/}
                    </div>,
        };
    }
    const data = getData();
    const tableHeader = getHeader();
    const tableFooter = getFooter();
    const typesMap = {
        L: "Loans",
        N: "Personal",
        H: "Hire Purchase"
    };
    return (
        <div className={css.container}>
            <div className={css.dataSection}>
                <div className={`row ${css.accountInfo}`}>
                    <div className="col-xs-12" />
                    <div className="col-xs-12 col-sm-12">
                        <div className="row">
                            <div className="col-xs-10">
                                <span>{currentAccount.longName } </span>
                                <span> ({ _.capitalize(typesMap[currentAccount.type])})</span>
                                <span className={css.number}>{currentAccount.displayNumber}</span>
                            </div>
                            <div className="col-xs-1"/>
                            <div className="col-xs-1">
                                <div onClick={(ev)=>{ev.stopPropagation(); togglePopupMenu();}} className={css.moreIcon}>
                                    <img src="static/icons/show_more.svg"/>
                                </div>
                                {
                                    popupOpen &&
                                    <PopupMenuDropDown detailType={detailType} cardType={accountsInfo.dashboardType} togglePopupMenu={togglePopupMenu} termLoan={!!currentAccount.type === "L"} buttonActions={togglePayRedrawModal.bind(this,cardDetailsData[0])}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12" />
                </div>
                {
                   outstanding &&
                    <div className="row">
                        <div className="col-xs-12" />
                        <div className="col-xs-12 col-sm-12">
                            <div className={css.progressBar}>
                                <Panel>
                                    <ProgressBar now={progress} label={getLabel()}/>
                                </Panel>
                                <div className={css.lastUpdated}>
                                    <span>{formatMessage({id: "app.details.asOf"})}</span>
                                    <span>{lastUpdated}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12" />
                    </div>
                }
                <div className="row">
                    <div className="col-xs-12" />
                    <div className="col-xs-12 col-sm-12">
                        <LoanInfo loanInfo={loanInformation}/>
                    </div>
                    <div className="col-xs-12" />
                </div>
                <div className={`row ${css.tinyPanels}`}>
                    <div className="col-xs-12" />
                    <div className="col-xs-12 col-sm-12">
                        <div className={`row ${css.panelAdjustment}`}>
                        {
                            cardDetailsData.map((cardData, index)=>
                                <div className={cardsClass} key={index}>
                                    <CardDetails currency={cardData.currency} data={cardData} buttonAction={togglePayRedrawModal.bind(this,cardData)}/>
                                </div>
                            )
                        }
                        </div>
                    </div>
                    <div className="col-xs-12" />
                </div>
            </div>
            <div className={`row ${css.tableHolder}`}>
                <div className="col-xs-12" />
                <div className="col-xs-12 col-sm-12">
                    <div className={`${css.detailsTable}`}>
                        <AccountTable data={data} getRender={getRender} tableFooter={tableFooter} tableHeader={tableHeader} cols={cols}/>
                    </div>
                </div>
                <div className="col-xs-12" />
            </div>
        </div>
   );
};
LoanDetailsContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(LoanDetailsContainer);