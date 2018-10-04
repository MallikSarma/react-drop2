import React from "react";
import * as css from "../../TransferModals.scss";
import { injectIntl, intlShape } from "react-intl";
import RenderDesktopDropdown from "../../../RenderDesktopDropdown";
import RenderMobileDropdown from "../../../RenderMobileDropdown";
import Tooltip from "../../../../components/Tooltip";

export const Card = ({intl, tempToSection, getInputData, paymentSummaryData}) => {
    const { formatMessage } = intl;
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    function getPayOption() {
        const list = paymentSummaryData.payOptions.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj.displayName}</span>
                        </div>,
               "mobileDisplay": obj.displayName,
               "valueToPass": obj
            };
        });
        const currentTitle = !!tempToSection.payOption && paymentSummaryData.payOptions.find((obj)=>obj.displayName === tempToSection.payOption.displayName) || paymentSummaryData.payOptions[0];
        return {
            id: "pay_option_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle.displayName}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"payOption", value:obj});},
            list
        };
    }
    return (
        <div>
            <div className={css.greybg}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage({id: "app.transactions.cardNumber"})}</label>
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
            </div>
            <div className={css.whitebgNoRadius}>
                <div className={`row ${css.inputPair}`}>
                    <div className="col-sm-5">
                        <label>{formatMessage({id: "app.transactions.payOption"})}</label>
                        <Tooltip/>
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
        </div>
    );
};

Card.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Card);