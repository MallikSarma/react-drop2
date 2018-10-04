import React from "react";
import * as css from "../../TransferModals.scss";
import { injectIntl, intlShape } from "react-intl";
import RenderDesktopDropdown from "../../../RenderDesktopDropdown";
import RenderMobileDropdown from "../../../RenderMobileDropdown";
import Tooltip from "../../../../components/Tooltip";

export const Mobile = ({intl, tempToSection, getInputData, paymentSummaryData}) => {
    const { formatMessage } = intl;
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
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
                        <label>{formatMessage({id:"app.details.mobileNumber"})}</label>
                        <Tooltip/>
                    </div>
                    <div className="col-sm-7">
                        <input
                            className={css["account-number"]}
                            type="text"
                            disabled={tempToSection.isFavourite}
                            value={tempToSection.mobileNumber || ""}
                            onChange={handleUpdate.bind(this,"mobileNumber")}
                        />
                    </div>
                </div>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage({id:"app.details.recipientName"})}</label>
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
            <div className={css.whitebgNoRadius}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage({id:"app.details.transferMode"})}</label>
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
        </div>
    );
};

Mobile.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Mobile);