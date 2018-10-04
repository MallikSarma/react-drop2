import React from "react";
import Modal from "../../../../components/GeneralModal";
import * as css from "./ResetPassword.scss";
import RequestOTP from "../RequestOTP";
import OneTimePassword from "../../../../components/OneTimePassword";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
import Tooltip from "../../../../components/Tooltip";

const defaultMessages = defineMessages({
    newPassword: {
        id: "app.login.newPassword",
        defaultMessage: "New Password",
    },
});
export const ResetPassword = ({ intl, onClose, requestOTP, forgotCredentialData, OTPRequest, updatePassword, asyncCheckOTP, errorName, resetError}) => {
    const { formatMessage } = intl;
    let passwordClasses = classnames({
        [css.error]: errorName === "passwordError",
        [css["pair-input"]]: true
    });
    let confirmPasswordClasses = classnames({
        [css.error]: errorName === "confirmPasswordError",
        [css["pair-input"]]: true
    });
    function updateDetails(key, ev) {
        updatePassword({
            key,
            value: ev.target.value
        });
    }
    const disableInput = forgotCredentialData ? forgotCredentialData.OTPRequest : false;
    return (
        <div>
            <Modal show className={`${css.container} reset_modal_tabIndex`}>
                <Modal.Header onHide={onClose}>
                    <h6>{formatMessage({id: "app.login.resetPassword"})}</h6>
                    <span className={css.close} onClick={onClose} />
                </Modal.Header>
                <Modal.Body>
                    <div className={`${css[ "grey-bg"]}`}>
                        <div className="row">
                        <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12">
                                <label>{formatMessage(defaultMessages.newPassword)}</label>
                                <Tooltip/>
                            </div>
                        <div className="col-lg-7 col-md-6 col-sm-6 col-xs-12">
                                <div className={`${css[ "input-wrapper"]}`}>
                                    <input
                                        type="password"
                                        disabled={disableInput}
                                        className={passwordClasses}
                                        onChange={updateDetails.bind(this, "password")}
                                        onFocus={resetError}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${css[ "white-bg"]}`}>
                         <div className="row">
                        <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12">
                                <label>{formatMessage({id: "app.registration.confirmPassword"})}</label>
                                <Tooltip/>
                            </div>
                        <div className="col-lg-7 col-md-6 col-sm-6 col-xs-12">
                                <div className={`${css[ "input-wrapper"]}`}>
                                    <input
                                        type="password"
                                        disabled={disableInput}
                                        className={confirmPasswordClasses}
                                        onChange={updateDetails.bind(this, "confirmPassword")}
                                        onFocus={resetError}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`hidden-md hidden-lg hidden-sm ${css.requestOTPContainer}`}>
                        {
                            !OTPRequest && <RequestOTP onClick={requestOTP}/>
                        }
                        {
                            OTPRequest && <OneTimePassword asyncCheckOTP={asyncCheckOTP} mobileDisplay={forgotCredentialData.sentTo} updateUserDetails={updatePassword}/>
                        }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="hidden-xs">
            {
                !OTPRequest && <RequestOTP onClick={requestOTP}/>
            }
            {
                OTPRequest && <OneTimePassword asyncCheckOTP={asyncCheckOTP} mobileDisplay={forgotCredentialData.sentTo} updateUserDetails={updatePassword}/>
            }
            </div>
        </div>
       );
};
ResetPassword.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(ResetPassword);
