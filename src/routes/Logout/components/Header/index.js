import React from "react";
import * as css from "./Header.scss";
import { injectIntl, intlShape } from "react-intl";

export const Header = ({intl, navigateToDifferentPages}) => {

    const { formatMessage } = intl;
    return (
        <div className={`row ${css.header_container}`}>
            <div className="row">
                <div className="col-md-12">
                    <nav id="mainNav" className="navbar navbar-default">
                        <div>
                            <div className="navbar-header">
                                <button type="button"  className={`hidden-lg hidden-sm hidden-md ${css[ "navbar-toggle"]} ${css[ "navbar-left"]} `}>
                                    <img className={css.menu} src="m2u/static/icons/menu_white.svg"/>
                                </button>
                                <a className="navbar-brand"
                                    href="#"
                                >
                                    <img className={`img-responsive ${css.logo}`}
                                        src="m2u/static/img/maybank2ulogo.png"
                                    />
                                </a>
                                <button type="button" className={`hidden-lg hidden-sm hidden-md ${css[ "navbar-toggle"]} ${css[ "navbar-right"]} `}>
                                    <img className={css.profile}  src="m2u/static/icons/profile_white.svg" />
                                </button>
                            </div>
                            <div className="navbar-collapse hidden-xs">
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="hidden">
                                        <a href="#"/>
                                    </li>
                                    <li>
                                        <a href="#">{formatMessage({id: "app.login.personal"})}</a>
                                    </li>
                                    <li>
                                        <a href="#">{formatMessage({id: "app.login.business"})}</a>
                                    </li>
                                     <li className={css.loginButton}>
                                        <button type="button" className={css.loginBtn} onClick={navigateToDifferentPages.bind(this, {address: "login"})}>
                                            {formatMessage({id: "app.login.login"})}
                                            <div/>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        );
};
Header.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(Header);
