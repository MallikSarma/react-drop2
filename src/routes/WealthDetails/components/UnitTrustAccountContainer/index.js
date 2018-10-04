import React from "react";
import * as css from "./UnitTrustContainer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import WealthDetailsCard from "../WealthDetailsCard";
import UnitTrustDetailsCard from "../UnitTrustDetailsCard";
import WealthInsightsCard from "../WealthInsightsCard";
import AssetAllocationCard from "../../../../components/AssetAllocationCard";
import AccountTable from "../../../../components/AccountTable";
import classnames from "classnames";
import {Button } from "react-bootstrap";
const defaultMessages = defineMessages({
     subscribeFund: {
        id: "app.details.subscribeFund",
        defaultMessage: "SUBSCRIBE FUND"
    },
    fundNameHeader: {
        id: "app.details.fundName",
        defaultMessage: "FUND NAME"
    },
    currencyHeader: {
        id: "app.details.currencyHeader",
        defaultMessage: "CURRENCY"
    },
    unitHeld: {
        id: "app.details.unitHeld",
        defaultMessage: "UNIT HELD"
    },
    currentValue: {
        id: "app.details.currentValue",
        defaultMessage: "CURRENT VALUE"
    },
    lastClosing: {
        id: "app.details.lastClosing",
        defaultMessage: "LAST CLOSING"
    },
    fcy: {
        id: "app.details.fcy",
        defaultMessage: "FCY"
    },
    lcy: {
        id: "app.details.lcy",
        defaultMessage: "LCY"
    },
    profit: {
        id: "app.details.profit",
        defaultMessage: "PROFIT"
    },
    rm: {
        id: "app.details.rm",
        defaultMessage: "RM"
    },
    lastValuedDate: {
        id: "app.details.lastValuedDate",
        defaultMessage: "LAST VALUED DATE"
    }
});

