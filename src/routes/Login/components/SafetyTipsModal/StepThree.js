import React from "react";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
   step3: {
        id: "app.login.step3",
        defaultMessage: "STEP 3",
    },
    pleaseEnsure: {
        id: "app.pleaseEnsure",
        defaultMessage: "Please ensure your",
    },
    securityImage: {
        id: "app.login.securityImage",
        defaultMessage: "SECURITY IMAGE",
    },
    and: {
        id: "app.login.and",
        defaultMessage: "and",
    },
    keyPhrase: {
        id: "app.login.keyPhrase",
        defaultMessage: "KEY PHRASE",
    },
    areCorrect: {
        id: "app.login.areCorrect",
        defaultMessage: "are correct before you key in your password.",
    }
});
export const StepThree = ({intl}) => {
    const { formatMessage } = intl;
    return (
        <div>
            <div>
                <div className="col-md-12">
                    <h4>{formatMessage(defaultMessages.step3)}</h4>
                    <p>
                        <img
                            className="img-responsive"
                            src="m2u/static/img/phrase-happy.png"
                        />
                    </p>
                    <p>
                        {formatMessage(defaultMessages.pleaseEnsure)}
                         <span> {formatMessage(defaultMessages.securityImage)} </span>
                        {formatMessage(defaultMessages.and)}
                        <span> {formatMessage(defaultMessages.keyPhrase)}</span>
                    </p>
                    <p>
                        {formatMessage(defaultMessages.areCorrect)}
                    </p>
                </div>
            </div>
        </div>
       );
};
StepThree.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(StepThree);
