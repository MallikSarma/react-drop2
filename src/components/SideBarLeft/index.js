import React from "react";
import * as css from "./SideBarLeft.scss";
import { injectIntl, intlShape } from "react-intl";
import classnames from "classnames";

export const SideBarLeft = ({intl, mobile, lastLogin, currentPage, handleNavigation, toggleSearchModal, leftMenuButtonClick}) => {
    const { formatMessage } = intl;
    const classes = classnames({
        "hidden-sm": !mobile,
        "hidden-xs": !mobile,
        [css.side_bar_wrapper]: true
    });
    function getClasses(option) {
        return classnames({
            active: currentPage === option
        });
    }
    return (
        <div className={classes}>
                <div className="navbar-default">
                    <ul className="nav navbar-nav">
                        <li onClick={handleNavigation.bind(this, { address: "dashboard/saved/",same: currentPage === "accounts"})}>
                            <a className={getClasses("accounts")}>{formatMessage({id: "app.login.myAccounts"})}</a>
                        </li>
                        <li onClick={handleNavigation.bind(this, { address: "transactions/",same: currentPage === "pay&Transfer"})}>
                            <a className={getClasses("pay&Transfer")}>{formatMessage({id: "app.login.payTransfer"})}</a>
                        </li>
                        <li>
                            <a href="#">{formatMessage({id: "app.login.apply"})}</a>
                        </li>
                        <li style={{border: "none"}}>
                            <div className={`${css.icon_container}`}>
                                <img  src="m2u/static/icons/clock_white.svg"/>
                                <span>{formatMessage({id: "app.login.myLastLogin"})}</span>
                                <div className={css.lastLogin}>
                                    <span> {lastLogin.date}</span>
                                    <span className={css.time}> {lastLogin.time}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
        </div>
    );
};
SideBarLeft.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(SideBarLeft);
