import React from "react";
import { Panel, Well} from "react-bootstrap";
import * as css from "./EzyCash.scss";
import { injectIntl, intlShape ,defineMessages} from "react-intl";
const defaultMessages = defineMessages({
    applyNow: {
        id: "app.details.applyNow",
        defaultMessage: "APPLY NOW"
    }
});
export const EzyCash = ({intl, data}) => {

    const { formatMessage } = intl;
    return (
        <div className={css.container}>
            <div className="col-sm-4 col-xs-12 col-md-4">
                <Panel>
                    <div className="container-fluid">
                        <div className="row">
                            <p className={css.primarytext}>{data.primarytext}</p>
                            <p className={css.secondaryText}>{data.secondaryText}</p>
                        </div>
                    </div>
                    <Well>
                        <div className={data.wellClass}>
                            <button className="btn btn-success" onClick={()=>{}}>{formatMessage(defaultMessages.applyNow)}</button>
                        </div>
                    </Well>
                </Panel>
            </div>
        </div>
    );
};
EzyCash.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(EzyCash);