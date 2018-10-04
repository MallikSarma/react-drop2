import React from "react";
import * as css from "./WealthDetailsCard.scss";
import { Panel } from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
const defaultMessages = defineMessages({
    marketValue: {
        id: "app.details.marketValue",
        defaultMessage: "Market Value"
    },
    bookValue: {
        id: "app.details.bookValue",
        defaultMessage: "Book Value"
    },
    unrealisedGainLoss: {
        id: "app.details.unrealisedGainLoss",
        defaultMessage: "Unrealized Gain/Loss"
    }

});
export const WealthDetailsCard = ({intl, shareAccountsDetails, currency}) => {
    const {formatMessage, formatNumber} = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    const investmentOverview = shareAccountsDetails.investmentOverview || {};
    const unrealizedGainsLoss = investmentOverview.unrealizedGainsLoss || {};
    const unrealizedGainLossPecntClasses = classnames({
        [css.positivePercentage]: true,
        [css.negativePercentage]: unrealizedGainsLoss.percentage < 0,
    });
    return (
        <div className={` ${css.container}`}>
            <Panel>
                <div className={css.row}>
                    <span>{formatMessage(defaultMessages.marketValue)}</span>
                    <div>
                        <span className={css.currency}>{shareAccountsDetails.currency}</span>
                        <span>{formatNumber(investmentOverview.marketValue,decimalDigits)}</span>
                    </div>
                </div>
                <div className={css.row}>
                    <span>{formatMessage(defaultMessages.bookValue)}</span>
                    <div>
                        <span className={css.currency}>{shareAccountsDetails.currency}</span>
                        <span>{formatNumber(investmentOverview.bookValue, decimalDigits)}</span>
                    </div>
                </div>
                <div className={css.row}>
                    <span className={css.unrealisedGainLossText}>{formatMessage(defaultMessages.unrealisedGainLoss)}</span>
                    <div>
                        <span className={css.currency}>+ {shareAccountsDetails.currency}</span>
                        <span>{formatNumber(unrealizedGainsLoss.amount,decimalDigits)} </span>
                        <span className={unrealizedGainLossPecntClasses}>
                            <span>
                            <div/>
                                {formatNumber(unrealizedGainsLoss.percentage,decimalDigits)}%
                            </span>
                        </span>
                    </div>
                </div>
            </Panel>
            <div className="row">
                <div className={`col-xs-12 ${css.lastUpdated}`}>
                    <span>{formatMessage({id:"app.details.asOf"})} {shareAccountsDetails.lastUpdated}</span>
                </div>
            </div>
        </div>
   );
};
WealthDetailsCard.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(WealthDetailsCard);