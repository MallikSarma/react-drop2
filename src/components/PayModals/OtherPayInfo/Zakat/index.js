import React from "react";
import * as css from "../../PaymentModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../RenderDesktopDropdown";
import RenderMobileDropdown from "../../../RenderMobileDropdown";

const defaultMessages = defineMessages({
    payAmount: {
        id: "app.transactions.payAmount",
        defaultMessage: "Pay Amount",
    },
    zakatType: {
        id: "app.transactions.zakatType",
        defaultMessage: "Zakat Type",
    },
    phoneNumber: {
        id: "app.transactions.phoneNumber",
        defaultMessage: "Phone Number",
    },
});

export const Zakat = ({intl, tempToSection, getInputData, paymentSummaryData}) => {
	const { formatMessage } = intl;
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    function getZakatType() {
        const list = paymentSummaryData.zakatTypes.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj.type}</span>
                        </div>,
               "mobileDisplay": obj.type,
               "valueToPass": obj
            };
        });
        const currentTitle = !!tempToSection.zakatType && paymentSummaryData.zakatTypes.find((obj)=>obj.type === tempToSection.zakatType.type) || paymentSummaryData.zakatTypes[0];
        return {
            id: "zakat_type_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle.type}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"zakatType", value:obj});},
            list
        };
    }
	return (
		<div>
            <div className={css.greybg}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                         <label>{formatMessage(defaultMessages.zakatType)}</label>
                    </div>
                    <div className="col-sm-7">
                            <div className={`hidden-lg hidden-md hidden-sm ${css.dropdownHolder}`}>
                            {
                                <RenderMobileDropdown data={getZakatType()} containerClass={css.containerClass}/>
                            }
                            </div>
                            <div className={`hidden-xs ${css.dropdownHolder}`}>
                            {
                                <RenderDesktopDropdown data={getZakatType()} containerClass={css.containerClass}/>
                            }
                            </div>
                        </div>
                </div>
            </div>
            <div className={css.whitebgNoRadius}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.payAmount)}</label>
                    </div>
                    <div className="col-sm-7">
                        <span className={css.inputCurrency}>{paymentSummaryData.currency}</span>
                        <input
                            className={css["input-with-lable"]}
                            type="text"
                            value={tempToSection.amount || ""}
                            onChange={handleUpdate.bind(this,"amount")}
                        />
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.phoneNumber)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.phoneNumber || ""}
                            onChange={handleUpdate.bind(this,"phoneNumber")}
                        />
                    </div>
                </div>
            </div>
		</div>
	);
};

Zakat.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Zakat);