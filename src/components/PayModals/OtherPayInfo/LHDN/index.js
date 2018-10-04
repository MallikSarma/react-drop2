import React from "react";
import * as css from "../../PaymentModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../RenderDesktopDropdown";
import RenderMobileDropdown from "../../../RenderMobileDropdown";
import Tooltip from "../../../../components/Tooltip";

const defaultMessages = defineMessages({
    taxNumber: {
        id: "app.transactions.taxNumber",
        defaultMessage: "Tax Number"
    },
    paymentCode: {
        id: "app.transactions.paymentCode",
        defaultMessage: "Payment Code"
    },
    assesmentYear: {
        id: "app.transactions.assesmentYear",
        defaultMessage: "Assesment Year"
    },
    instalmentNumber: {
        id: "app.transactions.instalmentNumber",
        defaultMessage: "Instalment Number"
    }
});
export const LHDN = ({intl, tempToSection, getInputData, paymentSummaryData}) => {
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    function getAssesmentYear() {
        const list = paymentSummaryData.lhdnInfo.assessmentYears.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj}</span>
                        </div>,
               "mobileDisplay": obj,
               "valueToPass": obj
            };
        });
        const currentTitle = !!tempToSection.assessmentYear && paymentSummaryData.lhdnInfo.assessmentYears.find((year)=>year === tempToSection.assessmentYear) || paymentSummaryData.lhdnInfo.assessmentYears[0];
        return {
            id: "assesmentYear_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"assessmentYear",value:obj});},
            list
        };
    }
    function getPaymentCode() {
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
            <div className={css.greybg}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.taxNumber)}</label>
                        <Tooltip/>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.taxNumber || ""}
                            onChange={handleUpdate.bind(this,"taxNumber")}
                        />
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.paymentCode)}</label>
                    </div>
                    <div className="col-sm-7">
                        <div className={`hidden-lg hidden-md hidden-sm ${css.dropdownHolder}`}>
                        {
                            <RenderMobileDropdown data={getPaymentCode()} containerClass={css.containerClass}/>
                        }
                        </div>
                        <div className={`hidden-xs ${css.dropdownHolder}`}>
                        {
                            <RenderDesktopDropdown data={getPaymentCode()} containerClass={css.containerClass}/>
                        }
                        </div>
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.assesmentYear)}</label>
                    </div>
                    <div className="col-sm-7">
                        <div className={`hidden-lg hidden-md hidden-sm ${css.dropdownHolder}`}>
                        {
                            <RenderMobileDropdown data={getAssesmentYear()} containerClass={css.containerClass}/>
                        }
                        </div>
                        <div className={`hidden-xs ${css.dropdownHolder}`}>
                        {
                            <RenderDesktopDropdown data={getAssesmentYear()} containerClass={css.containerClass}/>
                        }
                        </div>
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.instalmentNumber)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.instalmentNumber || ""}
                            onChange={handleUpdate.bind(this,"instalmentNumber")}
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

LHDN.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(LHDN);