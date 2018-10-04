import React from "react";
import * as css from "../PaymentModal.scss";
import { injectIntl, intlShape } from "react-intl";

export const JomPayModal = ({intl, tempToSection, handleUpdate, paymentSummaryData}) => {
	const { formatMessage } = intl;
	return (
		<div>
            <div className="row">
                <div className="col-md-4">
                    <label>{formatMessage({"id": "app.transactions.ref1"})}</label>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["account-number"]}
                        type="text"
                        value={tempToSection.ref1 || ""}
                        onChange={(ev)=>handleUpdate("ref1",ev.target.value)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <label>{formatMessage({"id": "app.transactions.ref1"})}</label>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["account-number"]}
                        type="text"
                        value={tempToSection.ref2 || ""}
                        onChange={(ev)=>handleUpdate("ref2",ev.target.value)}
                    />
                </div>
            </div>
		</div>
	);
};

JomPayModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(JomPayModal);