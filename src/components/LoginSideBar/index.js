import React from "react";
import * as css from "./LoginSideBar.scss";
export const LoginSideBar = () => (
<div className={` hidden-sm hidden-xs ${css["collapsed-side-panel"]}`}>
    <div className={css["menu-icon"]}><img src="m2u/static/icons/menu_white.svg"/></div>
    <div className={css["side-nav-icons"]}>
        <ul>
            <li><img src="m2u/static/icons/oval_selected.svg"/></li>
            <li><img src="m2u/static/icons/oval.svg"/></li>
            <li><img src="m2u/static/icons/oval.svg"/></li>
            <li><img src="m2u/static/icons/oval.svg"/></li>
            <li><img src="m2u/static/icons/oval.svg"/></li>
            <li><img src="m2u/static/icons/oval.svg"/></li>
            <li><img src="m2u/static/icons/oval.svg"/></li>
        </ul>
    </div>
</div>
);
export default LoginSideBar;
