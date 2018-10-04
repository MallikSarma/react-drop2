import React from "react";
import * as css from "../../TransferModals.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../RenderDesktopDropdown";
import RenderMobileDropdown from "../../../RenderMobileDropdown";
import Tooltip from "../../../../components/Tooltip";

const defaultMessages = defineMessages({
    recipientName: {
        id: "app.details.recipientName",
        defaultMessage: "Recipient's Name"
    },
    transactionType: {
        id: "app.details.transactionType",
        defaultMessage: "Transaction Type"
    },
    transferMode: {
        id: "app.details.transferMode",
        defaultMessage: "Transfer Mode"
    }
});

export const ITIBG = ({intl, tempToSection, getInputData, paymentSummaryData}) => {
    const { formatMessage } = intl;
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    function getTransactionType() {
        const list = paymentSummaryData.transactionTypes.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj.displayName}</span>
                        </div>,
               "mobileDisplay": obj.displayName,
               "valueToPass": obj
            };
        });
        const currentTitle = !!tempToSection.transactionType && paymentSummaryData.transactionTypes.find((obj)=>obj.displayName === tempToSection.transactionType.displayName) || paymentSummaryData.transactionTypes[0];
        return {
            id: "transaction_type_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle.displayName}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"transactionType", value:obj});},
            list
        };
    }
    function getTransferMode() {
        const list = paymentSummaryData.transferModes.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj.displayName}</span>
                        </div>,
               "mobileDisplay": obj.displayName,
               "valueToPass": obj
            };
        });
        const currentTitle = !!tempToSection.transferMode && paymentSummaryData.transferModes.find((obj)=>obj.displayName === tempToSection.transferMode.displayName) || paymentSummaryData.transferModes[0];
        return {
            id: "transfer_mode_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle.displayName}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"transferMode", value:obj});},
            list
        };
    }
    return (
        <div>
            <div className={css.greybg}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage(defaultMessages.recipientName)}</label>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            value={tempToSection.name || ""}
                            onChange={handleUpdate.bind(this,"name")}
                        />
                    </div>
                </div>
            </div>
            {
                !tempToSection.thirdParty &&
                <div className={css.whitebgNoRadius}>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-sm-5">
                            <label>{formatMessage(defaultMessages.transactionType)}</label>
                        </div>
                        <div className="col-sm-7">
                            <div className={`hidden-lg hidden-md hidden-sm ${css.dropdownHolder}`}>
                            {
                                <RenderMobileDropdown data={getTransactionType()} containerClass={css.containerClass}/>
                            }
                            </div>
                            <div className={`hidden-xs ${css.dropdownHolder}`}>
                            {
                                <RenderDesktopDropdown data={getTransactionType()} containerClass={css.containerClass}/>
                            }
                            </div>
                        </div>
                    </div>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-sm-5">
                            <label>{formatMessage(defaultMessages.transferMode)}</label>
                            <Tooltip/>
                        </div>
                        <div className="col-sm-7">
                           <div className={`hidden-lg hidden-md hidden-sm ${css.dropdownHolder}`}>
                            {
                                <RenderMobileDropdown data={getTransferMode()} containerClass={css.containerClass}/>
                            }
                            </div>
                            <div className={`hidden-xs ${css.dropdownHolder}`}>
                            {
                                <RenderDesktopDropdown data={getTransferMode()} containerClass={css.containerClass}/>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

ITIBG.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(ITIBG);