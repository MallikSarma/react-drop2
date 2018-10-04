import React from "react";
import * as css from "./TotalSpending.scss";
import { injectIntl, intlShape } from "react-intl";
export const Legend = ({
    intl,
    data,
    colors,
    currency,
    totalSpendingInfo
}) => {
    const { formatNumber } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    function getData() {
        if (!data){
            return [];
        }
         const dataForProcessing = data[totalSpendingInfo.month] || data[Object.keys(data)[0]];
        return dataForProcessing.details.map((el, index)=>{
            return {
                label: el.label,
                value: el.amount,
                color: colors[index],
                percent: Math.round(el.amount * 100 / data["Jan 2016"].total)
            };
        });
    }

    function getLegends() {
        return (
            <div className="container-fluid">
                { getData().map((legend, index)=>{
                    return  (
                    <div className="row" key={index}>
                        <div className="col-xs-4">
                            <div style={{borderColor:legend.color}} className={`${css[ "legend-wrapper"]}`}>
                                <span>{legend.percent}%</span>
                            </div>
                        </div>
                        <div className="col-xs-5">
                            <div className={`${css[ "legend-label-wrapper"]}`}>
                                <span>{legend.label}</span>
                            </div>
                        </div>
                        <div className="col-xs-3">
                            <div className={`${css[ "amount-wrapper"]}`}>
                                <span>{currency}</span>
                                <span>{formatNumber(legend.value, decimalDigits)}</span>
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
            );
    }


    return (
        <div className={css["full-legend-container"]}>
            {getLegends()}
        </div>
   );
};
Legend.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Legend);