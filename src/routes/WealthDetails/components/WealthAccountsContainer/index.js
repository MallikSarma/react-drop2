import React from "react";
import * as css from "./WealthAccountsContainer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import WealthDetailsCard from "../WealthDetailsCard";
import WealthInsightsCard from "../WealthInsightsCard";
import AssetAllocationCard from "../../../../components/AssetAllocationCard";
import AccountTable from "../../../../components/AccountTable";
import classnames from "classnames";
import {Button } from "react-bootstrap";
const defaultMessages = defineMessages({
    tradeNow: {
        id: "app.details.tradeNow",
        defaultMessage: "Trade Now"
    },
    stockCodeHeader: {
        id: "app.details.stockCodeHeader",
        defaultMessage: "Stock Code"
    },
    stockNameHeader: {
        id: "app.details.stockNameHeader",
        defaultMessage: "Stock Name"
    },
    lastClosingHeader: {
        id: "app.details.lastClosingHeader",
        defaultMessage: "Last Closing"
    },
    lastHighHeader: {
        id: "app.details.lastHighHeader",
        defaultMessage: "Last High"
    },
    lastLowHeader: {
        id: "app.details.lastLowHeader",
        defaultMessage: "Last Low"
    },
    lastVolumeTransactedHeader: {
        id: "app.details.lastVolumeTransactedHeader",
        defaultMessage: "Last Volume Transacted"
    },
    totalUnitsHeader: {
        id: "app.details.totalUnitsHeader",
        defaultMessage: "Total Units"
    },
    avarageBuyPriceHeader: {
        id: "app.details.avarageBuyPriceHeader",
        defaultMessage: "Avg. Buy Price"
    },
    unrealizedGainsLossHeader: {
        id: "app.details.unrealizedGainsLossHeader",
        defaultMessage: "Unrealized Gains / Loss"
    },
    maybankMarketInsights: {
        id: "app.details.maybankMarketInsights",
        defaultMessage: "Maybank Market Insights"
    },
    showMore: {
        id: "app.details.showMore",
        defaultMessage: "SHOW MORE",
    },
    showLess: {
        id: "app.details.showLess",
        defaultMessage: "SHOW LESS",
    }
});
export const WealthAccountsContainer = ({
        intl,
        wealthDetails,
        getShareAccountsData,
        shareAccountsDetails,
        updateTableRecords,
        tableData,
        intNumOfDisplayedWealths,
        toggleDisplayedWealths
}) => {
    const { formatMessage , formatNumber } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    function handleUpdate(key,value) {
        getShareAccountsData({
            key,
            value
        });
    }
    function getShareAccounts(){
        const list = wealthDetails.accounts.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj.accountNumber}</span>
                            </div>,
                   "mobileDisplay": obj.accountNumber,
                   "valueToPass": obj
                };
        });
        const currentTitle = shareAccountsDetails ? shareAccountsDetails.accountNumber : wealthDetails.accounts[0].accountNumber;
        return {
            id: "share_accounts_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{handleUpdate("shareAccountsDetails", obj);},
            list
        };
    }
    function getData(){
        return shareAccountsDetails.stocks;
    }
    let cols = [
      {
        property: "stockCode",
        header: {
          label: formatMessage(defaultMessages.stockCodeHeader).toUpperCase()
        },
        props:{
            className: `hidden-xs ${css.stockCode}`
        }
      },
      {
        property: "stockName",
        header: {
          label: formatMessage(defaultMessages.stockNameHeader).toUpperCase()
        },
        props:{
            className: css.stockName
        }
      },
      {
        property: "lastClosing",
        header: {
          label: formatMessage(defaultMessages.lastClosingHeader).toUpperCase()
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "lastHigh",
        header: {
          label: formatMessage(defaultMessages.lastHighHeader).toUpperCase()
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "lastLow",
        header: {
          label: formatMessage(defaultMessages.lastLowHeader).toUpperCase()
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "lastVolumeTransacted",
        header: {
          label: formatMessage(defaultMessages.lastVolumeTransactedHeader).toUpperCase()
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "totalUnits",
        header: {
          label: formatMessage(defaultMessages.totalUnitsHeader).toUpperCase()
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "averageBuyPrice",
        header: {
          label: formatMessage(defaultMessages.avarageBuyPriceHeader).toUpperCase()
        }
      },
      {
        property: "unrealizedGainsLoss",
        header: {
          label: formatMessage(defaultMessages.unrealizedGainsLossHeader).toUpperCase()
        }
      }

    ];
    function toggleTableRecords(nextRecords) {
        if (nextRecords){
            updateTableRecords(tableData.tableStartIndex + 10);
        } else {
            updateTableRecords(tableData.tableStartIndex - 10);
        }
    }
    function getFooter(){
        return  (
                    <div className={`row ${css.tableFooter}`}>
                        <div className={`col-xs-1 ${css.pullHeaderLeft}`}>
                            {
                                tableData.tableStartIndex > 0 &&
                                <a className={css.back_arrow} onClick={toggleTableRecords.bind(this, false)}><img src="static/icons/next.svg"/></a>
                            }
                        </div>
                        <div className="col-xs-10"/>
                        <div className={`col-xs-1 ${css.pullHeaderRight}`}>
                            {
                                tableData.tableStartIndex + 10 < getData().length &&
                                <a className={css.next_arrow} onClick={toggleTableRecords.bind(this, true)}><img src="static/icons/next.svg"/></a>
                            }
                        </div>
                    </div>
                );
    }
    function getRender(row, rowIndex) {
        const unrealizedGainsLossClasses = classnames({
            [css.positiveNumber]: true,
            [css.negativeNumber]: row.unrealizedGainsLoss < 0,
        });
        return {
            "stockCode": <span>{row.stockCode}</span>,
            "stockName": <span className={css.stockName}>{(row.stockName).toUpperCase()}</span>,
            "lastClosing": <span>{formatNumber(row.lastClosing, decimalDigits)}</span>,
            "lastHigh": <span>{formatNumber(row.lastHigh, decimalDigits)}</span>,
            "lastLow": <span>{formatNumber(row.lastLow, decimalDigits)}</span>,
            "lastVolumeTransacted": <span>{formatNumber(row.lastVolumeTransacted, decimalDigits)}</span>,
            "totalUnits": <span>{formatNumber(row.totalUnits, decimalDigits)}</span>,
            "averageBuyPrice": <span>{formatNumber(row.avarageBuyPrice, decimalDigits)}</span>,
            "unrealizedGainsLoss" : <span className={unrealizedGainsLossClasses}>{formatNumber(row.unrealizedGainsLoss, decimalDigits)}</span>
        };
    }
    const data = getData().slice(tableData.tableStartIndex, tableData.tableStartIndex + 10);
    const tableFooter = getFooter();
    const {maybankMarketInsights} = wealthDetails;
    function getCards(){
        if (!maybankMarketInsights) {
            return;
        }
        let intShowItem = Math.min(...[maybankMarketInsights.length, intNumOfDisplayedWealths]);
        let noOfRows = Math.round(intShowItem / 2);
        return Array.apply(null, Array(noOfRows)).map((row, index)=>{
            return (
                <div className="row" key={index}>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12" />
                    <div className={`col-lg-5 col-md-5 col-sm-5 col-xs-12 ${css.odd}`}>
                        <WealthInsightsCard data={maybankMarketInsights[2 * index]}/>
                    </div>
                    <div className={`col-lg-5 col-md-5 col-sm-5 col-xs-12 ${css.even}`}>
                    { maybankMarketInsights[2 * index + 1] &&
                        <WealthInsightsCard data={maybankMarketInsights [2 * index + 1]}/>
                    }
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12" />
                </div>
            );
        });
    }
    function getToggleShowButton(){
        if (!maybankMarketInsights || maybankMarketInsights.length <= 6) {
            return;
        } else {
            return (
                <div className={`row ${css.more}`}>
                    <div className="col-sm-1" />
                    <div className="col-sm-3 col-xs-3">
                        <hr/>
                    </div>
                    <div className="col-xs-6 col-sm-4">
                        {
                            maybankMarketInsights.length > intNumOfDisplayedWealths &&
                            <button onClick={()=>toggleDisplayedWealths()}>{formatMessage(defaultMessages.showMore)}</button>
                        }
                        {
                            maybankMarketInsights.length <= intNumOfDisplayedWealths &&
                            <button onClick={()=>toggleDisplayedWealths(6)}>{formatMessage(defaultMessages.showLess)}</button>
                        }
                    </div>
                    <div className="col-sm-3 col-xs-3">
                        <hr/>
                    </div>
                    <div className="col-sm-1" />
                </div>
            );
        }
    }
    function getAssertAllocationData() {
        if (!wealthDetails){
            return [];
        }
        return wealthDetails.assetAllocation.map((el, index)=>{
            return {
                label: el.name === "Dual Currency Investment" && <span>{el.name}**</span> || el.name,
                value: el.name === "Dual Currency Investment" && <span> {formatNumber(el.amount, decimalDigits)}  <span className={css.bookValueText}>({formatMessage({id:"app.details.bookValue"})})</span></span> || formatNumber(el.amount, decimalDigits),
                color: el.allocationPercentage ? wealthDetails.colorsList[index] : null ,
                percent: el.allocationPercentage,
                currency:wealthDetails.currency
            };
        });
    }
    function getAssetAllocationCards(){
        if (!getAssertAllocationData()) {
            return;
        }
        let noOfRows = Math.round(getAssertAllocationData().length / 2);
        return Array.apply(null, Array(noOfRows)).map((row, index)=>{
            return (
                <div className="row" key={index}>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12" />
                    <div className={`col-lg-5 col-md-5 col-sm-5 col-xs-12 ${css.odd}`}>
                        <AssetAllocationCard data={getAssertAllocationData()[2 * index]}/>
                    </div>
                    <div className={`col-lg-5 col-md-5 col-sm-5 col-xs-12 ${css.even}`}>
                    { getAssertAllocationData()[2 * index + 1] &&
                        <AssetAllocationCard data={getAssertAllocationData()[2 * index + 1]}/>
                    }
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12" />
                </div>
            );
        });
    }
    return (<div className={` row ${css.savingAccountContainer}`}>
                <div className="col-lg-1 col-md-1 col-sm-1"/>
                <div className="col-sm-10 col-md-10">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={`row ${css.accountInfo}`}>
                                <div className={`col-xs-12 col-sm-5  col-md-6 ${css.accountName}`}>
                                    <span>{wealthDetails.name}</span>
                                </div>
                                <div className={`col-xs-3 col-sm-4 col-md-3 hidden-xs  ${css.selectWrapper}`}>
                                    <RenderDesktopDropdown data={getShareAccounts()} containerClass={css.containerClass}/>
                                </div>
                                <div className="col-xs-12  hidden-lg hidden-sm hidden-md">
                                    <RenderMobileDropdown data={getShareAccounts()} containerClass={css.containerClass}/>
                                </div>
                                <div className="col-xs-12 col-sm-3 hidden-xs">
                                    <Button className="btn btn-success">{formatMessage(defaultMessages.tradeNow).toUpperCase()}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <WealthDetailsCard shareAccountsDetails={shareAccountsDetails}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1"/>
                <div className="col-xs-12">
                    <div className={`row ${css.tableHolder}`}>
                        <div className="col-xs-12 col-sm-1" />
                        <div className="col-xs-12 col-sm-10">
                            <div className={`${css.detailsTable}`}>
                                <AccountTable data={data} getRender={getRender} tableFooter={tableFooter} cols={cols}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-1" />
                    </div>
                    <div className={`row ${css.cardsHeader}`}>
                        <div className="col-sm-1"/>
                        <div className="col-sm-10">
                            <h4>{formatMessage(defaultMessages.maybankMarketInsights).toUpperCase()}</h4>
                        </div>
                        <div className="col-sm-1"/>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {getCards()}
                        </div>
                    </div>
                    {getToggleShowButton()}
                    <div className="row">
                        <div className="col-md-12">
                            {getAssetAllocationCards()}
                        </div>
                    </div>
                </div>
            </div>);
};

WealthAccountsContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(WealthAccountsContainer);
