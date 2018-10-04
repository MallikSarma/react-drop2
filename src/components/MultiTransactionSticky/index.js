import React from "react";
import * as css from "./MultiTransactionSticky.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    inQueue: {
        id: "app.details.inQueue",
        defaultMessage: "In Queue"
    },
    multiPayMsg: {
        id: "app.details.multiPayMsg",
        defaultMessage: "Total amount is inclusive of bank charges and GST"
    },
    payment: {
        id: "app.details.payment",
        defaultMessage: "Payment"
    }
});
export const MultiTransactionSticky = ({
    intl,
    sendAsyncMultiTransaction,
    selectedRecipientList,
    currentTab
}) => {
    const {formatMessage,formatNumber} = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    function confirmTransactions(){
        sendAsyncMultiTransaction();
    }
    const dataToMap = {
        "pay":{
            btnText : formatMessage({id:"app.transactions.pay"}),
            message :  formatMessage(defaultMessages.payment)
        },
        "transfer":{
            btnText : formatMessage({id:"app.transactions.transfer"}),
            message :  formatMessage({id:"app.transactions.transfer"})
        },
        "reload":{
            btnText : formatMessage({id:"app.details.reload"}),
            message :  formatMessage({id:"app.details.reload"})
        }
    };

    let totalAmount = 0;
    selectedRecipientList.map(obj => {
        totalAmount += parseFloat(obj.amount);
    });
    const title = `${selectedRecipientList.length}/5 ${dataToMap[currentTab].message} ${formatMessage(defaultMessages.inQueue)}`;
    return (
        <div>
            <div className={`${css[ "confirm-wrapper"]} put-in-modal`}>
                <div className="container-fluid">
                    <div className={css.fixContainer}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-2"/>
                            <div className="col-xs-12 col-sm-8">
                                <div className={` ${css["confirm-right-wrapper"]}`}>
                                    <div className="row">
                                        <div className="col-sm-5 col-xs-12">
                                            <div className={`${css["confirm-heading-wrapper"]}`}>
                                                <h6>{title}</h6>
                                                <p className={css["tac-msg"]}>
                                                    {formatMessage(defaultMessages.multiPayMsg)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-sm-7 col-xs-12">
                                            <div className={css["btn-wrapper"]}>
                                                <button
                                                    onClick={confirmTransactions}
                                                    className="btn btn-success"
                                                    type="button"
                                                >
                                                    <span className={css["btn-action"]}>{dataToMap[currentTab].btnText}</span>
                                                    <span className={css["btn-currency"]}>RM</span>
                                                    <span className={css["btn-total-amount"]}>{formatNumber(totalAmount, decimalDigits)}</span>
                                                    <span className={css["pay-icon"]}/>
                                                 </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-2"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
};
MultiTransactionSticky.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(MultiTransactionSticky);