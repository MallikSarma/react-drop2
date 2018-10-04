import React from "react";
import * as css from "./Toggle.scss";
import { injectIntl, intlShape } from "react-intl";
import classnames from "classnames";
export const Toggle = ({intl, switchState, toggleSwitch}) => {
    const containerClasses = classnames({
        [css.container]: true,
        [css.active]: switchState
    });
    return (
        <div onClick={toggleSwitch} className={containerClasses}>
            <div  className={css.circle}/>
        </div>
   );
};
Toggle.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Toggle);