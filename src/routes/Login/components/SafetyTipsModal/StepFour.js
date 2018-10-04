import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
   step4: {
        id: "app.login.step4",
        defaultMessage: "STEP 4",
    },
    always: {
        id: "app.always",
        defaultMessage: "always",
    },
    fromMaybank2u: {
        id: "app.login.fromMaybank2u",
        defaultMessage: "from Maybank2u after completing your transactions.",
    }
});
export const StepFour = ({intl}) => {
    const { formatMessage } = intl;
    return (
        <div>
            <div>
                <div className="col-md-12">
                    <h4>{formatMessage(defaultMessages.step4)}</h4>
                    <p>
                        <img
                            className="img-responsive"
                            src="m2u/static/img/logout.png"
                        />
                    </p>
                    <p>
                        {formatMessage(defaultMessages.always)}
                         <span> {formatMessage({id: "app.dashboard.logout"})} </span>
                        {formatMessage(defaultMessages.fromMaybank2u)}
                    </p>
                </div>
            </div>
        </div>
       );
};
StepFour.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(StepFour);
