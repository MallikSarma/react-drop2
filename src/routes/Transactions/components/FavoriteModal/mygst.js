import React from "react";
import * as css from "./FavoriteModal.scss";
import { injectIntl, intlShape } from "react-intl";
const Mygst = ({
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
        <div className={`row ${css.inputPair}`}>
            <div className="col-md-4">
                <label className={css.tightLines}>{formatMessage({id: "app.transactions.myGSTAccountNumber"})}</label>
            </div>
            <div className="col-md-8">
                <input
                    className={css["account-number"]}
                    type="text"
                    value={favoriteInfo.myGSTAccountNumber || ""}
                    onChange={(ev)=>handleUpdate("myGSTAccountNumber", ev.target.value)}
                />
            </div>
        </div>
    );
};
Mygst.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Mygst);
