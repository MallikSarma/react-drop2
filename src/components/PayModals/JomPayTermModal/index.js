import React from "react";
import * as css from "../PaymentModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { Button, Modal } from "react-bootstrap";
const defaultMessages = defineMessages({
    termAndConditions: {
        id: "app.details.termAndConditions",
        defaultMessage: "Term & Conditions"
    },
    iAgree: {
        id: "app.details.iAgree",
        defaultMessage: "I Agree"
    },
    jompayTermsDeclare: {
        id: "app.details.jompayTermsDeclare",
        defaultMessage: "By clicking the I Accept button, Your here By declare, undertake and confirm the fallowing:"
    },
    jompayTermsTitle: {
        id: "app.details.jompayTermsTitle",
        defaultMessage: "By clicking the I Accept button, Your here By declare, undertake and confirm the fallowing:"
    },
    terms: {
        id: "app.details.jompayTermsTitle",
        defaultMessage: "By clicking the I Accept button, Your here By declare, undertake and confirm the fallowing:"
    },
});
export const JomPayTermModal = ({intl,toggleJompayTerm}) => {
    const { formatMessage } = intl;
    return (
        <div>
            <Modal show className={css.container}>
                <Modal.Header>
                    <lable className={css.title}>{formatMessage(defaultMessages.termAndConditions)}</lable>
                    <span className={css.close} onClick={()=>toggleJompayTerm({"termsConditions":false})} />
                </Modal.Header>
                <Modal.Body>
                    <div className={css.whitebg}>
                        <div className={`row ${css.contentRound}`}>
                            <span className={css.termDeclare}>{formatMessage(defaultMessages.jompayTermsDeclare)}</span>
                            <span className={css.termDeclare}>{formatMessage(defaultMessages.jompayTermsTitle)}</span>
                            <span className={css.termsOption}>{formatMessage(defaultMessages.terms)}</span>
                            <span className={css.termsOption}>{formatMessage(defaultMessages.terms)}</span>
                            <span className={css.termsOption}>{formatMessage(defaultMessages.terms)}</span>
                            <span className={css.termsOption}>{formatMessage(defaultMessages.terms)}</span>
                        </div>
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-sm-7"/>
                            <Button onClick={()=>toggleJompayTerm({"termsConditions":true})} className={`btn ${css["pay-btn"]} col-xs-5  pull-right`}>
                                <span className={css["pay-btn-text"]}>{formatMessage(defaultMessages.iAgree).toUpperCase()}</span>
                                <span className={css["pay-btn-icon"]}/>
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
JomPayTermModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(JomPayTermModal);
