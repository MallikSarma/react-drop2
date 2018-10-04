import React from "react";
import * as css from "./UnitTrustDetailsCard.scss";
import { Panel } from "react-bootstrap";
import { injectIntl, intlShape } from "react-intl";
import classnames from "classnames";
export const UnitTrustDetailsCard = ({intl, shareAccountsDetails, currency}) => {
    const {formatMessage, formatNumber} = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    const investmentOverview = shareAccountsDetails.investmentOverview || {};
    const unrealizedGainLossPecntClasses = classnames({
        [css.positivePercentage]: true,
        [css.negativePercentage]: investmentOverview.unrealizedGainsLoss.percentage < 0,
    });

    const marketValueClasses = classnames({
        [css.positiveAmount]: true,
        [css.negativeAmount]: investmentOverview.marketValue < 0,
    });
    return (
        <div className={` ${css.container}`}>
            <Panel>
                <div className={css.row}>
                    <span>{formatMessage({id: "app.details.marketValue"})}</span>
                    <div>
                        <span className={marketValueClasses}>
                            <span className={css.currency}>{shareAccountsDetails.currency}</span>
                            <span> {formatNumber(investmentOverview.marketValue,decimalDigits)}* </span>
                        </span>
                    </div>
                </div>
                <div className={css.row}>
                    <span>{formatMessage({id: "app.details.bookValue"})}</span>
                    <div>
                        <span className={css.currency}>{shareAccountsDetails.currency}</span>
                        <span>{formatNumber(investmentOverview.bookValue, decimalDigits)}</span>
                    </div>
                </div>
                <div className={css.row}>
                    <span className={css.unrealisedGainLossText}>{formatMessage({id: "app.details.unrealisedGainLoss"})}</span>
                    <div>
                        <span className={css.currency}>+ {shareAccountsDetails.currency}</span>
                        <span>{formatNumber(investmentOverview.unrealizedGainsLoss.amount,decimalDigits)} </span>
                        <span className={unrealizedGainLossPecntClasses}>
                            <span>
                            <div/>
                                {formatNumber(investmentOverview.unrealizedGainsLoss.percentage,decimalDigits)}%
                            </span>
                        </span>
                    </div>
                </div>
                <div className={css.row}>
                    <span>{formatMessage({id:"app.details.totalUnitsHeader"})} </span>
                    <div>
                        <span className={css.currency}>{shareAccountsDetails.currency}</span>
                        <span>{formatNumber(investmentOverview.totalUnits, decimalDigits)}</span>
                    </div>
                </div>
            </Panel>
            <div className="row">
                <div className={`col-xs-12 ${css.lastUpdated}`}>
                    <span>*{formatMessage({id:"app.details.asOf"})} {shareAccountsDetails.lastUpdated}</span>
                </div>
            </div>
        </div>
   );
};
UnitTrustDetailsCard.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(UnitTrustDetailsCard);