import React from "react";
import * as css from "./AccountDetailsCard.scss";
import { Panel } from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    oneDayFloat: {
        id: "app.details.oneDayFloat",
        defaultMessage: "One Day Float"
    },
    twoDaysFloat: {
        id: "app.details.twoDaysFloat",
        defaultMessage: "Two Days Float"
    },
    authorizedLimit: {
        id: "app.details.authorizedLimit",
        defaultMessage: "Authorized Limit"
    },
    creditLimit: {
        id: "app.details.creditLimit",
        defaultMessage: "Credit Limit"
    },
    availableCreditLimit: {
        id: "app.details.availableCreditLimit",
        defaultMessage: "Available Credit Limit"
    },
    lastPaymentAmount: {
        id: "app.details.lastPaymentAmount",
        defaultMessage: "Last Payment Amount"
    },
    lastPaymentDate: {
        id: "app.details.lastPaymentDate",
        defaultMessage: "Last Payment Date"
    }


});
export const AccountDetailsCard = ({intl, details}) => {
    const {formatMessage} = intl;
    function getPanelData(){
        return ( <Panel>
            {
               details && details.map((obj, index)=>{
                    return (<div key={index}  className={css.row}>
                        <span className="col-xs-7">{obj.label}</span>
                        <div className="col-xs-5">
                            <span className={css.currency}>{obj.currency}</span>
                            <span>{obj.value}</span>
                        </div>
                    </div>);
                })
            }
        </Panel>
        );
    }
    return (
        <div className={`col-xs-12 ${css.container}`}>
            {getPanelData()}
        </div>
   );
};
AccountDetailsCard.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(AccountDetailsCard);