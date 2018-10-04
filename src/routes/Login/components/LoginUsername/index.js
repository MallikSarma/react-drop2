import React from "react";
import * as css from "./LoginUsername.scss";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";


const defaultMessages = defineMessages({
    myUserName: {
        id: "app.login.myUserName",
        defaultMessage: "My Username",
    },
    login: {
        id: "app.login.login",
        defaultMessage: "LOGIN"
    },
    forgotLoginDetails: {
        id: "app.login.forgotLoginDetails",
        defaultMessage: "Forgot Login Details"
    }
});

export const LoginUsername = ({ intl, userName, checkUser, updateUser, forgotCredentialsFlowState, errorName, resetError}) => {
    const buttonClasses = classnames({
        [css["login-button"]]: true,
        [css["login-input-button"]]: true
    });
    const inputClasses = classnames({
        [css.error]: errorName === "userNameError",
        [css["login-input"]]: true
    });

    function updateUserName(ev) {
        updateUser({
            userName: ev.target.value
        });
    }

    function handleSubmit(ev) {
        if (ev.which === 13 || ev.keyCode === 13){
            checkUser();
        }
    }

    const { formatMessage } = intl;
    return (
        <div>
            <div className={`row ${css.loginWrapper}`}>
                <div className={`${css.loginBox}`}>
                    <div className={`${css["login-field-wrapper"]} `}>
                        <div className={`${css["login-input-icon"]} `}>
                            <img
                                src="m2u/static/icons/profile.svg"
                            />
                        </div>
                        <input
                            placeholder={formatMessage(defaultMessages.myUserName)}
                            className={inputClasses}
                            type="text"
                            value={userName || ""}
                            onChange={updateUserName}
                            onKeyDown={handleSubmit}
                            onFocus={resetError}
                        />
                        <div  onClick={checkUser}>
                            <div className={`${css["login-btn-icon"]} `}>
                                <img  src="m2u/static/icons/lock.svg" />
                            </div>
                            <button name="button" type="button" size="large" className={buttonClasses}><span>{formatMessage(defaultMessages.login)}</span></button>
                        </div>
                    </div>
                    <p className= {`${css["forgot-text"]} `} onClick={forgotCredentialsFlowState.bind(this, "VerifyAccessNumberPin")}>{formatMessage(defaultMessages.forgotLoginDetails)}<img  src="m2u/static/icons/next_white.svg"/></p>
                </div>
            </div>
        </div>


    );
};

LoginUsername.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(LoginUsername);
