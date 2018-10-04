import React from "react";
import { Panel , Button} from "react-bootstrap";
import * as css from "./NotificationBar.scss";
import { injectIntl, intlShape ,defineMessages} from "react-intl";
const defaultMessages = defineMessages({
    transactionSuccessful: {
        id: "app.dashboard.transactionSuccessful",
        defaultMessage: "Transaction Successful!",
    }
});
export const NotificationBar = ({ intl}) => {
    const { formatMessage} = intl;
    return (
        <div className={css.container} >
            <div className={css.row}>
                <Panel>
                    <div className="col-md-5">
                        <div className={css.transaction_align}>
                            <span className={css.transaction}>{formatMessage(defaultMessages.transactionSuccessful)}</span>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className={css.buttons}>
                            <span className={css.save}><Button bsStyle="primary" bsSize="large">Save Receipt
                                <span className={css.icon}><img src="m2u/static/icons/download.svg" /></span>
                            </Button></span>
                            <span className={css.receipt}><Button bsStyle="primary" bsSize="large">New Payment
                                <span className={css.icon}><img src="m2u/static/icons/add.svg" /></span>
                            </Button></span>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    );
};
NotificationBar.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(NotificationBar);