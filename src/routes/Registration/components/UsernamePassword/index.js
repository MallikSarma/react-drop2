import React from "react";
import * as css from "../Registration.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
import Tooltip from "../../../../components/Tooltip";

const defaultMessages = defineMessages({
    readyForAccountCreation: {
        id: "app.registration.readyForAccountCreation",
        defaultMessage: "We are now ready to create your account.",
    },
    createM2UCredentials: {
        id: "app.registration.createM2UCredentials",
        defaultMessage: "Create your Maybank2u Username and Password."
    },
    username: {
        id: "app.registration.username",
        defaultMessage: "Username"
    },
    password: {
        id: "app.registration.password",
        defaultMessage: "Password"
    },
    confirmPassword: {
        id: "app.registration.confirmPassword",
        defaultMessage: "Confirm Password"
    },
    email: {
        id: "app.registration.email",
        defaultMessage: "Email Address"
    },
    requestOTP: {
        id: "app.registration.requestOTP",
        defaultMessage: "REQUEST OTP"
    }
});

export const UsernamePassword = ({
    intl,
    getAsyncOTP,
    updateUserDetails,
    showOneTimeerrorName,
    showOneTime,
    errorName,
    resetError,
    pinAuthenticateResponse,
    userDetails
}) => {
    const {formatMessage} = intl;
    let usernameClasses = classnames({
        [css.error]: errorName === "userNameError",
        [css["pair-input"]]: true
    });
    let passwordClasses = classnames({
        [css.error]: errorName === "passwordError",
        [css["pair-input"]]: true
    });
    let confirmPasswordClasses = classnames({
        [css.error]: errorName === "confirmPasswordError",
        [css["pair-input"]]: true
    });
    let emailClasses = classnames({
        [css.error]: errorName === "emailError",
        [css["pair-input"]]: true
    });
    return (
        <div className={`${css[ "right-panel-content"]}`}>
            <div className="row">
                <div className="col-lg-12">
                    <h2 className="hidden-xs">{formatMessage(defaultMessages.readyForAccountCreation)}</h2>
                    <p>{formatMessage(defaultMessages.createM2UCredentials)}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-5">
                    <label>{formatMessage(defaultMessages.username)}</label>
                    <Tooltip/>
               </div>
                <div className="col-lg-5">
                    <div className={`${css[ "input-wrapper"]}`}>
                        <input
                            type="text"
                            value={userDetails.userName}
                            className={usernameClasses}
                            readOnly={!!pinAuthenticateResponse.username}
                            onChange={(ev)=>{
                                updateUserDetails({
                                    key: "userName",
                                    value: ev.target.value
                                });
                            }}
                            onFocus={resetError}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-5">
                    <label>{formatMessage(defaultMessages.password)}</label>
                    <Tooltip/>
                </div>
                <div className="col-lg-5">
                    <div className={`${css[ "input-wrapper"]}`}>
                        <input
                            type="password"
                            className={passwordClasses}
                            onChange={(ev)=>{
                                updateUserDetails({
                                    key: "password",
                                    value: ev.target.value
                                });
                            }}
                            onFocus={resetError}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-5">
                    <label>{formatMessage(defaultMessages.confirmPassword)}</label>
                    <Tooltip/>
                </div>
                <div className="col-lg-5">
                    <div className={`${css[ "input-wrapper"]}`}>
                        <input
                            type="password"
                            className={confirmPasswordClasses}
                            onChange={(ev)=>{
                                updateUserDetails({
                                    key: "confirmPassword",
                                    value: ev.target.value
                                });
                            }}
                            onFocus={resetError}
                        />
                    </div>
                </div>
            </div>

             <div className="row">
                <div className="col-lg-5">
                    <label>{formatMessage(defaultMessages.email)}</label>
                </div>
                <div className="col-lg-5">
                    <div className={`${css[ "input-wrapper"]}`}>
                        <input
                            type="email"
                            value={userDetails.email}
                            className={emailClasses}
                            onChange={(ev)=>{
                                updateUserDetails({
                                    key: "email",
                                    value: ev.target.value
                                });
                            }}
                            onFocus={resetError}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

UsernamePassword.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(UsernamePassword);