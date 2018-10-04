import React from "react";
import * as css from "./AvailableBalanceCard.scss";
import { Panel } from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
const defaultMessages = defineMessages({
    availableBalance:{
        id: "app.details.availableBalance",
        defaultMessage: "AVAILABLE BALANCE "
    },
    moneyIn: {
        id: "app.details.moneyIn",
        defaultMessage: "MONEY IN"
    },
    moneyOut: {
        id: "app.dashboard.moneyOut",
        defaultMessage: "MONEY OUT"
    }
});
const AvailableBalanceCard = ({intl, currency, availableBalance, moneyIn, moneyOut}) => {
    const innerPanelClasses = classnames({
        [css.innerPanel]: true,
        [css.moneyIn]: moneyIn,
        [css.moneyOut]: moneyOut,
    });
    const { formatMessage, formatNumber } = intl;
    let panelText = {};
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    if (!availableBalance){
        panelText = {
            text: moneyIn ? formatMessage(defaultMessages.moneyIn) : formatMessage(defaultMessages.moneyOut),
            amount: moneyIn ? formatNumber(moneyIn,decimalDigits) : formatNumber(moneyOut,decimalDigits)
        };
    }
    return (
        <div className={css.container}>
            <Panel>
                <div className={innerPanelClasses}>
                    {
                        !availableBalance &&
                        <Panel>
                            <div>
                                <p className={css.text}>{panelText.text}*</p>
                                <p className={css.balance}><span className={css.currency}>{currency}</span>{panelText.amount}</p>
                            </div>
                        </Panel>
                        ||
                        <div className={css.availableBalance}>
                            <p className={css.text}>{formatMessage(defaultMessages.availableBalance)}*</p>
                            <p className={css.balance}><span className={css.currency}>{currency}</span>{formatNumber(availableBalance, decimalDigits)}</p>
                        </div>
                    }
                </div>
            </Panel>
        </div>
   );
};
AvailableBalanceCard.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(AvailableBalanceCard);