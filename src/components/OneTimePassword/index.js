import React from "react";
import * as css from "./OneTimePassword.scss";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    oneTimePassSent: {
        id: "app.registration.oneTimePassSent",
        defaultMessage: "A One-Time Password has been sent to",
    },
    tacSent: {
        id: "app.tacSent",
        defaultMessage: "TAC has been sent to"
    },
    ifYouDidNotReceive: {
        id: "app.registration.ifYouDidNotReceive",
        defaultMessage: "If you did not receive,",
    },

    clickHere: {
        id: "app.registration.clickHere",
        defaultMessage: "click here",
    },
    confirm: {
        id: "app.registration.confirm",
        defaultMessage: "CONFIRM",
    },
    otp: {
        id: "app.registration.otp",
        defaultMessage: "OTP has been sent.",
    },
    tacRequested: {
        id: "app.tacRequested",
        defaultMessage: "TAC has been requested."
    }

});
export const OneTimePassword = ({intl, tacRequest, asyncCheckOTP, asyncConfirmUpliftManage, certificateSummary, updateUserDetails, errorName, mobileDisplay}) => {
    const {formatMessage} = intl;
    let otpClasses = classnames({
        [css.error]: errorName === "otpError",
        [css["pair-input"]]: true
    });
    function confirmUpliftManage(){
        asyncCheckOTP();
        if (certificateSummary.uplift){
            asyncConfirmUpliftManage.call(this, "uplift");
        }
        else {
            asyncConfirmUpliftManage.call(this, "manage");
        }
    }
    return (
<div>
    <div className={`${css[ "otp-wrapper"]} put-in-modal`}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12">
                    <div className={` ${css["otp-right-wrapper"]}`}>
                        <div className="row">
                            <div className="col-sm-2 col-xs-12" />
                            <div className="col-sm-4 col-xs-12">
                                <div className={`${css["otp-heading-wrapper"]}`}>
                                    <h6 className="hidden-xs">{tacRequest ? formatMessage(defaultMessages.tacRequested) : formatMessage(defaultMessages.otp)}</h6>
                                    <p>
                                        {tacRequest ? formatMessage(defaultMessages.tacSent) : formatMessage(defaultMessages.oneTimePassSent)} {`${mobileDisplay} `}
                                        {formatMessage(defaultMessages.ifYouDidNotReceive)}
                                        <a href="#"> {formatMessage(defaultMessages.clickHere)} </a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-2 col-xs-12">
                                <div className={`${css[ "input-wrapper"]}`}>
                                    <input
                                        type="password"
                                        className={otpClasses}
                                        onChange={(ev)=>updateUserDetails({
                                            key:"otp",
                                            value: ev.target.value
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-2 col-xs-12">
                                <button
                                    onClick={certificateSummary ? confirmUpliftManage : asyncCheckOTP}
                                    className="btn btn-success"
                                    type="button"
                                >  {formatMessage(defaultMessages.confirm)}
                                    <img src="m2u/static/icons/foward_arrow_white.svg"  />
                                </button>
                            </div>
                            <div className="col-sm-2 col-xs-12" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

);
};
OneTimePassword.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(OneTimePassword);
