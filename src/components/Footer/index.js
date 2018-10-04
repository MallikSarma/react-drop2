import React from "react";
import * as css from "./Footer.scss";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    copyright: {
        id: "app.dashboard.copyright",
        defaultMessage: "All rights reserved.",
    },
    termsConditions: {
        id: "app.dashboard.termsConditions",
        defaultMessage: "Terms & Condition • Security, Privacy & Client Charter • FAQ"
    }
});
export const Footer = ({intl, hideBanner, whiteBackground, accumulatedAmount}) => {
    const { formatMessage } = intl;
    const {bannerDetails} = accumulatedAmount || {};
    const footerClasses = classnames({
        [css.footer]: true,
        [css.whiteBackground]: whiteBackground
    });
    return (
        <div className={`row ${css.footer_wrapper}`}>
            <div className={footerClasses}>
                <div className="container-fluid">
                { !hideBanner &&
                    <div className="row">
                        <div>
                        {
                            bannerDetails &&
                                <div>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-md-1"/>
                                            <a className={`col-xs-12 col-md-10 ${css.footerbannerbox}`} href={bannerDetails.redirectUrl}>
                                                <img className="hidden-xs" src={bannerDetails.accessUrl}/>
                                                <img className="hidden-sm hidden-md hidden-lg" src={bannerDetails.mobileUrl}/>
                                            </a>
                                            <div className="col-md-1"/>
                                        </div>
                                    </div>
                                </div>
                        }
                        </div>
                    </div>
                }
                    <div className={`row ${css.terms} ${css.lower}`}>
                        <div className="col-md-12">
                            <p>&copy; 2016-17 Malayan Banking Berhad (Company No, 3813-K). {formatMessage(defaultMessages.copyright)}</p>
                            <span>{formatMessage(defaultMessages.termsConditions)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   );
};
Footer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Footer);