import React from "react";
import { Modal } from "react-bootstrap";
import * as css from "./AccountInactive.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import TACRequest from "../RequestOTP";
import TACEnter from "../../../../components/OneTimePassword";
const defaultMessages = defineMessages({
    accountInactiveMessage:{
        id:"app.login.accountInactiveMessage",
        defaultMessage : "Let`s get you restarted with your access number and pin.",
    },
    accessNumber:{
        id:"app.login.accessNumber",
        defaultMessage : "Card \ Access Number",
    }
});
export const AccountInactive = ({ intl, onClose, tacRequest, asyncRequestTAC, asyncTACConfirm}) => {
    const { formatMessage } = intl;
    return (
        <div>
            <Modal show className={`${css.container} reset_modal_tabIndex`}>
                <Modal.Header closeButton onHide={onClose}>
                    <h6>{formatMessage({id: "app.login.accountInactive"})}</h6>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <h1>{formatMessage({ id: "app.login.accountNoLongerActive" })}</h1>
                            <p>{formatMessage(defaultMessages.accountInactiveMessage)}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12"/>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <label>{formatMessage(defaultMessages.accessNumber)}</label>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div className={`${css["input-wrapper"]}`}>
                                <input
                                    type="text"
                                    className={`${css["pair-input"]}`}
                                    disabled
                                    value={"XXXXXXXX5566"}
                                />
                            </div>
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12"/>
                    </div>
                    <div className={`hidden-md hidden-lg hidden-sm ${css.requestOTPContainer}`}>
                        {
                            !tacRequest &&
                            <TACRequest TACRequest onClick={asyncRequestTAC}/>
                        }
                        {
                            tacRequest &&
                            <TACEnter tacRequest asyncCheckOTP={asyncTACConfirm}/>
                        }
                    </div>
                </Modal.Footer>
            </Modal>
            <div className="hidden-xs">
                {
                    !tacRequest &&
                    <TACRequest TACRequest onClick={asyncRequestTAC}/>
                }
                {
                    tacRequest &&
                    <TACEnter tacRequest asyncCheckOTP={asyncTACConfirm}/>
                }
            </div>
        </div>
       );
};
AccountInactive.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(AccountInactive);
