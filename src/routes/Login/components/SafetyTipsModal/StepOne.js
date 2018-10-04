import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
   step1: {
        id: "app.login.step1",
        defaultMessage: "STEP 1",
    },
    remember: {
        id: "app.remember",
        defaultMessage: "Remember to ALWAYS manually type",
    },
    wwwMaybank2u: {
        id: "app.login.wwwMaybank2u",
        defaultMessage: "www.maybank2u.com.my",
    },
    toAccess: {
        id: "app.login.toAccess",
        defaultMessage: "Maybank2u",
    }

});
export const StepOne = ({intl}) => {
    const { formatMessage } = intl;
    return (
        <div>
            <div>
                <div className="col-md-12">
                    <h4>{formatMessage(defaultMessages.step1)}</h4>
                    <p>
                        <img
                            className="img-responsive"
                            src="m2u/static/img/m2uUrl.png"
                        />
                    </p>
                    <p>{formatMessage(defaultMessages.remember)}</p>
                    <p>
                        <span>{formatMessage(defaultMessages.wwwMaybank2u)} </span>
                        {formatMessage(defaultMessages.toAccess)}
                    </p>
                </div>
            </div>
        </div>
       );
};
StepOne.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(StepOne);
