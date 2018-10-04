import React from "react";
import * as css from "./Confirm.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    pleaseConfirm: {
        id: "app.details.pleaseConfirm",
        defaultMessage: "Please confirm your details"
    },
    requestTac: {
        id: "app.details.requestTac",
        defaultMessage: "REQUEST TAC"
    },
    requestTacMsg: {
        id: "app.details.requestTacMsg",
        defaultMessage: "To proceed with this payment, please request and insert your TAC number"
    }
});
export const Confirm = ({intl, fd, tacRequest, confirmDetails, asyncConfirmRedraw, certificateSummary, redrawSummary, asyncConfirmMakePlacement, asyncConfirmQuickPay, quickPaySummary}) => {
    const {formatMessage} = intl;
    function confirmRedrawSummary(){
        confirmDetails();
        asyncConfirmRedraw();
    }
    function confirmMakePlacementSummary(){
        confirmDetails();
        asyncConfirmMakePlacement();
    }
    function confirmQuickPay(){
        confirmDetails();
        asyncConfirmQuickPay();
    }
    return (
        <div>
            <div className={`${css[ "confirm-wrapper"]} put-in-modal`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2 col-xs-12"/>
                        <div className="col-sm-8 col-xs-12">
                            <div className={` ${css["confirm-right-wrapper"]}`}>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-6">
                                        <div className={`hidden-xs ${css["confirm-heading-wrapper"]}`}>
                                            <h6>{formatMessage(defaultMessages.pleaseConfirm)}</h6>
                                            {
                                                tacRequest &&
                                                <div className={`hidden-xs ${css["tac-msg"]}`}>
                                                    {formatMessage(defaultMessages.requestTacMsg)}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xs-12">
                                        <button
                                            onClick={certificateSummary && confirmMakePlacementSummary  || redrawSummary && confirmRedrawSummary || quickPaySummary && confirmQuickPay}
                                            className="btn btn-success"
                                            type="button"
                                        >  { tacRequest && formatMessage(defaultMessages.requestTac) || formatMessage({id: "app.registration.confirm"})}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2 col-xs-12"/>
                    </div>
                </div>
            </div>
        </div>
);
};
Confirm.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(Confirm);
