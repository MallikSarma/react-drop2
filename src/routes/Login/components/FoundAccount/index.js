import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./FoundAccount.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    foundYourAccount: {
        id: "app.login.foundYourAccount",
        defaultMessage: "Hi {name}! We found your account",
    },
   ifYouKnowYourPassword: {
        id: "app.login.ifYouKnowYourPassword",
        defaultMessage: "If you know your password, please proceed to login in.",
    },
   otherwiseReset: {
        id: "app.login.otherwiseReset",
        defaultMessage: "Otherwise click Reset Password.",
    },
    yourUsername: {
        id: "app.login.yourUsername",
        defaultMessage: "Your Username",
    },
    resetPassword: {
        id: "app.login.resetPassword",
        defaultMessage: "Reset Password",
    }

});
export const FoundAccount = ({ intl, userName, onClose, openLoginModal, resetPassword}) => {
    const { formatMessage } = intl;
    return (
        <Modal show className={css.container}>
            <Modal.Header closeButton onHide={onClose}>
                <h6>{formatMessage({id: "app.login.forgotLoginDetails"})}</h6>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <h1>{formatMessage(defaultMessages.foundYourAccount, {name: "Vina"})}</h1>
                        <p>{formatMessage(defaultMessages.ifYouKnowYourPassword)}</p>
                        <p>{formatMessage(defaultMessages.otherwiseReset)}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12"/>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <label>{formatMessage(defaultMessages.yourUsername)}</label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className={`${css["input-wrapper"]}`}>
                            <input
                                type="text"
                                className={`${css["pair-input"]}`}
                                disabled
                                value={userName}
                            />
                        </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12"/>
                </div>
                <div className={` row ${css[ "btn-wrapper"]}`}>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12"/>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div>
                            <Button className="btn btn-default" onClick={resetPassword}>
                                {formatMessage(defaultMessages.resetPassword)}
                            </Button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <div>
                            <Button className="btn btn-success" onClick={openLoginModal}>
                                {formatMessage({id: "app.login.login"})}
                            </Button>
                        </div>
                    </div>
                     <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"/>
                </div>
            </Modal.Footer>
        </Modal>
       );
};
FoundAccount.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(FoundAccount);
