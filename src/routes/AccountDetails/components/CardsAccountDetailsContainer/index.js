import React from "react";
import * as css from "./CardsAccountDetailsContainer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import AccountTable from "../../../../components/AccountTable";
import { OverlayTrigger, Tooltip, DropdownButton, MenuItem, Button } from "react-bootstrap";
import classnames from "classnames";
import CardDetails from "../CardDetails";
import EzyCash from "../EzyCash";
import AccountDetailsCard from "../AccountDetailsCard";
import AvailableBalanceCard from "../AvailableBalanceCard";
import PopupMenuDropDown from "../PopupMenuDropDown";
import _ from "lodash";
const defaultMessages = defineMessages({
    cardTransactions: {
        id: "app.details.cardTransactions",
        defaultMessage: "Card Transactions"
    },
    minimumPayment:{
        id: "app.details.minimumPayment",
        defaultMessage: "Minimum Payment "
    },
    statementBalance: {
        id: "app.details.statementBalance",
        defaultMessage: "Statement Balance"
    },
    ezycashFirstCardTitle:{
        id: "app.details.ezycashFirstCardTitle",
        defaultMessage: "EzyCash"
    },
    ezycashFirstCardMessage:{
        id: "app.details.ezycashFirstCardMessage",
        defaultMessage: "Need Extra Cash?"
    },
    ezycashSecondCardTitle:{
        id: "app.details.ezycashSecondCardTitle",
        defaultMessage: "EzyCash Plus"
    },
    ezycashSecondCardMessage:{
        id: "app.details.ezycashSecondCardMessage",
        defaultMessage: "Get Easy Installment Plan"
    },
    ezycashThirdCardTitle:{
        id: "app.details.ezycashThirdCardTitle",
        defaultMessage: "Balance Transfer"
    },
    ezycashThirdCardMessage:{
        id: "app.details.ezycashThirdCardMessage",
        defaultMessage: "Consolidate Your Outstanding Balances"
    }
});
export const CardsAccountDetailsContainer = ({ intl,
            getAsyncCardPaymentInfo,
            detailType,
            handlePDFUrl,
            tableData,
            asyncRefreshTablePeriod,
            accountDetails,
            getTableData,
            popupOpen,
            togglePopupMenu,
            toggleViewStatementPdf,
            viewStatementPdf,
            currentAccount,
            accountTransactions,
            accountsInfo,
            getAsyncAccTransaction,
            getAsyncMoreAccTransactions,
            requestArray}) => {
    const { formatMessage , formatNumber } = intl;
    const {reqInfo} = accountTransactions || {};
    const { outstanding, statementBalance, minimumPayment } = currentAccount.pageData || {};
    const currentTableInfo = {
        transactionType: tableData.transactionType || "allTransactions"
    };
    const cardSectionClasses = classnames({
        [css.chargeCard]: currentAccount.type === "R",
        "col-md-12": true,
        [css.availableBalanceSection]: true
    });
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
        let transactionTitle = <span>{formatMessage({ id: "app.details." + [currentTableInfo.transactionType]})}<img src="m2u/static/icons/open_dropdown.svg"/></span>;
    function getData(){
        return accountTransactions && accountTransactions.transaction || [];
    }
    function viewStatement(){
        toggleViewStatementPdf();
    }
    let cols = [
      {
        property: "date",
        header: {
          label: (formatMessage({ id: "app.details.dateHeader" })).toUpperCase()
        },
        props:{
            className: "hidden-sm hidden-xs"
        }
      },
      {
        property: "description",
        header: {
          label: (formatMessage({ id: "app.details.descriptionHeader" })).toUpperCase()
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
          label: (formatMessage({ id: "app.details.amountHeader" })).toUpperCase()
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
    function getFooter(){
        return  (
                    <div className={`row ${css.tableFooter}`}>
                        <div className={`col-xs-1 ${css.pullHeaderLeft}`}>
                            {
                                requestArray && requestArray.length >= 1 &&
                                <a className={css.back_arrow} onClick={getAsyncMoreAccTransactions.bind(this, {"reduce":true})}><img src="static/icons/next.svg"/></a>
                            }
                        </div>
                        <div className="col-xs-10">
                            <Button onClick={viewStatement} className="btn btn-default">{formatMessage({ id: "app.details.viewStatement" })}<img src="static/icons/document.svg"/></Button>
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
        const {transactionTypes} = currentAccount || [];
        return (<div>
                    <div className="hidden-md hidden-lg hidden-sm">
                        <div className={`col-sm-6 col-xs-12 ${css.pullHeaderLeft}`}>
                            <select className="form-control" onChange={(ev)=>getAsyncAccTransaction({value: ev.target.value, key: "transactionType"})}>
                                {
                                 transactionTypes && transactionTypes.map(name=>
                                        <option key={name} value={name}>
                                            {formatMessage({ id: "app.details." + name})}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className={`col-sm-6 col-xs-12 ${css.pullHeaderRight}`} />
                    </div>
                    <div className={`row hidden-xs ${css.selectWrapper}`}>
                        <div className={`col-xs-6 ${css.pullHeaderLeft}`}>
                            <DropdownButton id="total-card-dropdown" noCaret title={transactionTitle}>
                                {
                                  transactionTypes &&  transactionTypes.map(name=>
                                        <MenuItem key={`menuitem-${name}`} onClick={getAsyncAccTransaction.bind(this, {value: name, key: "transactionType"})}>
                                            {formatMessage({ id: "app.details." + name})}
                                        </MenuItem>
                                    )
                                }
                            </DropdownButton>
                        </div>
                        <div className={`col-xs-6 ${css.pullHeaderRight}`} />
                    </div>
                </div>);
    }
    function getRender(row, rowIndex) {
        const amountClass = classnames({
            [css.amounts]: true,
            [css.negativeAmount] : row.amount < 0
        });
        return {
            "date": <span>{row.transactionDate}</span>,
            "description": <span>{row.description}</span>,
            "details": <div>
                            <span>{row.description.mainContent}</span><br/>
                            <span className={css.detailDate}>{row.transactionDate}</span>
                        </div>,
            "amount":   <div className={amountClass}>
                            <span className={css.currency}>{row.amountCurrency}</span>
                            <span>{formatNumber(Math.abs(row.amount), decimalDigits)}</span>
                        </div>,
            "option":   <div>
                            {/**<div className={css.download}>
                                {row.receiptUrl &&
                                    <a onClick={handlePDFUrl.bind(this,row.receiptUrl)} >
                                        <img src="static/icons/download.svg"/>
                                    </a>
                                    ||
                                    ""
                                }
                                {row.ezyPayEligible &&
                                    <a>
                                        <img src="static/icons/add.svg"/>
                                    </a>
                                    ||
                                    ""
                                }
                            </div>**/}
                        </div>
        };
    }
    const data = getData();
    const tableHeader = getHeader();
    const tableFooter = getFooter();
    const {panelData} = currentAccount;
    const {lastUpdated, availableBalance, moneyIn, moneyOut} = currentAccount.pageData || {};
    const typesMap = {
        C: "Credit Card",
        R: "Charge Card",
        J: "Prepaid Card"
    };
    let cardsInfo = [
        {
            message: formatMessage(defaultMessages.minimumPayment),
            amount:minimumPayment && minimumPayment.value,
            currency:minimumPayment && minimumPayment.currency
        },
        {
            message: formatMessage(defaultMessages.statementBalance),
            amount: statementBalance && statementBalance.value,
            currency:statementBalance && statementBalance.currency
        },
        {
            message: formatMessage({id:"app.details.outstandingBalance"}),
            amount: outstanding && outstanding.value,
            currency:outstanding && outstanding.currency
        },
    ];
    if (currentAccount.type === "R"){
        cardsInfo = [
            {
                message: formatMessage({id:"app.details.outstandingBalance"}),
                amount: outstanding.value,
                currency:outstanding && outstanding.currency
            }
        ];
    }
    const cardsSectionClasses = classnames({
        "col-md-12": currentAccount.type === "R",
        "col-sm-4": currentAccount.type !== "R",
        "col-xs-12": currentAccount.type !== "R"
    });
    const ezyCashData = [
        {
            primarytext: formatMessage(defaultMessages.ezycashFirstCardTitle),
            secondaryText: formatMessage(defaultMessages.ezycashFirstCardMessage)
        },
        {
            primarytext: formatMessage(defaultMessages.ezycashSecondCardTitle),
            secondaryText: formatMessage(defaultMessages.ezycashSecondCardMessage)
        },
        {
            primarytext: formatMessage(defaultMessages.ezycashThirdCardTitle),
            secondaryText: formatMessage(defaultMessages.ezycashThirdCardMessage)
        }
    ];
    return (<div className={`row ${css.cardsAccountContainer}`}>
                <div className="row">
                    <div className="col-md-1"/>
                    <div className={`${css.section} col-sm-12`}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className={`col-md-12 ${css.accountInfo}`}>
                                        <div className={`col-xs-1 ${css.cardImage}`}>
                                            <img src="static/icons/manchester_united_visa_infinite.png"/>
                                        </div>
                                        <div className="col-xs-9">
                                            <span>{currentAccount.longName } </span>
                                            <span>({ _.capitalize(typesMap[currentAccount.type])})</span> <br/>
                                            <span className={css.number}>{currentAccount.displayNumber}</span>
                                        </div>
                                        <div className={`${css.hide} col-sm-1`}/>
                                        <div className="col-xs-1">
                                            <div onClick={(ev)=>{ev.stopPropagation(); togglePopupMenu();}} className={css.moreIcon}>
                                                <img src="static/icons/show_more.svg"/>
                                            </div>
                                            {
                                                 popupOpen &&
                                                <PopupMenuDropDown detailType={detailType} cardType={currentAccount.type} togglePopupMenu={togglePopupMenu}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                                { currentAccount.type === "J" &&
                                    <div className={`row ${css.tinyPanels}`}>
                                        <div className={`col-sm-4 col-xs-12 ${css.firstCard}`}>
                                            <AvailableBalanceCard currency={availableBalance.currency} availableBalance={availableBalance.value}  />
                                        </div>
                                        <div className={`col-sm-4 col-xs-12 ${css.secondCard}`}>
                                            <AvailableBalanceCard moneyIn={moneyIn.value} currency={moneyIn.currency}/>
                                        </div>
                                        <div className={`col-sm-4 col-xs-12 ${css.lastCard}`}>
                                            <AvailableBalanceCard moneyOut={moneyOut.value} currency={moneyOut.currency}/>
                                        </div>
                                    </div>
                                }
                                <div className={`${css.detailsCard} ${css.tinyPanels}`}>
                                    <AccountDetailsCard details={panelData}/>
                                </div>
                                { (currentAccount.type === "C" || currentAccount.type === "R") &&
                                    <div className="row">
                                        <div className={cardSectionClasses}>
                                            <div className={`row ${css.panelAdjustment}`}>
                                                {
                                                    cardsInfo.map((cardData,index)=>
                                                        <div key={index} className={cardsSectionClasses}>
                                                            <CardDetails  data={cardData} currency={cardData.currency} buttonAction={getAsyncCardPaymentInfo}/>
                                                        </div>
                                                        )
                                                }
                                            </div>
                                            <div className={`${css.tinyPanels} ${css.lastUpdated}`}>
                                                <span>{formatMessage({ id: "app.details.asOf" })}</span>
                                                <span>{lastUpdated}</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                                </div>
                        </div>
                    </div>
                    <div className="col-md-1"/>
                </div>
                <div className={`row ${css.tableHolder}`}>
                    <div className="col-sm-1" />
                    <div className={`${css.section} col-sm-10`}>
                        <div className={`${css.detailsTable}`}>
                            <AccountTable data={data} getRender={getRender} tableFooter={tableFooter} tableHeader={tableHeader} cols={cols}/>
                        </div>
                    </div>
                    <div className="col-sm-1" />
                </div>
                <div className="row">
                    <div>
                        {
                            <div className={`row ${css.ezyCashContainer} ${css.tinyPanels}`}>
                                {
                                    (currentAccount.type === "C") &&
                                    ezyCashData.map((info,index)=>
                                        <div key={index}>
                                            <EzyCash data={info}/>
                                        </div>
                                        )
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>);
};

CardsAccountDetailsContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(CardsAccountDetailsContainer);
