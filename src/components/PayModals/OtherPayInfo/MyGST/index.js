import React from "react";
import * as css from "../../PaymentModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    myGSTAccountNumber: {
        id: "app.transactions.myGSTAccountNumber",
        defaultMessage: "MyGST Account Number",
    },
    filingPeriod: {
        id: "app.transactions.filingPeriod",
        defaultMessage: "Filing Period",
    },
    mediaNumber: {
        id: "app.transactions.mediaNumber",
        defaultMessage: "Media Number",
    }
});

export const MyGST = ({intl, tempToSection, getInputData, paymentSummaryData}) => {
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
                        <label className={css.breakLines}>{formatMessage(defaultMessages.myGSTAccountNumber)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.myGSTAccountNumber || ""}
                            onChange={handleUpdate.bind(this,"myGSTAccountNumber")}
                        />
                    </div>
                </div>
            </div>
            <div className={css.whitebgNoRadius}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage({id: "app.transactions.payAmount"})}</label>
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
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.filingPeriod)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.filingPeriod || ""}
                            onChange={handleUpdate.bind(this,"filingPeriod")}
                        />
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.mediaNumber)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.mediaNumber || ""}
                            onChange={handleUpdate.bind(this,"mediaNumber")}
                        />
                    </div>
                </div>
            </div>
		</div>
	);
};

MyGST.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(MyGST);