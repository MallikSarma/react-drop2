import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
   step2: {
        id: "app.login.step2",
        defaultMessage: "STEP 2",
    },
    ifYouRecieveAny: {
        id: "app.ifYouRecieveAny",
        defaultMessage: "If you receive any suspicious emails:",
    },
    doNotClick: {
        id: "app.login.doNotClick",
        defaultMessage: "Do not click",
    },
    onAnyLink: {
        id: "app.login.onAnyLink",
        defaultMessage: "on any link which directs you to Maybank2u.",
    },
    inSomeCases: {
        id: "app.login.inSomeCases",
        defaultMessage: "In some cases, doing so may result in your computer being infected by a malicious software.",
    }

});
export const StepTwo = ({intl}) => {
    const { formatMessage } = intl;
    return (
        <div>
            <div>
                <div className="col-md-12">
                    <h4>{formatMessage(defaultMessages.step2)}</h4>
                    <p>
                        <img
                            className="img-responsive"
                            src="m2u/static/img/malicious-software.png"
                        />
                    </p>
                    <p>{formatMessage(defaultMessages.ifYouRecieveAny)}</p>
                    <p>
                        <span>{formatMessage(defaultMessages.doNotClick)} </span>
                        {formatMessage(defaultMessages.onAnyLink)}
                    </p>
                    <p>{formatMessage(defaultMessages.inSomeCases)}</p>
                </div>
            </div>
        </div>
       );
};
StepTwo.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(StepTwo);
