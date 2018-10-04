import React from "react";
import * as css from "../../PaymentModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../RenderDesktopDropdown";
import RenderMobileDropdown from "../../../RenderMobileDropdown";
import Tooltip from "../../../../components/Tooltip";

const defaultMessages = defineMessages({
    epfAccountType: {
        id: "app.transactions.epfAccountType",
        defaultMessage: "EPF Account Type"
    },
    membersName: {
        id: "app.transactions.membersName",
        defaultMessage: "Member's Name"
    },
    epfNumber: {
        id: "app.transactions.epfNumber",
        defaultMessage: "EPF Number"
    },
    icMemberNumber: {
        id: "app.transactions.icMemberNumber",
        defaultMessage: "Member's IC Number"
    }
});

export const EPF = ({intl, tempToSection, getInputData, paymentSummaryData}) => {
    const { formatMessage } = intl;
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    function getEPFType() {
        const list = paymentSummaryData.epfAccountTypes.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj.displayName}</span>
                        </div>,
               "mobileDisplay": obj.displayName,
               "valueToPass": obj
            };
        });
        const currentTitle = !!tempToSection.epfAccountType && paymentSummaryData.epfAccountTypes.find((obj)=>obj.displayName === tempToSection.epfAccountType.displayName) || paymentSummaryData.epfAccountTypes[0];
        return {
            id: "epf_type_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle.displayName}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"epfAccountType", value:obj});},
            list
        };
    }
    return (
        <div>
            <div className={css.greybg}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.epfNumber)}</label>
                        <Tooltip/>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.epfNumber || ""}
                            onChange={handleUpdate.bind(this,"epfNumber")}
                        />
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.epfAccountType)}</label>
                    </div>
                    <div className="col-sm-7">
                        <div className={`hidden-lg hidden-md hidden-sm ${css.dropdownHolder}`}>
                        {
                            <RenderMobileDropdown data={getEPFType()} containerClass={css.containerClass}/>
                        }
                        </div>
                        <div className={`hidden-xs ${css.dropdownHolder}`}>
                        {
                            <RenderDesktopDropdown data={getEPFType()} containerClass={css.containerClass}/>
                        }
                        </div>
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.membersName)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.membersName || ""}
                            onChange={handleUpdate.bind(this,"membersName")}
                        />
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.icMemberNumber)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.icMemberNumber || ""}
                            onChange={handleUpdate.bind(this,"icMemberNumber")}
                        />
                    </div>
                </div>
            </div>
            <div className={css.whitebgNoRadius}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage({id:"app.transactions.payAmount"})}</label>
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
            </div>
        </div>
    );
};

EPF.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(EPF);