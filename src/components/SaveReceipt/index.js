import React from "react";
import * as css from "./SaveReceipt.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    transactionCompleted: {
        id: "app.details.transactionCompleted",
        defaultMessage: "Transaction Completed",
    },
    saveReceipt: {
        id: "app.details.saveReceipt",
        defaultMessage: "Save Receipt",
    }
});
export const SaveReceipt = ({intl, doneGoBack, certificateSummary, redrawSummary, quickPaySummary}) => {
    const {formatMessage} = intl;
    const summaryData = redrawSummary || certificateSummary || quickPaySummary;
    return (
<div>
    <div className={`${css[ "save-wrapper"]} put-in-modal`}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12"/>
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                    <div className={` ${css["save-right-wrapper"]}`}>
                        <div className="row">
                            <div className="col-sm-1"/>
                            <div className="col-lg-3 col-md-4 col-sm-3 col-xs-12">
                                <div className={`hidden-xs ${css["save-heading-wrapper"]}`}>
                                    <h6>{formatMessage(defaultMessages.transactionCompleted)}</h6>
                                </div>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 hidden-xs hidden-sm" />
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <a
                                    target = "_blank"
                                    href={summaryData && summaryData.recieptPDF || ""}
                                    className="btn btn-default"
                                >  {formatMessage(defaultMessages.saveReceipt).toUpperCase()}
                                    <img src="m2u/static/icons/download.svg"  />
                                </a>

                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                <button
                                    onClick={doneGoBack}
                                    className="btn btn-success"
                                    type="button"
                                >  {formatMessage({id:"app.personalize.done"})}
                                    <img src="m2u/static/icons/foward_arrow_white.svg"  />
                                </button>
                            </div>
                            <div className="col-sm-2"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12"/>
            </div>
        </div>
    </div>
</div>

);
};
SaveReceipt.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(SaveReceipt);
