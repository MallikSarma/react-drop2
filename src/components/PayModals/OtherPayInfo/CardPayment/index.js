import React from "react";
import * as css from "../../PaymentModal.scss";
import Tooltip from "../../../../components/Tooltip";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../RenderDesktopDropdown";
import RenderMobileDropdown from "../../../RenderMobileDropdown";
import Toggle from "../../../Toggle";
import Datepicker from "../../../../routes/Transactions/components/Datepicker";
const defaultMessages = defineMessages({
    cardNumber: {
        id: "app.transactions.cardNumber",
        defaultMessage: "Card Number"
    },
    payOption: {
        id: "app.transactions.payOption",
        defaultMessage: "Pay Option"
    },
    totalAmount: {
        id: "app.transactions.totalAmount",
        defaultMessage: "Total Amount"
    },
    reference: {
        id: "app.transactions.reference",
        defaultMessage: "Reference"
    }
});
export const CardPayment = ({intl, tempToSection, getInputData, paymentSummaryData}) => {
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    function handleSwitch() {
        getInputData({
            key: "recurrence",
            value : !tempToSection.recurrence
        });
    }
    function getPayOption() {
        const list = paymentSummaryData.lhdnInfo.paymentCode.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj.displayName}</span>
                        </div>,
               "mobileDisplay": obj.displayName,
               "valueToPass": obj
            };
        });
        const currentTitle = !!tempToSection.paymentCode && paymentSummaryData.lhdnInfo.paymentCode.find((obj)=>obj.displayName === tempToSection.paymentCode.displayName) || paymentSummaryData.lhdnInfo.paymentCode[0];
        return {
            id: "paymentCode_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle.displayName}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"paymentCode", value:obj});},
            list
        };
    }
    const { formatMessage } = intl;
    return (
        <div>
            <div className={css.whitebgNoRadius}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.cardNumber)}</label>
                        <Tooltip/>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.cardNumber || ""}
                            onChange={handleUpdate.bind(this,"cardNumber")}
                        />
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.payOption)}</label>
                    </div>
                    <div className="col-sm-7">
                        <div className={`hidden-lg hidden-md hidden-sm ${css.dropdownHolder}`}>
                        {
                            <RenderMobileDropdown data={getPayOption()} containerClass={css.containerClass}/>
                        }
                        </div>
                        <div className={`hidden-xs ${css.dropdownHolder}`}>
                        {
                            <RenderDesktopDropdown data={getPayOption()} containerClass={css.containerClass}/>
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.whitebgNoRadius}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.totalAmount)}</label>
                        <Tooltip/>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.totalAmount || ""}
                            onChange={handleUpdate.bind(this,"totalAmount")}
                        />
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                         <label>{formatMessage({id: "app.details.effectiveDate"})}</label>
                    </div>
                    <div className="col-sm-7">
                        <Datepicker/>
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5"/>
                    <div className="col-sm-7">
                        <div className={css.recurring}>
                            <Toggle switchState={tempToSection.recurrence} toggleSwitch={handleSwitch}/>
                            <span>{formatMessage({ id: "app.details.setRecurring"})}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.greybg}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.reference)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.reference || ""}
                            onChange={handleUpdate.bind(this,"reference")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
CardPayment.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(CardPayment);