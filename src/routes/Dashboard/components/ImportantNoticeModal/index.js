import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./ImportantNoticeModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";

const defaultMessages = defineMessages({
    importantNotice: {
        id: "app.dashboard.importantNotice",
        defaultMessage: "Important Notice",
    },
    yourCardHasBeen: {
        id: "app.dashboard.yourCardHasBeen",
        defaultMessage: "Your card has been sucessfully activated.",
    },
    doYouWantToSetPin: {
        id: "app.personalize.doYouWantToSetPin",
        defaultMessage: "Do you want to set PIN?",
    },
    later: {
        id: "app.dashboard.later",
        defaultMessage: "LATER",
    },
    setNow: {
        id: "app.dashboard.setNow",
        defaultMessage: "SET NOW",
    }
});

export const ImportantNoticeModal = ({ intl}) => {
    const { formatMessage } = intl;
    return (
        <Modal show className={css.container}>
            <Modal.Header closeButton >
                <h6>{formatMessage(defaultMessages.importantNotice)}</h6>
            </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                    <div className={` row ${css.textSection}`}>
                        <div className="col-xs-12">
                            <span>{formatMessage(defaultMessages.yourCardHasBeen)}</span> <br/>
                            <span>{formatMessage(defaultMessages.doYouWantToSetPin)}</span>
                        </div>
                    </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-xs-12 col-sm-6">
                            <Button className="btn btn-default" >{formatMessage(defaultMessages.later)}</Button>
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Button className="btn btn-success" >{formatMessage(defaultMessages.setNow)}</Button>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};

ImportantNoticeModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(ImportantNoticeModal);
