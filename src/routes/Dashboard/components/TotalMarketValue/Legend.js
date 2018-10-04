import React from "react";
import * as css from "./TotalMarketValue.scss";
import AssetAllocationCard from "../../../../components/AssetAllocationCard";
import { injectIntl, intlShape } from "react-intl";
export const Legend = ({
    intl,
    data,
    goToWealthDetails,
    path
}) => {
    const { formatNumber, formatMessage } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    function getData() {
        if (!data){
            return [];
        }
        return data.assetAllocation.map((el, index)=>{
            return {
                label: el.name === "Dual Currency Investment" && <span>{el.name}**</span> || el.name,
                value: el.name === "Dual Currency Investment" && <span> {formatNumber(el.amount, decimalDigits)}  <span className={css.bookValueText}>({formatMessage({id:"app.details.bookValue"})})</span></span> || formatNumber(el.amount, decimalDigits),
                color: el.allocationPercentage ? data.colorsList[index] : null ,
                percent: el.allocationPercentage,
                currency:data.currency
            };
        });
    }

    function getLegends() {
        return (
            <div>
                { getData().map((legend, index)=>{
                    return  (
                    <div key={index}>
                        <AssetAllocationCard goToWealthDetails={goToWealthDetails} path={path} data={legend}/>
                    </div>
                    );
                })}
            </div>
            );
    }


    return (
        <div>
            {getLegends()}
        </div>
   );
};
Legend.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Legend);