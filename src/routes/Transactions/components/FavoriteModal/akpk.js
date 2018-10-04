import React from "react";
import * as css from "./FavoriteModal.scss";
import { injectIntl, intlShape } from "react-intl";
import Tooltip from "../../../../components/Tooltip";
const Akpk = ({
        intl,
        getInputData,
        payDetailsData,
        favoriteInfo
    }) => {
    const { formatMessage } = intl;
    function handleUpdate(key,value) {
        getInputData({
            key,
            value
        });
    }
    return (
        <div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label>{formatMessage({id: "app.transactions.paymentType"})}</label>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["payment-type"]}
                        type="text"
                        onChange={(ev)=>handleUpdate("paymentType", ev.target.value)}
                        value={payDetailsData.akpkPaymentType && payDetailsData.akpkPaymentType.displayName || ""}
                        readOnly
                    />
                </div>
            </div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label className={css.tightLines}>{formatMessage({id: "app.details.mobileNumber"})}</label>
                    <Tooltip/>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["account-number"]}
                        type="text"
                        value={favoriteInfo.mobileNumber || ""}
                        onChange={(ev)=>handleUpdate("mobileNumber", ev.target.value)}
                    />
                </div>
            </div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label className={css.tightLines}>{formatMessage({id: "app.transactions.icNumber"})}</label>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["account-number"]}
                        type="text"
                        value={favoriteInfo.icNumber || ""}
                        onChange={(ev)=>handleUpdate("icNumber", ev.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
Akpk.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Akpk);
