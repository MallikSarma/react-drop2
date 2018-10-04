import React from "react";
import update from "react/lib/update";
import * as css from "./Recipient.scss";
import { Panel } from "react-bootstrap";
import FavoritePopup from "../FavoritePopup";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    payText: {
        id: "app.transactions.payText",
        defaultMessage: "Pay",
    },
    transferText: {
        id: "app.transactions.transferText",
        defaultMessage: "Transfer",
    },
    reloadText: {
        id: "app.transactions.reloadText",
        defaultMessage: "Reload",
    },
    editFavorite: {
        id: "app.transactions.editFavorite",
        defaultMessage: "Edit Details",
    },
    arrangeOrder: {
        id: "app.transactions.arrangeOrder",
        defaultMessage: "Arrange Order",
    },
    removeFavorite: {
        id: "app.transactions.removeFavorite",
        defaultMessage: "Remove Favorite",
    }
});
export const Recipient = ({intl,favoriteInfo, togglePaymentModal,toggleFavoritePopup,toggleFavoriteModal,favoritePopup,index, currentTab}) => {
    const { formatMessage } = intl;
    const {name,payee, accountNumber} = favoriteInfo;
    function getOtherAccountType(obj) {
        const testArray = ["zakat","lhdn","epf","akpk","mygst"];
        return testArray.find(el=>obj[el]);
    }
    const otherTypes = getOtherAccountType(favoriteInfo) || "pay";
     const mapPaymentType = {
        "epf": {
            "id": favoriteInfo.id,
            "name": favoriteInfo.name,
            "epfAccountType":favoriteInfo.epfInfo && favoriteInfo.epfInfo.type || "",
            "epfNumber" :  favoriteInfo.epfInfo && favoriteInfo.epfInfo.number || "",
            "membersName" :  favoriteInfo.epfInfo && favoriteInfo.epfInfo.memberName || "",
            "icMemberNumber" :  favoriteInfo.epfInfo && favoriteInfo.epfInfo.icMemberNumber || "",
            [otherTypes]:true,
            "isFavorite":true
        },
        "akpk":{
            "id": favoriteInfo.id,
            "name": favoriteInfo.name,
            "akpkPaymentType":favoriteInfo.akpkInfo && favoriteInfo.akpkInfo.paymentType || "",
            "mobileNumber":favoriteInfo.akpkInfo && favoriteInfo.akpkInfo.mobileNumber || "",
            "icNumber":favoriteInfo.akpkInfo && favoriteInfo.akpkInfo.icNumber || "",
            [otherTypes]:true,
            "isFavorite":true

        },
        "zakat":{
            "id": favoriteInfo.id,
            "name": favoriteInfo.name,
            "zakatType":favoriteInfo.zakatInfo && favoriteInfo.zakatInfo.type || "",
            "phoneNumber":favoriteInfo.zakatInfo && favoriteInfo.zakatInfo.number || "",
            [otherTypes]:true,
            "isFavorite":true
        },
        "lhdn":{
            "id": favoriteInfo.id,
            "name": favoriteInfo.name,
            "paymentCode":favoriteInfo.lhdnInfo && favoriteInfo.lhdnInfo.paymentCode || "",
            "taxNumber":favoriteInfo.lhdnInfo && favoriteInfo.lhdnInfo.taxNumber || "",
            [otherTypes]:true,
            "notes":[],
            "isFavorite":true
        },
        "mygst":{
            "id": favoriteInfo.id,
            "name": favoriteInfo.name,
            "myGSTAccountNumber":favoriteInfo.mygstInfo && favoriteInfo.mygstInfo.number || "",
            [otherTypes]:true,
            "notes":[],
            "isFavorite":true
        },
        "pay":{
            "id": favoriteInfo.id,
            "name": favoriteInfo.name,
            "open": true,
            "payOption": "pay",
            [otherTypes]:true,
            "accountNumber":"",
            "isFavorite":true
        }
    };
    const tempToSection = mapPaymentType[otherTypes];
    function checkToggleNumber(number,ev){
        ev.stopPropagation();
        toggleFavoritePopup(number);
    }
    const popupActions = {
        pay(ev){
            ev.stopPropagation();
            toggleFavoritePopup();
            togglePaymentModal({tempToSection});
        },
        editFavorite(ev){
            ev.stopPropagation();
            toggleFavoritePopup();
            let tempFavorite = {};
            Object.keys(favoriteInfo).map(obj=>{
                tempFavorite = update(tempFavorite,{
                    [obj]:{$set:favoriteInfo[obj]}
                });
            });
            tempFavorite = update(tempFavorite,{
                nickName:{$set:favoriteInfo.name},
                editMode:{$set:true}
            });
            toggleFavoriteModal(tempFavorite);
        },
       removeFavorite(ev){
            ev.stopPropagation();
            toggleFavoritePopup();
            let tempFavorite = {};
            Object.keys(favoriteInfo).map(obj=>{
                tempFavorite = update(tempFavorite,{
                    [obj]:{$set:favoriteInfo[obj]}
                });
            });
            tempFavorite = update(tempFavorite,{
                nickName:{$set:favoriteInfo.name},
                removeMode:{$set:true}
            });
            toggleFavoriteModal(tempFavorite);
        }
    };
    const popupData = [
        {
            text: currentTab === "pay" ? formatMessage(defaultMessages.payText) :
            (currentTab === "transfer" ? formatMessage(defaultMessages.transferText) :
            formatMessage(defaultMessages.reloadText)),
            action: popupActions.pay
        },
        {
            text: formatMessage(defaultMessages.editFavorite),
            action: popupActions.editFavorite
        },
        {
            text: formatMessage(defaultMessages.removeFavorite),
            action: popupActions.removeFavorite
        }
    ];
    return (
            <div className={`col-xs-12 ${css.container}`}>
                <Panel onClick={togglePaymentModal.bind(this, {tempToSection})}>
                {
                    <div className="row">
                        <div className="col-xs-1">
                            <div className={css.selectFavorite}>
                                <a><img src="m2u/static/icons/input_radio_unselected.svg" /></a>
                            </div>
                        </div>
                        <div className="col-xs-10">
                            <div className={`${css.favoriteContent} ${css.row}`} key={accountNumber}>
                                <span className={css.favoriteName}>{name}</span>
                                <span className={css.payee}>{payee}</span>
                                <span className={css.number}>{accountNumber}</span>
                            </div>
                        </div>
                        <div className={`col-xs-1 ${css.toggleButton}`}>
                            <span className={css.menu}><a onClick={checkToggleNumber.bind(this,favoriteInfo.id)}><img src="m2u/static/icons/show_more.svg" /></a></span>
                            {
                                favoritePopup === index &&
                                <FavoritePopup toggleFavoritePopup={checkToggleNumber.bind(this,favoriteInfo.id)} popupData={popupData}/>
                            }
                        </div>
                    </div>
                }
                </Panel>
            </div>
    );
};
Recipient.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Recipient);