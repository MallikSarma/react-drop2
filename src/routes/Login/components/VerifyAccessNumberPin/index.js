import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as css from "./VerifyAccessNumberPin.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
import Tooltip from "../../../../components/Tooltip";

const defaultMessages = defineMessages({
    noProblem: {
        id: "app.login.noProblem",
        defaultMessage: "No problem! It happens to the best of us",
    },
   letsVerify: {
        id: "app.login.letsVerify",
        defaultMessage: "Let's verify your access number and pin.",
    },
    accountInactive: {
        id: "app.login.accountInactive",
        defaultMessage: "Account Inactive"
    },
    accountNoLongerActive: {
        id: "app.login.accountNoLongerActive",
        defaultMessage: "Your account is no longer active."
    }
});
export const VerifyAccessNumberPin = ({
    intl,
    forgotCredentialData,
    onClose,
    updateDetails,
    asyncRequestToActivate,
    asyncAuthenticatePin,
    accountInactive,
    errorName,
    resetError
}) => {
    const { formatMessage } = intl;
    let cardNoClasses = classnames({
        [css.error]: errorName === "cardNoError",
        [css["pair-input"]]: true
    });
    let pinClasses = classnames({
        [css.error]: errorName === "pinError",
        [css["pair-input"]]: true
    });
    function updateCardDetails(key, ev) {
        updateDetails({
            key,
            value: ev.target.value
        });
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header>
                <h6>{accountInactive ? formatMessage(defaultMessages.accountInactive) : formatMessage({id: "app.login.forgotLoginDetails"})}</h6>
                <span className={css.close} onClick={onClose} />
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h1>{accountInactive ? formatMessage(defaultMessages.accountNoLongerActive) : formatMessage(defaultMessages.noProblem)}</h1>
                        <p>{accountInactive ? formatMessage({ id: "app.login.accountInactiveMessage" }) : formatMessage(defaultMessages.letsVerify)}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                        <label>{formatMessage({id: "app.registration.cardAccessNumber"})}</label>
                        <Tooltip/>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                        <div className={`${css["input-wrapper"]}`}>
                            <input
                                type="text"
                                value={forgotCredentialData.cardNo || ""}
                                className={cardNoClasses}
                                placeholder="Ex. 1111222233334444"
                                onChange={updateCardDetails.bind(this, "cardNo")}
                                onFocus={resetError}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                        <label>{formatMessage({id: "app.registration.pin"})}</label>
                        <Tooltip/>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                        <div className={`${css[ "input-wrapper"]}`}>
                            <input
                                type="password"
                                className={pinClasses}
                                value={forgotCredentialData.pin || ""}
                                onChange={updateCardDetails.bind(this, "pin")}
                                placeholder={formatMessage({id: "app.registration.pinPlaceholder"})}
                                onFocus={resetError}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12"/>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <div className={`${css[ "btn-wrapper"]}`}>
                            <Button className="btn btn-success" onClick={accountInactive ? asyncRequestToActivate : asyncAuthenticatePin}>
                                {formatMessage({id: "app.personalize.submit"})}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};
VerifyAccessNumberPin.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(VerifyAccessNumberPin);
