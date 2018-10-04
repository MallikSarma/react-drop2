import React from "react";
import * as css from "./Header.scss";
import LoginUsername from "../LoginUsername";
import LoginSideBar from "../../../../components/LoginSideBar";
import SecurityPhrase from "../SecurityPhrase";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    personal: {
        id: "app.login.personal",
        defaultMessage: "PERSONAL"
    },
    business: {
        id: "app.login.business",
        defaultMessage: "BUSINESS"
    },
    registerNow: {
        id: "app.login.registerNow",
        defaultMessage: "REGISTER NOW"
    },
    humanisingBusiness: {
        id: "app.login.humanisingBusiness",
        defaultMessage: "Humanising Banking"
    },
    viewProducts: {
        id: "app.login.viewProducts",
        defaultMessage: "VIEW PRODUCTS & SERVICES"
    }

});
export const Header = ({
    intl,
    resetError,
    checkUser,
    incorrectPassword,
    updateUser,
    password,
    updatePassword,
    userDetails,
    confirmUser,
    userConfirmed,
    asyncAuthenticateUser,
    gotoRegister,
    forgotPasswordSuggestion,
    accountInactive,
    forgotCredentialsFlowState,
    userName,
    errorName
}) => {

    const { formatMessage } = intl;
    return (
        <div className={css.container}>
            <div className="col-md-12">
                <nav id="mainNav" className={` navbar navbar-default navbar-fixed-top ${css[ "navbar-default-p"]}`}>
                    <div className="container">
                        {/* Brand and toggle get grouped for better mobile display */}
                        <div className="navbar-header">
                            <button onClick={gotoRegister} type="button" className={`hidden-lg hidden-md hidden-sm ${css[ "navbar-toggle"]} ${css[ "navbar-left"]} `}>
                                <img className={css.menu} src="m2u/static/icons/menu_white.svg" />
                            </button>
                            <a className="navbar-brand page-scroll"
                                href="#page-top"
                            >
                                <img className={`img-responsive ${css.logo}`}
                                    src="m2u/static/icons/m2u_logo.svg"
                                />
                            </a>
                            <button type="button" className={`hidden-lg hidden-md hidden-sm ${css[ "navbar-toggle"]} ${css[ "navbar-right"]} `}>
                                <img className={css.search} src="m2u/static/icons/search_white.svg" />
                            </button>
                        </div>
                        { /* Collect the nav links, forms, and other content for toggling */ }
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className={`nav navbar-nav navbar-right ${css[ "navbar-right-shift"]}`}>
                                <li className="hidden">
                                    <a href="#"/>
                                </li>
                                <li>
                                    <a href="#">{formatMessage(defaultMessages.personal)}</a>
                                </li>
                                <li>
                                    <a href="#">{formatMessage(defaultMessages.business)}</a>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className={`${css.registerBtn}`}
                                        onClick={gotoRegister}
                                    >{formatMessage(defaultMessages.registerNow)}
                                        <div/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className={css.header}>
                    <div className="container">
                        <div className={css[ "intro-text"]}>
                            <div className={css[ "intro-lead-in"]}>{formatMessage(defaultMessages.humanisingBusiness)}</div>
                            { /* Login Form Component */ }
                                { !userDetails &&
                                    <LoginUsername errorName={errorName} resetError={resetError} userName={userName} checkUser={checkUser} updateUser={updateUser} forgotCredentialsFlowState={forgotCredentialsFlowState}/>
                                }
                        </div>
                    </div>
                </div>
            </div>
            <LoginSideBar />
            { !forgotPasswordSuggestion &&
                <SecurityPhrase
                    resetError={resetError}
                    errorName={errorName}
                    accountInactive={accountInactive}
                    forgotCredentialsFlowState={forgotCredentialsFlowState}
                    incorrectPassword={incorrectPassword}
                    userDetails={userDetails}
                    confirmUser={confirmUser}
                    userConfirmed={userConfirmed}
                    password={password}
                    updatePassword={updatePassword}
                    asyncAuthenticateUser={asyncAuthenticateUser}
                />
            }
            <div className={`row hidden-lg hidden-md ${css[ "footer-link"]}`}>
                <p> <a>{formatMessage(defaultMessages.viewProducts)}</a> </p>
            </div>
        </div>

        );
};
Header.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(Header);
