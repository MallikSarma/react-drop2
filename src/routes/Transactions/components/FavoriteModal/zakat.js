import React from "react";
import * as css from "./FavoriteModal.scss";
import { injectIntl, intlShape } from "react-intl";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
const Zakat = ({
        intl,
        getInputData,
        payDetailsData,
        zakatTypes,
        favoriteInfo
    }) => {
    const { formatMessage } = intl;
    function handleUpdate(key,value) {
        getInputData({
            key,
            value
        });
    }
    function getZakatTypes(){
        const listToMap = payDetailsData.zakatTypes;
        const list = listToMap.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj.type}</span>
                            </div>,
                   "mobileDisplay": obj.type,
                   "valueToPass": obj
                };
        });
        const currentTitle = favoriteInfo.zakatTypes ? favoriteInfo.zakatTypes.type : formatMessage({id: "app.transactions.pleaseSelect"});
        return {
            id: "fav_payee_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{handleUpdate("zakatTypes", obj);},
            list
        };
    }
    return (
        <div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label>{formatMessage({id: "app.transactions.zakatType"})}</label>
                </div>
                <div className="col-md-8">
                    <div className="hidden-md hidden-lg hidden-sm">
                        <RenderMobileDropdown data={getZakatTypes()} containerClass={css.containerClass}/>
                    </div>
                    <div className={`hidden-xs ${css.selectWrapper}`}>
                        <RenderDesktopDropdown data={getZakatTypes()} containerClass={css.containerClass}/>
                    </div>
                </div>
            </div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label className={css.tightLines}>{formatMessage({id: "app.transactions.phoneNumber"})}</label>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["account-number"]}
                        type="text"
                        value={favoriteInfo.phoneNumber || ""}
                        onChange={(ev)=>handleUpdate("phoneNumber", ev.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
Zakat.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Zakat);