export const UnitTrustAccountContainer = ({
        intl,
        wealthDetails,
        getShareAccountsData,
        shareAccountsDetails,
        shareFundDetails,
        updateTableRecords,
        tableData,
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
    function getUnitTrustAccounts(){
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
            id: "item_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{handleUpdate("shareAccountsDetails", obj);},
            list
        };
    }
    function getFundHouses(){
        const list = wealthDetails.fundHouse.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj.fundHouseName}</span>
                            </div>,
                   "mobileDisplay": obj.fundHouseName,
                   "valueToPass": obj
                };
        });
        const currentTitle = shareFundDetails ? shareFundDetails.fundHouseName : wealthDetails.fundHouse[0].fundHouseName;
        return {
            id: "item_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{handleUpdate("shareFundDetails", obj);},
            list
        };
    }


    function getInvestmentTypes() {
        const testing = ["One time subscription","Regular savings plan"];
        const list = testing.map((obj,index)=>{
                return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj}</span>
                            </div>,
                   "mobileDisplay": obj,
                   "valueToPass": obj
                };
        });
        const currentTitle = !!wealthDetails.invest && list.find((obj)=>obj.valueToPass === wealthDetails.invest) || list[0];
        return {
            id: "recurrence_frequency_dropdown",
            title: <div className={css.selectedItem}>
                                <span>{currentTitle.valueToPass}</span>
                            </div>,
            action: (obj)=>{getInputData({key:"invest",value:obj});},
            list
        };
    }


    function getData(){
        return shareFundDetails.funds;
    }
    let cols = [
      {
        property: "fundName",
        header: {
          label: formatMessage(defaultMessages.fundNameHeader).toUpperCase()
        },
        props:{
            className: css.fundName
        }
      },
      {
        property: "unitHeld",
        header: {
          label: formatMessage(defaultMessages.unitHeld).toUpperCase()
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "currency",
        header: {
          label:  formatMessage(defaultMessages.currencyHeader).toUpperCase()
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "lastClosing",
        header: {
          label: formatMessage(defaultMessages.lastClosing).toUpperCase()
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "currentValueFcy",
        header: {
          label: formatMessage(defaultMessages.currentValue).toUpperCase() + (" (") + formatMessage(defaultMessages.fcy).toUpperCase() + (")")
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "currentValueLcy",
        header: {
          label: formatMessage(defaultMessages.currentValue).toUpperCase() + (" (") + formatMessage(defaultMessages.lcy).toUpperCase() + (")")
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "profit",
        header: {
          label: formatMessage(defaultMessages.profit).toUpperCase() + (" (") + formatMessage(defaultMessages.rm).toUpperCase() + (")")
        },
        props:{
            className: "hidden-xs"
        }
      },
      {
        property: "lastValuedDate",
        header: {
          label: formatMessage(defaultMessages.lastValuedDate).toUpperCase()
        }
      },
      {
        property: "showMore",
        header: {
          label: ""
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
        return {
            "fundName": <span>{row.fundName}</span>,
            "unitHeld": <span>{formatNumber(row.unitHeld, decimalDigits)}</span>,
            "currency": <span>{row.currency}</span>,
            "lastClosing": <span>{formatNumber(row.lastClosing, decimalDigits)}</span>,
            "currentValueFcy": <span>{formatNumber(row.currentValueFcy, decimalDigits)}</span>,
            "currentValueLcy": <span>{formatNumber(row.currentValueLcy, decimalDigits)}</span>,
            "profit": <span>{formatNumber(row.profit, decimalDigits)} </span>,
            "lastValuedDate": <span>{row.lastValuedDate}</span>,
            "showMore": <span> <img src="static/icons/show_more.svg"/></span>
        };
    }
    const data = getData().slice(tableData.tableStartIndex, tableData.tableStartIndex + 10);
    const tableFooter = getFooter();

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
                                <div className={`col-xs-12 col-sm-6  col-md-6 ${css.accountName}`}>
                                    <span>{"Unit Trust"}</span>
                                </div>
                                <div className={`col-xs-3 col-sm-3 col-md-3 hidden-xs  ${css.selectWrapper}`}>
                                    <RenderDesktopDropdown data={getUnitTrustAccounts()} containerClass={css.containerClass}/>
                                </div>
                                <div className="col-xs-12  hidden-lg hidden-sm hidden-md">
                                    <RenderMobileDropdown data={getUnitTrustAccounts()} containerClass={css.containerClass}/>
                                </div>
                                <div className="col-xs-12 col-sm-3 col-md-3">
                                    <Button className="btn btn-success">{formatMessage(defaultMessages.subscribeFund).toUpperCase()}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <UnitTrustDetailsCard wealthDetails={wealthDetails} shareAccountsDetails={shareAccountsDetails}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1"/>
                <div className="col-xs-12">
                    <div className={`row ${css.tableHolder}`}>
                        <div className={`col-xs-12 col-sm-1 ${css.pushRowTopButton}`} />
                        <div className={`col-sm-3 col-md-3 hidden-xs  ${css.selectWrapper}`}>
                            <RenderDesktopDropdown data={getFundHouses()} containerClass={css.containerClass}/>
                        </div>
                        <div className="col-xs-12  hidden-lg hidden-sm hidden-md">
                            <RenderMobileDropdown data={getFundHouses()} containerClass={css.containerClass}/>
                        </div>
                        <div className="col-xs-12 col-sm-4" />
                        <div className={`col-sm-3 col-md-3 hidden-xs  ${css.selectWrapper}`}>
                            <RenderDesktopDropdown data={getInvestmentTypes()} containerClass={css.containerClass}/>
                        </div>
                        <div className="col-xs-12  hidden-lg hidden-sm hidden-md">
                            <RenderMobileDropdown data={getInvestmentTypes()} containerClass={css.containerClass}/>
                        </div>
                         <div className="col-xs-12 col-sm-1" />
                    </div>
                    <div className={`row ${css.tableHolder}`}>
                        <div className="col-xs-12 col-sm-1" />
                        <div className="col-xs-12 col-sm-10">
                            <div className={`${css.detailsTable}`}>
                                <AccountTable data={data} getRender={getRender} tableFooter={tableFooter} cols={cols}/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-1" />
                    </div>
                    <div className={`row ${css.pushRowTop}`}>
                        <div className="col-md-12">
                            {getAssetAllocationCards()}
                        </div>
                    </div>
                </div>
            </div>);
};

UnitTrustAccountContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(UnitTrustAccountContainer);
