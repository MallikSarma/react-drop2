import React from "react";
import * as css from "./Navigation.scss";

export const Navigation = ({
    checkUser,
    updateUser,
    userDetails,
    confirmUser,
    userConfirmed
}) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <nav id="mainNav" className={` navbar navbar-default navbar-fixed-top ${css[ "navbar-default-p"]}`}>
                    <div className="container">
                        {/* Brand and toggle get grouped for better mobile display */}
                        <div className="navbar-header">
                            <button type="button" className={`hidden-lg hidden-md hidden-sm ${css[ "navbar-toggle"]} ${css[ "navbar-left"]} `}>
                                <img className={css.menu} src="m2u/static/icons/menu_white.svg" />
                            </button>
                            <a className="navbar-brand page-scroll" href="#page-top"><img className={`img-responsive ${css.logo}`} src="m2u/static/img/maybank2ulogo.png" /> </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};


export default Navigation;
