import React from "react";
import { Panel, Well} from "react-bootstrap";
import * as css from "./CardDetails.scss";
import { injectIntl, intlShape ,defineMessages} from "react-intl";
import classnames from "classnames";
const defaultMessages = defineMessages({
    payNow: {
        id: "app.details.payNow",
        defaultMessage: "PAY NOW"
    }
});

export const CardDetails = ({intl, currency, data, buttonAction}) => {
    const paymentClass = classnames({
        [css.minPayment] : true,
        [css.noDueDate]: !data.dueDate
    });
    const { formatMessage, formatNumber } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    return (<div className={css.container}>
                <Panel>
                    <div className="container-fluid">
                        <div className="row">
                            <p className={paymentClass}>{data.message}</p>
                            <span className={css.dueDate}>{data.dueDate}</span>
                        </div>
                    </div>
                    <Well>
                        <div className={data.wellClass}>
                            <div className={css.amount}>
                                <span className={css.currency}>{currency}</span>
                                <span>{formatNumber(data.amount, decimalDigits)}</span>
                            </div>
                            <button className="btn btn-success" onClick={()=>buttonAction()}>{data.buttonText || formatMessage(defaultMessages.payNow)}</button>
                        </div>
                    </Well>
                </Panel>
            </div>);
};
CardDetails.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(CardDetails);
