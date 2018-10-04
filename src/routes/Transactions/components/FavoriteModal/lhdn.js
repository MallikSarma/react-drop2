import React from "react";
import * as css from "./FavoriteModal.scss";
import { injectIntl, intlShape } from "react-intl";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import Tooltip from "../../../../components/Tooltip";
const Lhdn = ({
        intl,
        getInputData,
        payDetailsData,
        favoriteInfo
    }) => {
    const { formatMessage } = intl;
    function handleUpdate(key,value) {
        getInputData({
            key,
            value
        });
    }
    function getLhdnInfo(){
        const listToMap = payDetailsData.lhdnInfo.paymentCode;
        const list = listToMap.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj.displayName}</span>
                            </div>,
                   "mobileDisplay": obj.displayName,
                   "valueToPass": obj
                };
        });
        const currentTitle = favoriteInfo.paymentCode ? favoriteInfo.paymentCode.displayName : formatMessage({id: "app.transactions.pleaseSelect"});
        return {
            id: "fav_payee_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{handleUpdate("paymentCode", obj);},
            list
        };
    }
    return (
        <div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label className={css.tightLines}>{formatMessage({id: "app.transactions.taxNumber"})}</label>
                    <Tooltip/>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["account-number"]}
                        type="text"
                        value={favoriteInfo.taxNumber || ""}
                        onChange={(ev)=>handleUpdate("taxNumber", ev.target.value)}
                    />
                </div>
            </div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label>{formatMessage({id: "app.transactions.paymentCode"})}</label>
                </div>
                <div className="col-md-8">
                    <div className="hidden-md hidden-lg hidden-sm">
                        <RenderMobileDropdown data={getLhdnInfo()} containerClass={css.containerClass}/>
                    </div>
                    <div className={`hidden-xs ${css.selectWrapper}`}>
                        <RenderDesktopDropdown data={getLhdnInfo()} containerClass={css.containerClass}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
Lhdn.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Lhdn);
