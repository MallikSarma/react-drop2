import React from "react";
import * as css from "./LoaderNew.scss";

export const LoaderNew = ({intl, loaded, children}) => {

    return (
        <div>
            {
                !loaded &&
                <div className={css.container}>
                   <div className={css.overlay}/>
                   <div className={css.loader}/>
                </div>
                ||
                <div className="loaderChildren">{children}</div>
            }
        </div>
        );
};
export default LoaderNew;
