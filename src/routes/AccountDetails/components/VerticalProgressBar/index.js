import React from "react";
import * as css from "./VericalProgessBar.scss";
const VerticalProgressBar = ({label, now}) => {
    return (
        <div className={css.progressContainer}>
            <div className={css.progress} style={{height: now + "%"}}>
                {label}
            </div>
        </div>);
};

export default VerticalProgressBar;
