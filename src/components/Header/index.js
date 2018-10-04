import React from "react";
import * as css from "./Header.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
const defaultMessages = defineMessages({
    myAccounts: {
        id: "app.login.myAccounts",
        defaultMessage: "MY ACCOUNTS"
    },
    payTransfer: {
        id: "app.login.payTransfer",
        defaultMessage: "PAY & TRANSFER"
    },
    apply: {
        id: "app.login.apply",
        defaultMessage: "APPLY"
    },
    myLastLogin: {
        id: "app.login.myLastLogin",
        defaultMessage: "MY LAST LOGIN"
    }
});
export const Header = ({intl, currentPage, showSideBar, menuButtonClick,leftMenuButtonClick, userProfile, navigateToDifferentPages, toggleSearchModal}) => {

    const { formatMessage } = intl;
    function getClasses(option) {
        return classnames({
            active: currentPage === option
        });
    }
    const containerClass = classnames({
        [css.withSide]: currentPage === "pay&Transfer",
        [css.header_container]: true,
    });
    const headerBGStyle = {
        backgroundImage: "url(" + userProfile.backdropPath + ")",
    };
    return (
        <div className={containerClass} style={headerBGStyle}>
            <div className="row">
                <div className="col-md-12">
                    <nav id="mainNav" className="navbar navbar-default">
                        <div>
                            <div className="navbar-header">
                                <button type="button"  className={`hidden-lg hidden-md hidden-sm ${css[ "navbar-toggle"]} ${css[ "navbar-left"]} `} onClick={leftMenuButtonClick}>
                                    <img className={css.menu} src="m2u/static/icons/menu_white.svg"/>
                                </button>
                                <a className="navbar-brand">
                                    <img className={`img-responsive ${css.logo}`}
                                        src="m2u/static/icons/m2u_logo.svg"
                                    />
                                </a>
                                <button type="button" onClick={menuButtonClick} className={`hidden-lg ${css[ "navbar-toggle"]} ${css[ "navbar-right"]} `}>
                                    <img className={css.profile}  src="m2u/static/icons/profile_white.svg" />
                                </button>
                            </div>
                            <div className="navbar-collapse hidden-xs">
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="hidden">
                                        <a/>
                                    </li>
                                    <li onClick={navigateToDifferentPages.bind(this, { address: "dashboard/saved/",same: currentPage === "accounts"})}>
                                        <a className={getClasses("accounts")}>{formatMessage(defaultMessages.myAccounts)}</a>
                                    </li>
                                    <li onClick={navigateToDifferentPages.bind(this, { address: "transactions/",same: currentPage === "pay&Transfer"})}>
                                        <a className={getClasses("pay&Transfer")}>{formatMessage(defaultMessages.payTransfer)}</a>
                                    </li>
                                     <li>
                                        <a>{formatMessage(defaultMessages.apply)}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`row hidden-xs ${css.login_history_container}`}>
                            <div className="col-md-12">
                                <div className={`${css.icon_container}`}>
                                    <img  src="m2u/static/icons/clock_white.svg"/>
                                    <span>{formatMessage(defaultMessages.myLastLogin)}</span>
                                    <span> {userProfile.lastLoginDate}</span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            { currentPage === "pay&Transfer" &&
                <div>
                    { !showSideBar ?
                            <div className={` hidden-sm hidden-xs hidden-md ${css.collapsed}`}>
                                <div className={`hidden-xs hidden-sm ${css.searchButton}`}>
                                    <span onClick={toggleSearchModal}>
                                        <img src="m2u/static/icons/search.svg" />
                                    </span>
                                </div>
                                <button type="button" onClick={menuButtonClick} className={`${css[ "navbar-toggle"]}`}>
                                    <img className={css.profile}  src="m2u/static/icons/profile_white.svg" />
                                </button>
                            </div>
                        :
                        ""
                    }
                </div>
            }
        </div>
        );
};
Header.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Header);
