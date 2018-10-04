import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./UploadNow.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    uploadNow: {
        id: "app.personalize.uploadNow",
        defaultMessage: "UPLOAD NOW",
    },
    hello: {
        id: "app.personalize.hello",
        defaultMessage: "Hello",
    },
    whatWouldYou: {
        id: "app.personalize.whatWouldYou",
        defaultMessage: "What would you like for your profile image?",
    }
});

var divBg = {
    backgroundImage: "url('m2u/static/img/nature-theme.png')",
};
export const UploadNow = ({ intl, toggleDragAndDrop }) => {
    const { formatMessage } = intl;
    return (
        <Modal show  className={css.container}>
            <Modal.Header style={divBg}>
                <div className={css.logo_top}>
                    <a className="" href="#page-top"><img className={`img-responsive ${css.logo}`} src="m2u/static/img/maybank2ulogo.png" /> </a>
                </div>
                <div className={css.avatar_wrapper}>
                    <img
                        src="m2u/static/img/profile_pic.svg"
                        className="img-responsive img-circle"
                        alt="profile picture"
                    />
                </div>
            </Modal.Header>
            <Modal.Body>
                <h1>{formatMessage(defaultMessages.hello)} Vina Mariana!</h1>
                <p>{formatMessage(defaultMessages.whatWouldYou)}</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                <div className="col-md-12">
                        <Button onClick={toggleDragAndDrop}
                            className="btn btn-success"
                        >
                            {formatMessage(defaultMessages.uploadNow)}
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};

UploadNow.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(UploadNow);
