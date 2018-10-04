import React from "react";
import * as css from "../../TransferModals.scss";
import { injectIntl, intlShape , defineMessages} from "react-intl";
const defaultMessages = defineMessages({
    convertionRate: {
        id: "app.details.convertionRate",
        defaultMessage: "Convertion Rate"
    },
    rmToAud: {
        id: "app.details.rmToAud",
        defaultMessage: "(RM = AUD)"
    }
});
export const MFCA = ({intl, tempToSection, getInputData, }) => {
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
                    <div className={`col-sm-5 ${css.doubleLine}`}>
                        <label>{formatMessage(defaultMessages.convertionRate)}</label>
                        <label>{formatMessage(defaultMessages.rmToAud)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.cardNumber || ""}
                            onChange={handleUpdate.bind(this,"cardNumber")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

MFCA.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(MFCA);