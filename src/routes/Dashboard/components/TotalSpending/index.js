import React from "react";
import {Doughnut} from "react-chartjs";
import { DropdownButton  } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import * as css from "./TotalSpending.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    totalSpent: {
        id: "app.dashboard.totalSpent",
        defaultMessage: "TOTAL SPENT",
    }
});
export const TotalSpending = ({
    intl,
    colors,
    data,
    currency,
    updateTotalSpendingInfo,
    totalSpendingInfo,
}) => {
    const { formatMessage, formatNumber } = intl;
    const options = {
            percentageInnerCutout : 85,
            showTooltips: false
    };
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
                color: colors[index]
            };
        });
    }
    const dataForRender = getData();
    function updateMonthInfo(value) {
        updateTotalSpendingInfo({
            month: value
        });
    }
    const monthTotal = totalSpendingInfo.month ?
        formatNumber(data[totalSpendingInfo.month].total, decimalDigits) :
        formatNumber(data[Object.keys(data)[0]].total, decimalDigits);
    const dropdownSelection = totalSpendingInfo.month || Object.keys(data)[0];
    return (
        <div className={`row ${css[ "total-spending-container"]}`}>
            <div className="col-md-12">
                <div className={`row ${css[ "doughnut-content-wrapper"]}`}>
                    <Doughnut data={dataForRender} options={options} width="271" height="271"/>
                    <div className={`${css[ "doughnut-inner-content"]}`}>
                        <h6>{formatMessage(defaultMessages.totalSpent)}</h6>
                        <span>{currency}</span><span>{monthTotal}</span>
                        <div className="hidden-xs">
                            <DropdownButton id="total-card-dropdown" noCaret title={<span className={css.dropdowntitle}>{dropdownSelection}<img src="m2u/static/icons/open_dropdown.svg"/></span>}>
                            {
                                Object.keys(data).map((month, index)=>
                                    <MenuItem key={index} onClick={()=>{updateMonthInfo(month);}}>
                                        {month}
                                    </MenuItem>
                                )
                            }
                            </DropdownButton>
                        </div>
                        <div className="hidden-lg hidden-md hidden-sm">
                            <select className="form-control" onChange={updateMonthInfo} value={dropdownSelection}>
                            {
                                Object.keys(data).map(month=>
                                    <option key={month} value={month}>{month}</option>
                                )
                            }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   );
};
TotalSpending.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(TotalSpending);