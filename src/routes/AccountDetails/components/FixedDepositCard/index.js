import React from "react";
import * as css from "./FixedDepositCard.scss";
import { Panel } from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import _ from "lodash";
const defaultMessages = defineMessages({
    totalAmount: {
        id: "app.details.totalAmount",
        defaultMessage: "Total Amount"
    },
    accountType: {
        id: "app.details.accountType",
        defaultMessage: "Account Type"
    },
    individual: {
        id: "app.details.individual",
        defaultMessage: "Individual"
    },
    jointAccountName: {
        id: "app.details.jointAccountName",
        defaultMessage: "Joint Account {index}"
    }
});

export const FixedDepositCard = ({intl, accountDetails}) => {
    const { formatNumber } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    function getData() {
        return accountDetails.map((data,index)=>
            <div className={css.row} key={index}>
                <span>{data.label}</span>
                <span className={css.currency}>{data.currency} {!isNaN(data.value) ? formatNumber(data.value, decimalDigits) : data.value}</span>
            </div>);
    }
    return (
            <div className={`col-xs-12 ${css.container}`}>
                <Panel>
                    {getData()}
                </Panel>
            </div>
   );
};
FixedDepositCard.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(FixedDepositCard);