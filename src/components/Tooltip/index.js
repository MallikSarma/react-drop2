import React from "react";
import * as css from "./Tooltip.scss";
import {OverlayTrigger, Popover} from "react-bootstrap";
export const Tooltip = () => {
    function getMessage(){
        return (
          <Popover id={css.popover}>
            <div> Loren Ipsum</div>
          </Popover>
        );
    }
    return (
        <OverlayTrigger trigger={["hover","click"]} placement="top" overlay={getMessage()} rootClose>
            <span className={`${css.labelIcon}`}>
                <img src="m2u/static/icons/tooltip.svg" alt="help button icon" />
            </span>
        </OverlayTrigger>
    );
};

export default Tooltip;