import React from "react";
import * as css from "../../PaymentModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import Tooltip from "../../../../components/Tooltip";

const defaultMessages = defineMessages({
    paymentType: {
        id: "app.transactions.paymentType",
        defaultMessage: "Payment Type"
    },
    icNumber: {
        id: "app.transactions.icNumber",
        defaultMessage: "IC Number"
    }
});
export const AKPK = ({intl, tempToSection, getInputData, paymentSummaryData}) => {
    const { formatMessage } = intl;
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    return (
        <div>
            <div className={css.greybg}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.paymentType)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={paymentSummaryData.akpkPaymentType && paymentSummaryData.akpkPaymentType.displayName || ""}
                            onChange={handleUpdate.bind(this,"akpkPaymentType")}
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className={css.whitebgNoRadius}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage({id:"app.transactions.payAmount"})}</label>
                    </div>
                    <div className="col-sm-7">
                        <span className={css.inputCurrency}>{paymentSummaryData.currency}</span>
                        <input
                            className={css["input-with-lable"]}
                            type="text"
                            value={tempToSection.amount || ""}
                            onChange={handleUpdate.bind(this,"amount")}
                        />
                    </div>
                </div>
            </div>
            <div className={css.greybg}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage({ id:"app.details.mobileNumber"})}</label>
                        <Tooltip/>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.mobileNumber || ""}
                            onChange={handleUpdate.bind(this,"mobileNumber")}
                        />
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.icNumber)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.icNumber || ""}
                            onChange={handleUpdate.bind(this,"icNumber")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

AKPK.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(AKPK);