import React from "react";
import * as css from "./FavoriteModal.scss";
import Tooltip from "../../../../components/Tooltip";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    telco: {
        id: "app.transactions.telco",
        defaultMessage: "Telco"
    }
});
const Reload = ({
        intl,
        getInputData,
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
                        <label>{formatMessage(defaultMessages.telco)}</label>
                    </div>
                    <div className="col-md-8">
                        <input
                            className={css["payment-type"]}
                            type="text"
                            value={favoriteInfo && favoriteInfo.name || ""}
                            onChange={(ev)=>handleUpdate("name", ev.target.value)}
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
                            className={css["payment-type"]}
                            type="text"
                            value={favoriteInfo.mobileNumber || ""}
                            onChange={(ev)=>handleUpdate("mobileNumber", ev.target.value)}
                        />
                    </div>
            </div>
        </div>
    );
};
Reload.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Reload);
