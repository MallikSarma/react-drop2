import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./SecurityPhrase.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";

const defaultMessages = defineMessages({
    forgotPassword: {
        id: "app.login.forgotPassword",
        defaultMessage: "FORGOT PASSWORD",
    },
    myPassword: {
        id: "app.login.myPassword",
        defaultMessage: "My Password"
    }
});

export const PasswordComponent = ({
    intl,
    userDetails,
    password,
    updatePassword,
    incorrectPassword,
    forgotCredentialsFlowState,
    asyncAuthenticateUser,
    resetError,
    errorName }) =>{

    function handleUpdatePassword(newValue) {
        updatePassword({
            password: newValue
        });
    }
    const { formatMessage } = intl;
    let passwordClasses = classnames({
        [css["login-input"]]: true,
        [css.incorrectPassword]: errorName === "passwordError"
    });
    return (
        <div>
            <Modal.Body>
                <h1>{formatMessage({id: "app.login.hello"})}, {userDetails.username}!</h1>
                <div className={`${css.loginBox}`}>
                    <div className={`${css[ "login-field-wrapper"]} `}>
                        <img className={`img-responsive ${css[ "login-input-icon"]} `} src="m2u/static/icons/avatar_zoom_small.svg" />
                        <input
                            placeholder={formatMessage(defaultMessages.myPassword)}
                            className={passwordClasses}
                            type="password"
                            value={password}
                            onFocus={resetError}
                            onChange={(ev)=>handleUpdatePassword(ev.target.value)}
                        />
                        {
                            password &&
                            <span className={css.iconSpan} onClick={()=>handleUpdatePassword()}><img src="m2u/static/icons/text_box_reset.svg"/></span>
                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                <div className={`col-lg-7 col-md-7 col-sm-7 col-xs-12  ${css[ "left-btn-container"]} `}>
                        <Button className="btn btn-default" onClick={forgotCredentialsFlowState.bind(this, "VerifyAccessNumberPin")}>{formatMessage(defaultMessages.forgotPassword)}</Button>
                    </div>
                <div className={`col-lg-5 col-md-5 col-sm-5  col-xs-12 ${css[ "right-btn-container"]} `}>
                        <Button className="btn btn-success" onClick={asyncAuthenticateUser}>{formatMessage({ id: "app.login.login"})}</Button>
                    </div>
                </div>
            </Modal.Footer>
        </div>
     );
};


PasswordComponent.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(PasswordComponent);

