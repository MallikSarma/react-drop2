import React from "react";
import * as css from "./FavoriteModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import Tooltip from "../../../../components/Tooltip";
const defaultMessages = defineMessages({
    epfType: {
        id: "app.transactions.epfType",
        defaultMessage: "EPF Account Type"
    },
    membersICNumber: {
        id: "app.transactions.membersICNumber",
        defaultMessage: "Member IC Number"
    }
});

const Epf = ({
        intl,
        getInputData,
        payDetailsData,
        epfAccountTypes,
        favoriteInfo
    }) => {
    const { formatMessage } = intl;
    function handleUpdate(key,value) {
        getInputData({
            key,
            value
        });
    }
    function getEPFType() {
        const list = payDetailsData.epfAccountTypes.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj.displayName}</span>
                        </div>,
               "mobileDisplay": obj.displayName,
               "valueToPass": obj
            };
        });
        const currentTitle = favoriteInfo.epfAccountType && payDetailsData.epfAccountTypes.find((obj)=>obj.displayName === favoriteInfo.epfAccountType.displayName).displayName || formatMessage({id: "app.transactions.pleaseSelect"});
        return {
            id: "epf_type_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"epfAccountType", value:obj});},
            list
        };
    }
    return (
        <div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label>{formatMessage({id: "app.transactions.epfNumber"})}</label>
                    <Tooltip/>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["account-number"]}
                        type="text"
                        value={favoriteInfo.epfNumber || ""}
                        onChange={(ev)=>handleUpdate("epfNumber", ev.target.value)}
                    />
                </div>
            </div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label>{formatMessage(defaultMessages.epfType)}</label>
                </div>
                <div className="col-md-8">
                    <div className="hidden-md hidden-lg hidden-sm">
                        <RenderMobileDropdown data={getEPFType()} containerClass={css.containerClass}/>
                    </div>
                    <div className={`hidden-xs ${css.selectWrapper}`}>
                        <RenderDesktopDropdown data={getEPFType()} containerClass={css.containerClass}/>
                    </div>
                </div>
            </div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label className={css.tightLines}>{formatMessage({id: "app.transactions.membersName"})}</label>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["account-number"]}
                        type="text"
                        value={favoriteInfo.membersName || ""}
                        onChange={(ev)=>handleUpdate("membersName", ev.target.value)}
                    />
                </div>
            </div>
            <div className={`row ${css.inputPair}`}>
                <div className="col-md-4">
                    <label className={css.tightLines}>{formatMessage({id: "app.transactions.icMemberNumber"})}</label>
                </div>
                <div className="col-md-8">
                    <input
                        className={css["account-number"]}
                        type="text"
                        value={favoriteInfo.icMemberNumber || ""}
                        onChange={(ev)=>handleUpdate("icMemberNumber", ev.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
Epf.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Epf);
