import React from "react";
import { Panel, Well} from "react-bootstrap";
import * as css from "./MessageBox.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    "viewBill":{
        id: "app.inbox.viewBill",
        defaultMessage: "View Bill",
    }
});
export const MessageBox = ({intl,currentMessage, readCurrentMessage, toggleViewBillPdf}) => {
    const {date,type,subject,message, billDetails} = currentMessage;
    const { formatMessage } = intl;
    function viewBill(){
        toggleViewBillPdf();
    }
    return (
        <div className={css.container}>
            <Panel>
                <Well>
                    <div className={css.wellClass}>
                        <span className={`hidden-sm hidden-md hidden-lg ${css.back}`} onClick={readCurrentMessage.bind(this, null)}>{"<"}</span>
                        <div className={css.messageHeader}>
                            <span>{type}</span>
                            <span className={css.delete}>X</span>
                            <span>{date}</span>
                        </div>
                    </div>
                </Well>
                <div className={`container-fluid ${css.messageBody}`}>
                    <div className="row">
                        <p className={css.messageTitle}>{subject}</p>
                        <span className={css.messageText}>{message}</span>
                        { billDetails.billPdfUrl &&
                            <button onClick={viewBill} className="btn btn-success">{formatMessage(defaultMessages.viewBill).toUpperCase()}</button>
                        }
                    </div>
                </div>
            </Panel>
        </div>
    );
};
MessageBox.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(MessageBox);
