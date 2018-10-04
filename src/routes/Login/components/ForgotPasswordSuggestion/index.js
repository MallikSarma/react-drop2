import React from "react";
import * as css from "./ForgotPasswordSuggestion.scss";
import { Modal, Button } from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    dontWorry:{
        id: "app.login.dontWorry",
        defaultMessage: "Don't worry, {name}"
    },
    tryToResetPassword: {
        id: "app.login.tryToResetPassword",
        defaultMessage: "You can try to reset your password."
    },
    youCanTry: {
        id: "app.login.youCanTry",
        defaultMessage: "You can try to reset your password."
    }
});

export const ForgotPasswordSuggestion = ({ intl, userDetails, onClose, onResetPassword }) => {
        const {formatMessage} = intl;
        var divBg = {
            backgroundImage: "url('m2u/static/img/phrase_bg.png')",
        };
        return (
            <div>
                <Modal show  className={css.container}>
                    <Modal.Header style={divBg}>
                        <div className={css.avatar_wrapper}>
                            <img
                                src="m2u/static/img/profile_pic.svg"
                                className="img-responsive img-circle"
                                alt="profile picture"
                            />
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>{formatMessage(defaultMessages.dontWorry, {name: "Vina"})}</h1>
                        <p>{formatMessage(defaultMessages.youCanTry)}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <Button className="btn btn-default" onClick={onClose}>{formatMessage({id: "app.personalize.cancel"})}</Button>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                                <Button className="btn btn-success" onClick={onResetPassword}>{formatMessage({id: "app.login.resetPassword"}).toUpperCase()}</Button>
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>
            1</div>
        );
};

ForgotPasswordSuggestion.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(ForgotPasswordSuggestion);
