import React from "react";
import * as css from "../Registration.scss";
import { FormattedMessage, injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
import Tooltip from "../../../../components/Tooltip";
const defaultMessages = defineMessages({
    readyForAccount: {
        id: "app.registration.readyForAccount",
        defaultMessage: "Ready to create an account?",
    },
    verify: {
        id: "app.registration.verify",
        defaultMessage: "Verify your access number and pin.",
    },
    cardAccessNumber: {
        id: "app.registration.cardAccessNumber",
        defaultMessage: "Card / Access Number",
    },
    accountCreatePrompt: {
        id: "app.registration.accountCreatePrompt",
        defaultMessage: "Before we create your account, let us verify your access number and pin.",
    },
    pin: {
        id: "app.registration.pin",
        defaultMessage: "PIN",
    },
    pinPlaceholder: {
        id: "app.registration.pinPlaceholder",
        defaultMessage: "Enter 6-digit PIN number"
    },
    agree: {
        id: "app.registration.agree",
        defaultMessage: "I AGREE WITH THE "
    },
    "t&c": {
        id: "app.registration.t&c",
        defaultMessage: "TERMS & CONDITIONS"
    },
    continue: {
        id: "app.registration.continue",
        defaultMessage: "CONTINUE"
    }
});


export const CardForm = ({
    intl,
    updateCardDetails,
    cardDetails,
    openPdf,
    asyncAuthenticatePin,
    agreeConditions,errorName,
    resetError
}) => {
    const {formatMessage} = intl;
    let cardNoClasses = classnames({
        [css.error]: errorName === "cardNoError",
        [css["pair-input"]]: true
    });
    let pinClasses = classnames({
        [css.error]: errorName === "pinError",
        [css["pair-input"]]: true
    });
    const agreeTerms = ()=>{
        updateCardDetails({
            key: "agreeConditions",
            value: !agreeConditions
        });
    };
    return (
            <div className={`${css[ "right-panel-content"]}`}>
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="hidden-xs">
                        <FormattedMessage
                            {...defaultMessages.readyForAccount}
                        />
                        </h2>
                        <p className="hidden-xs">
                            <FormattedMessage
                                {...defaultMessages.accountCreatePrompt}
                            />
                        </p>
                        <p className="hidden-sm hidden-md hidden-lg">
                            <FormattedMessage
                                {...defaultMessages.verify}
                            />
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className={`col-lg-5 ${css.labelContainer}`}>
                        <label><FormattedMessage
                                {...defaultMessages.cardAccessNumber}
                               /></label>
                        <Tooltip/>
                    </div>
                    <div className={`col-lg-5 ${css.inputContainer}`}>
                        <div className={`${css["input-wrapper"]}`}>
                            <input
                                type="text"
                                value={cardDetails.cardNo || ""}
                                className={cardNoClasses}
                                placeholder="Ex. 1111222233334444"
                                onChange={(ev)=>updateCardDetails({
                                    key:"cardNo",
                                    value: ev.target.value
                                })}
                                onFocus={resetError}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className={`col-lg-5 ${css.labelContainer}`}>
                        <label><FormattedMessage
                                id="app.registration.pin"
                                {...defaultMessages.pin}
                               /></label>
                        <Tooltip/>
                    </div>
                    <div className={`col-lg-5 ${css.inputContainer}`}>
                        <div className={`${css[ "input-wrapper"]}`}>
                            <input
                                type="password"
                                value={cardDetails.pin || ""}
                                className={pinClasses}
                                onChange={(ev)=>updateCardDetails({
                                    key:"pin",
                                    value: ev.target.value
                                })}
                                placeholder={formatMessage(defaultMessages.pinPlaceholder)}
                                onFocus={resetError}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <img className={css.captcha}src="m2u/static/icons/captcha.svg"/>
                    </div>
                </div>
                <div className={css.termsBox}>
                    <div className={`row ${css[ "term-wrapper"]}`}>
                        <div className="col-lg-1 col-sm-1 col-md-1 col-xs-1" onClick={agreeTerms}>
                            {
                                agreeConditions &&
                                <img className={css.radios} src="m2u/static/icons/radio_selected.svg"/>
                                ||
                                <img className={css.radios} src="m2u/static/icons/radio_button.svg"/>
                            }
                        </div>
                        <div className="col-lg-11 col-sm-11 col-md-11 col-xs-11" onClick={agreeTerms}>
                            <label className={`${css.terms}`}>{formatMessage(defaultMessages.agree)}</label>
                            <span onClick={(ev)=>{ev.stopPropagation(); openPdf();}}>{formatMessage(defaultMessages["t&c"])}</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <button className="btn btn-success" type="button" onClick={asyncAuthenticatePin}>{formatMessage(defaultMessages.continue)}</button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12"/>
                </div>
            </div>
        );
};
CardForm.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(CardForm);
