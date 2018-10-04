import React from "react";
import * as css from "./PopupFixedDeposit.scss";
import { injectIntl, intlShape, defineMessages} from "react-intl";
const defaultMessages = defineMessages({
    upliftment: {
        id: "app.dashboard.upliftment",
        defaultMessage: "Upliftment"
    },
    manage: {
        id: "app.dashboard.manage",
        defaultMessage: "Manage"
    }
});
const PopupFixedDeposit = ({intl, handleUpliftManage, upliftManageFD}) => {
    const { formatMessage } = intl;
    function openUpliftModal(){
        handleUpliftManage.call(this, "uplift");
        upliftManageFD();
    }
    function openManageModal(){
        handleUpliftManage.call(this, "manage");
        upliftManageFD();
    }
    function getData() {
        const data = [
                {
                    text: formatMessage(defaultMessages.upliftment),
                    action: openUpliftModal
                },
                {
                    text: formatMessage(defaultMessages.manage),
                    action: openManageModal
                }
            ];
        return data;
    }
    const data = getData();
    return (
        <div className={css.popup} onClick={(ev)=> ev.stopPropagation()}>
            {data.map( (item, index) => <a key={index} onClick={item.action}>{item.text}</a>)}
        </div>
    );
};
PopupFixedDeposit.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(PopupFixedDeposit);
