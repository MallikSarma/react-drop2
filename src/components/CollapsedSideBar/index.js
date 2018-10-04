import React from "react";
import * as css from "./CollapsedSideBar.scss";
export const CollapsedSideBar = () => (
<div className={` hidden-sm hidden-xs ${css["collapsed-side-panel"]}`}>
    <div className={css["menu-icon"]}><a ><img src="m2u/static/icons/menu.png"/></a></div>
    <div className={css["side-nav-icons"]}>
        <ul>
            <li><img src="m2u/static/icons/oval-selected.png"/></li>
            <li><img src="m2u/static/icons/oval.png"/></li>
            <li><img src="m2u/static/icons/oval.png"/></li>
            <li><img src="m2u/static/icons/oval.png"/></li>
            <li><img src="m2u/static/icons/oval.png"/></li>
            <li><img src="m2u/static/icons/oval.png"/></li>
            <li><img src="m2u/static/icons/oval.png"/></li>
        </ul>
    </div>
</div>
);
export default CollapsedSideBar;
