import React from "react";
import * as css from "./RenderMobileDropdown.scss";
import { injectIntl, intlShape } from "react-intl";

export const RenderMobileDropdown = ({ intl,data}) => {
    function handleOnChangeAction(value) {
        const target = data.list.find(obj=>obj.mobileDisplay === value);
        data.action(target.valueToPass);
    }
    function renderMenuItems() {
        if (!data.list){
            console.log(data)
        }
        return data.list.map((el,index)=>
                <option key={index}>{el.mobileDisplay}</option>
            );
    }
    return (
        <div className={css.container}>
            <div className="form-group">
                <select  className="form-control" onChange={(ev)=>handleOnChangeAction(ev.target.value)}>
                    {renderMenuItems()}
                </select>
            </div>
        </div>
    );
};
RenderMobileDropdown.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(RenderMobileDropdown);