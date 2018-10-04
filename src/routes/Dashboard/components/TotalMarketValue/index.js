import React from "react";
import {Doughnut} from "react-chartjs";
import * as css from "./TotalMarketValue.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
const defaultMessages = defineMessages({
    totalMarketValue: {
        id: "app.dashboard.totalMarketValue",
        defaultMessage: "TOTAL MARKET VALUE",
    },
    totalBookValue: {
        id: "app.dashboard.totalBookValue",
        defaultMessage: "TOTAL BOOK VALUE",
    },
    unrealizedGainsOrLoss: {
        id: "app.dashboard.unrealizedGainsOrLoss",
        defaultMessage: "UNREALIZED GAINS / LOSS",
    },
    bookValue: {
        id: "app.dashboard.bookValue",
        defaultMessage: "BOOK VALUE",
    },
    totalMarketValueDoesNot: {
        id: "app.dashboard.totalMarketValueDoesNot",
        defaultMessage: "Total Market Value does not include DCI",
    }

});
export const TotalMarketValue = ({
    intl,
    data
}) => {
    const { formatMessage, formatNumber } = intl;
    const unrealizedgainsLossClasses = classnames({
        [css.unrealizedGainLoss]: true,
        [css.negativeAmount] : data.unrealisedGainsLoss.amount < 0
    });
    const unrealizedPercentageClasses = classnames({
        [css.unrealizedPercentages]: true,
        [css.negativePercentage] : data.unrealisedGainsLoss.percentage < 0
    });
    const options = {
            percentageInnerCutout : 85,
            showTooltips: false
    };
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    function getData() {
        if (!data){
            return [];
        }
        return data.assetAllocation.map((el, index)=>{
            return {
                label: el.name,
                value: el.amount,
                color: data.colorsList[index]
            };
        });
    }
    const dataForRender = getData();
    return (
        <div className={`row ${css[ "total-spending-container"]}`}>
            <div className="col-xs-12">
                <div className={`row ${css[ "doughnut-content-wrapper"]}`}>
                    <Doughnut data={dataForRender} options={options} width="271" height="271"/>
                    <div className={`${css[ "doughnut-inner-content"]}`}>
                        <h6>{formatMessage(defaultMessages.totalMarketValue)}</h6>
                        <p><span>{data.currency}</span><span>{formatNumber(data.totalMarketValue, decimalDigits)}</span></p>
                        <h4>{formatMessage(defaultMessages.totalBookValue)}</h4>
                        <p><span>{data.currency}</span><span>{formatNumber(data.bookValue, decimalDigits)}</span></p>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-xs-12 ${css.graphSubHeading}`}>
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-12">
                                    <span className={css.date}>{formatMessage({id: "app.details.asOf"})} {data.lastUpdate}</span>
                                    <span className={css.date}>{formatMessage(defaultMessages.totalMarketValueDoesNot)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   );
};
TotalMarketValue.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(TotalMarketValue);