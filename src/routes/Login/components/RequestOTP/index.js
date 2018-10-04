import React from "react";
import * as css from "./RequestOTP.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    pleaseConfirmYourDetails: {
        id: "app.login.pleaseConfirmYourDetails",
        defaultMessage: "Please confirm your details.",
    },
    toProceed: {
        id: "app.login.toProceed",
        defaultMessage: "To proceed, please request and insert your",
    },
    tac: {
        id: "app.login.tac",
        defaultMessage: "TAC"
    },
    sixDigit: {
        id: "app.login.sixDigit",
        defaultMessage: "6-digit One Time Password (OTP)",
    },
    number: {
        id: "app.login.number",
        defaultMessage: "number",
    },
    requestTAC: {
        id: "app.login.requestTAC",
        defaultMessage: "REQUEST TAC",
    }
});
export const RequestOTP = ({intl, onClick, TACRequest}) => {
    const {formatMessage} = intl;
    let buttonDetails = {
        message: TACRequest ? formatMessage(defaultMessages.requestTAC) : formatMessage({id: "app.registration.requestOTP"}),
        action: onClick
    };
    return (
        <div>
            <div className={`${css[ "otp-wrapper"]} put-in-modal`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-1 col-sm-1 col-xs-12"/>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <div className={`hidden-xs ${css["otp-heading-wrapper"]}`}>
                                <h6>{formatMessage(defaultMessages.pleaseConfirmYourDetails)}</h6>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12">
                            <div className={` ${css["otp-right-wrapper"]}`}>
                                <div className="row">
                                    <div className="col-lg-8 col-md-6 col-sm-6 col-xs-12">
                                        <p>
                                            {formatMessage(defaultMessages.toProceed)}
                                        </p>
                                        <p>
                                            <span>{ TACRequest ? formatMessage(defaultMessages.tac) : formatMessage(defaultMessages.sixDigit)} </span>
                                            {formatMessage(defaultMessages.number)}
                                        </p>
                                    </div>
                                    <div className={`${css.buttontext} col-lg-4 col-md-6 col-sm-6 col-xs-12`}>
                                         <button
                                            onClick={buttonDetails.action}
                                            className="btn btn-success"
                                            type="button"
                                         >  {buttonDetails.message}
                                         </button>
                                    </div>
                                        </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-1 col-sm-2 col-xs-12"/>
                    </div>
                </div>
            </div>
    </div>
);
};
RequestOTP.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(RequestOTP);
