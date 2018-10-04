import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./SecurityPhrase.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    hello: {
        id: "app.login.hello",
        defaultMessage: "Hello",
    },
    securityPhrasePrompt: {
        id: "app.login.securityPhrasePrompt",
        defaultMessage: "Is your security phrase"
    },
    notMe: {
        id: "app.login.notMe",
        defaultMessage: "NOT ME"
    },
    yes: {
        id: "app.login.yes",
        defaultMessage: "YES"
    }
});

export const UserCheck = ({ intl, userDetails, confirmUser }) => {
    const { formatMessage } = intl;
    return (
        <div>
            <Modal.Body>
                <h1>{formatMessage(defaultMessages.hello)}, {userDetails.username}!</h1>
                <p>{formatMessage(defaultMessages.securityPhrasePrompt)}<span className={`${css[ "image-caption"]} `} >{userDetails.imageCaption}?</span></p>
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                    <div className={`col-lg-6 col-md-6 col-sm-6 col-xs-12 ${css[ "left-btn-container"]} `}>
                        <Button className="btn btn-default" onClick={()=>confirmUser(false)}>{formatMessage(defaultMessages.notMe)}</Button>
                    </div>
                    <div className={`col-lg-6 col-md-6 col-sm-6 col-xs-12 ${css[ "right-btn-container"]} `}>
                        <Button className="btn btn-success" onClick={()=>confirmUser(true)}>{formatMessage(defaultMessages.yes)}</Button>
                    </div>
                </div>
            </Modal.Footer>
        </div>
    );
};

UserCheck.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(UserCheck);
