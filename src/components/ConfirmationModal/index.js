import React from "react";
import { Modal,Button } from "react-bootstrap";
import * as css from "./ConfirmationModal.scss";
import { injectIntl, intlShape } from "react-intl";

export const ConfirmationModal = ({intl, headerText, bodyText, okBtnText, cancelBtnText, okAction, cancelAction}) => {
    const { formatMessage } = intl;
    return (
        <Modal show className={css.container}>
            <Modal.Header>
                <h6>{formatMessage(headerText)}</h6>
                <span className={css.close} onClick={cancelAction} />
            </Modal.Header>
            <Modal.Body>
                <div className={css.whiteBg}>
                    <div className="row">
                        <div className="col-xs-12">
                             <label className={css.bodyText}>{formatMessage(bodyText)}</label>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={` row ${css[ "btn-wrapper"]}`}>
                    <div className="col-xs-12">
                        <div className={css.btnContainer}>
                            <Button className="btn btn-default" onClick={cancelAction}>
                                <span>{formatMessage(cancelBtnText)}</span>
                            </Button>
                            <Button className="btn btn-success" onClick={okAction}>
                                <span>{formatMessage(okBtnText)}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};
ConfirmationModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(ConfirmationModal);