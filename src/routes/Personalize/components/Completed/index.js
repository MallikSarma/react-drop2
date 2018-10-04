import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./Completed.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    securityPhrase: {
        id: "app.personalize.securityPhrase",
        defaultMessage: "Your security phrase is",
    },
    awesome: {
        id: "app.personalize.awesome",
        defaultMessage: "Awesome! You have completed your registration,",
    },
    viewTips: {
        id: "app.personalize.viewTips",
        defaultMessage: "SAFETY TIPS",
    },
    done: {
        id: "app.personalize.done",
        defaultMessage: "DONE",
    }
});

var divBg = {
  backgroundImage: "url('m2u/static/img/nature.png')",
};

export const Completed = ({ intl, croppedImage, secretQuestionDetails, showSafetyTips, backToHome }) => {
    const { formatMessage } = intl;
    function backToHomeWithTips() {
        showSafetyTips();
        backToHome();
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header style={divBg}>
                <div className={css.logo_top}>
                    <a className="" href="#page-top"><img className={`img-responsive ${css.logo}`} src="m2u/static/img/maybank2ulogo.png" /> </a>
                </div>
                <div className={css.avatar_wrapper}>
                    <img src={croppedImage}
                        className="img-responsive img-circle"
                        alt="profile picture"
                    />
                </div>
            </Modal.Header>
            <Modal.Body>
                <h1>{formatMessage(defaultMessages.awesome)} Vina!</h1>
                <p>{formatMessage(defaultMessages.securityPhrase)}
                    <span className={css.securityPhrase}>
                        {secretQuestionDetails.securityPhrase}
                    </span>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                    <div className={`col-md-6 ${css.leftButton}`}>
                        <Button className="btn btn-default" onClick={backToHomeWithTips}>{formatMessage(defaultMessages.viewTips)}</Button>
                    </div>
                    <div className={`col-md-6 ${css.rightButton}`}>
                        <Button className="btn btn-success" onClick={backToHome}>{formatMessage(defaultMessages.done)}</Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>

       );
};
Completed.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Completed);
