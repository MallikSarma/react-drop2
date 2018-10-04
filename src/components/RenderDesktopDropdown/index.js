import React from "react";
import {DropdownButton, MenuItem } from "react-bootstrap";
import * as css from "./RenderDesktopDropdown.scss";
import { injectIntl, intlShape} from "react-intl";
import classnames from "classnames";

export const RenderDesktopDropdown = ({ intl, data, containerClass}) => {
    function renderMenuItems() {
        if (!data.list){
            console.log(data);
        }
        return data.list.map((el,index)=>
                <MenuItem onClick={data.action.bind(this, el.valueToPass)} key={index}>{el.display}</MenuItem>
            );
    }
    const classes = classnames({
        [css.container] : true,
        [containerClass] : !!containerClass
    });
    let dropDownTitle = data.title;
    dropDownTitle = <span>{dropDownTitle}<img src="m2u/static/icons/open_dropdown.svg" className={css.caret}/></span>;
    return (
        <div className={classes}>
            <DropdownButton title={dropDownTitle} noCaret  id={data.id}>
                {renderMenuItems()}
            </DropdownButton>
        </div>
    );
};
RenderDesktopDropdown.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(RenderDesktopDropdown);