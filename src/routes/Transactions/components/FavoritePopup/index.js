import React from "react";
import * as css from "./FavoritePopup.scss";

export const FavoritePopup = ({intl, toggleFavoritePopup,popupData}) => {
    return (
            <div className={css.popup} onClick={toggleFavoritePopup}>
                {popupData.map( (item, index) => <a onClick={(ev)=>item.action(ev)} key={index}>{item.text}</a>)}
            </div>
        );
};

export default FavoritePopup;
