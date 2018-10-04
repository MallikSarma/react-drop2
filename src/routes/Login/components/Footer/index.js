import React from "react";
import * as css from "./Footer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    openAccount: {
        id: "app.login.openAccount",
        defaultMessage: "Open Account",
    },
   maybankCards: {
        id: "app.login.maybankCards",
        defaultMessage: "Maybank Cards",
    },
   getALoan: {
        id: "app.login.getALoan",
        defaultMessage: "Get a Loan",
    },
    growWealth: {
        id: "app.login.growWealth",
        defaultMessage: "Grow Wealth",
    },
    insureMe: {
        id: "app.login.insureMe",
        defaultMessage: "Insure Me",
    },
    more: {
        id: "app.login.more",
        defaultMessage: "More",
    }
});
export const Footer = ({ intl}) => {
    const { formatMessage } = intl;
    return (
        <div className="row">
            <div className={`row hidden-sm hidden-xs ${css.footer}`}>
                <div className="container">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2">
                                <a href=""><img src="m2u/static/icons/open_door.svg" /></a>
                            </div>
                            <div className="col-md-2">
                                <a href=""><img src="m2u/static/icons/two_credit_cards.svg" /> </a>
                            </div>
                            <div className="col-md-2">
                                <a href=""><img src="m2u/static/icons/my_house.svg" /></a>
                            </div>
                            <div className="col-md-2">
                                <a href=""><img src="m2u/static/icons/nature.svg" /> </a>
                            </div>
                            <div className="col-md-2">
                                <a href=""><img src="m2u/static/icons/weather.svg" /> </a>
                            </div>
                            <div className="col-md-2">
                                <a href=""><img src="m2u/static/icons/show_more.svg" /> </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <span>{formatMessage(defaultMessages.openAccount)}</span>
                            </div>
                            <div className="col-md-2">
                                <span>{formatMessage(defaultMessages.maybankCards)}</span>
                            </div>
                            <div className="col-md-2">
                                <span>{formatMessage(defaultMessages.getALoan)}</span>
                            </div>
                            <div className="col-md-2">
                                <span>{formatMessage(defaultMessages.growWealth)}</span>
                            </div>
                            <div className="col-md-2">
                                <span>{formatMessage(defaultMessages.insureMe)}</span>
                            </div>
                            <div className="col-md-2">
                                <span>{formatMessage(defaultMessages.more)}</span>
                            </div>
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