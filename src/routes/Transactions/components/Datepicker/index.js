import React from "react";
import * as css from "./Datepicker.scss";
import { injectIntl, intlShape } from "react-intl";
import DatePicker from "react-bootstrap-date-picker";

export const Datepicker = ({ intl,updateDate,dateValue,dateType}) => {
    const { formatMessage } = intl;
    const dateLableMap = {
        "effectiveDate" : dateValue === new Date().toISOString().substr(0,10).replace(/-/g, "") ? formatMessage({id: "app.details.today"}) : formatMessage({id: "app.details.startDate"}),
        "endDate" : formatMessage({id: "app.details.endDate"}),
        "":formatMessage({id: "app.details.today"})

    };
    const effectiveDate = dateValue && new Date(`${dateValue.substr(0,4)}/${dateValue.substr(4,2)}/${dateValue.substr(6,2)}`).toISOString() || new Date().toISOString();
    const dateLable = dateLableMap[dateValue ? dateType : ""];
    function handleUpdate(key,value) {
            const formattedDate = value.substr(0,10).replace(/-/g, "");
            updateDate({
                key,
                value : formattedDate
            });
    }
    return (
        <div className={css.container}>
            <DatePicker dayLabels={["S","M","T","W","T","F","S"]} weekStartsOnMonday value={effectiveDate} onChange={(value)=>handleUpdate(dateType,value)} dateFormat={"DD/MM/YYYY"}/>
            <img src="m2u/static/icons/calender_icon.svg"/>
        </div>
    );
};
Datepicker.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(Datepicker);