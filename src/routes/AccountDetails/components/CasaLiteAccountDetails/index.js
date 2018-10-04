import React from "react";
import * as css from "./CasaLiteAccountDetails.scss";
import { Panel, ProgressBar} from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    availableCredit:{
        id: "app.details.availableCredit",
        defaultMessage: "AVAILABLE CREDIT"
    }
});

const CasaLiteAccountDetails = ({intl, accountDetails}) => {
    const { formatMessage, formatNumber } = intl;
    const {availableBalance, totalBalance} = accountDetails || {};
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    const progress = availableBalance.value / totalBalance.value * 100;
    function getLabel() {
        return (<div className={css.progress}>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className={css.available}>
                                <span className={css.availableCredit}>{formatMessage(defaultMessages.availableCredit)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col-xs-12 ${css.balances}`}>
                                <span className={css.availableBalance}>
                                    <span className={css.currency}>{availableBalance.currency}</span>
                                    <span>{formatNumber(availableBalance.value, decimalDigits)} / </span>
                                    <span className={css.currency}>{totalBalance.currency}</span>
                                    <span>{formatNumber(availableBalance.value, decimalDigits)}</span>
                                </span>
                        </div>
                    </div>
                </div>);
    }
    return (
        <div className={css.container}>
            <Panel>
                <ProgressBar now={progress} label={getLabel()}/>
            </Panel>
            <div className={css.lastUpdated}>
                <span>{formatMessage({id: "app.details.asOf"})}</span>
                <span>{accountDetails.lastUpdated}</span>
            </div>

        </div>
   );
};
CasaLiteAccountDetails.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(CasaLiteAccountDetails);