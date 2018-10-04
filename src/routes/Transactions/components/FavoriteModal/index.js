import React from "react";
import * as css from "./FavoriteModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { Button, Modal } from "react-bootstrap";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import Tooltip from "../../../../components/Tooltip";
import Zakat from "./zakat.js";
import Mygst from "./mygst.js";
import Epf from "./epf.js";
import Akpk from "./akpk.js";
import Lhdn from "./lhdn.js";
import Reload from "./reload.js";
import classnames from "classnames";
const defaultMessages = defineMessages({
    nickName: {
        id: "app.transactions.nickName",
        defaultMessage: "Nick Name"
    },
    billerCode: {
        id: "app.transactions.billerCode",
        defaultMessage: "Biller Code"
    },
    payee: {
        id: "app.transactions.payee",
        defaultMessage: "Payee"
    },
    ref1: {
        id: "app.transactions.ref1",
        defaultMessage: "Ref-1"
    },
    ref2: {
        id: "app.transactions.ref2",
        defaultMessage: "Ref-2"
    },
    accountNumber: {
        id: "app.transactions.accountNumber",
        defaultMessage: "Account Number"
    },
    registerBill: {
        id: "app.transactions.registerBill",
        defaultMessage: "Register Bill"
    },
    addBtn: {
        id: "app.transactions.addBtn",
        defaultMessage: "ADD"
    },
    saveBtn: {
        id: "app.transactions.saveBtn",
        defaultMessage: "SAVE"
    },
    removeFavoriteBtn: {
        id: "app.transactions.removeFavoriteBtn",
        defaultMessage: "REMOVE FAVORITE X"
    },
    name: {
        id: "app.transactions.name",
        defaultMessage: "Pay To"
    },
    pleaseSelect: {
        id: "app.transactions.pleaseSelect",
        defaultMessage: "Please Select"
    },
    accountHolder: {
        id: "app.transactions.accountHolder",
        defaultMessage: "Account Holder"
    },
    termsAndConditions: {
        id: "app.transactions.termsAndConditions",
        defaultMessage: "Terms And Conditions"
    },
    iAccept: {
        id: "app.transactions.iAccept",
        defaultMessage: "iAccept"
    },
    editFavoriteTitle: {
        id: "app.transactions.editFavoriteTitle",
        defaultMessage: "Edit Favorite"
    },
    removeFavoriteTitle: {
        id: "app.transactions.removeFavoriteTitle",
        defaultMessage: "Remove Favorite"
    }

});

export const FavoriteModal = ({
        intl,
        resetError,
        errorName,
        toggleFavoriteModal,
        asyncToggleFavoriteModal,
        asyncToggleJompayModal,
        inputData,
        getInputData,
        payDetailsData,
        favoriteInfo,
        jompay,
        payeeList,
        showSummary,
        currentTab,
        paymentSummaryData
    }) => {
    const { formatMessage } = intl;
    function handleUpdate(key,value) {
        getInputData({
            key,
            value
        });
    }
    function updateJompayRefList(index,ev) {
        getInputData({
            key: "jompayRefList",
            value : favoriteInfo.jompayRefList.map((el,key)=>{
                if (key === index){
                    return ev.target.value;
                }
                return el;
            })
        });
    }
    function getFavPayee(){
        const list = payeeList.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj.name}</span>
                            </div>,
                   "mobileDisplay": obj.name,
                   "valueToPass": obj
                };
        });
        const currentTitle = favoriteInfo.favouritePayee ? favoriteInfo.favouritePayee.name : formatMessage(defaultMessages.pleaseSelect);
        return {
            id: "fav_payee_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{handleUpdate("favouritePayee", obj);},
            list
        };
    }
    const nickNameClasses = classnames({
        [css["account-number"]]: true,
        [css.error]: errorName === "nickNameError"
    });
    const {zakat, lhdn,akpk,mygst,epf} = favoriteInfo.favouritePayee || {};
    function handleJomPayKeyDown(ev){
        if (ev.keyCode === 13){
            asyncToggleJompayModal(true);
        }
    }
    function toggleAction(){
        favoriteInfo.successMessages = favoriteInfo.editMode ? "editFavorite" :
                        (favoriteInfo.removeMode ? "removeFavorite" : null);
        asyncToggleFavoriteModal({favoriteInfo});
    }
    const billRegisterRequired =  !(zakat || akpk || mygst || epf || lhdn ) && favoriteInfo.favouritePayee && true;
    const actionBtnText = favoriteInfo.editMode ? formatMessage(defaultMessages.saveBtn) :
                        (favoriteInfo.removeMode ? formatMessage(defaultMessages.removeFavoriteBtn) : formatMessage(defaultMessages.addBtn));
    const titleText = favoriteInfo.editMode ? formatMessage(defaultMessages.editFavoriteTitle) :
    (favoriteInfo.removeMode ? formatMessage(defaultMessages.removeFavoriteTitle) : formatMessage({id:"app.transactions.addNewFavorite"}));
    return (
        <div>
            <Modal show className={css.container}>
                <Modal.Header>
                    <span className={css.title}>{titleText}</span>
                    <span className={css.close} onClick={()=>toggleFavoriteModal()} />
                </Modal.Header>
                <Modal.Body>
                    <div className={css.greybg}>
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-md-4">
                                <label>{formatMessage(defaultMessages.nickName)}</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    className={nickNameClasses}
                                    type="text"
                                    onChange={(ev)=>handleUpdate("nickName", ev.target.value)}
                                    value={favoriteInfo.nickName || ""}
                                    onFocus={resetError}
                                    disabled={favoriteInfo.removeMode}
                                />
                            </div>
                        </div>
                        {
                            !jompay && !(favoriteInfo.editMode || favoriteInfo.removeMode) && currentTab === "pay" &&
                            <div className={`row ${css.inputPair}`}>
                                <div className="col-md-4">
                                    <label>{formatMessage(defaultMessages.payee)}</label>
                                </div>
                                <div className="col-md-8">
                                    <div className="hidden-md hidden-lg hidden-sm">
                                        <RenderMobileDropdown data={getFavPayee()} containerClass={css.containerClass}/>
                                    </div>
                                    <div className={`hidden-xs ${css.selectWrapper}`}>
                                        <RenderDesktopDropdown data={getFavPayee()} containerClass={css.containerClass}/>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            (favoriteInfo.editMode || favoriteInfo.removeMode) && currentTab === "pay" &&
                            <div className={`row ${css.inputPair}`}>
                                <div className="col-md-4">
                                    <label>{formatMessage(defaultMessages.payee)}</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        className={css["account-number"]}
                                        type="text"
                                        value={favoriteInfo.payee || ""}
                                        disabled
                                    />
                                </div>
                            </div>
                        }
                        {
                            jompay &&
                            <div>
                                <div className={`row ${css.inputPair}`}>
                                    <div className="col-md-4">
                                        <label>{formatMessage(defaultMessages.billerCode)}</label>
                                        <Tooltip/>
                                     </div>
                                    <div className="col-md-8">
                                        <input
                                            className={css["account-number"]}
                                            type="text"
                                            value={favoriteInfo.billerCode || ""}
                                            onChange={(ev)=>handleUpdate("billerCode", ev.target.value)}
                                            onKeyDown={handleJomPayKeyDown}
                                            readOnly={favoriteInfo ? !!favoriteInfo.name : false}
                                            disabled={showSummary || favoriteInfo.editMode || favoriteInfo.removeMode}
                                        />
                                    </div>
                                </div>
                                <div className={`row ${css.inputPair}`}>
                                    <div className="col-md-4">
                                        <label>{formatMessage(defaultMessages.payee)}</label>
                                        <Tooltip/>
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            className={css["account-number"]}
                                            type="text"
                                            value={favoriteInfo.name || ""}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className={`row ${css.inputPair}`}>
                                    <div className="col-md-4">
                                        <label>{formatMessage(defaultMessages.ref1)}</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            className={css["account-number"]}
                                            type="text"
                                            value={favoriteInfo.jompayRefList ? favoriteInfo.jompayRefList[0] : ""}
                                            onChange={updateJompayRefList.bind(this, 0)}
                                            disabled={showSummary}
                                        />
                                    </div>
                                </div>
                                <div className={`row ${css.inputPair}`}>
                                    <div className="col-md-4">
                                        <label>{formatMessage(defaultMessages.ref2)}</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input
                                            className={css["account-number"]}
                                            type="text"
                                            value={favoriteInfo.jompayRefList ? favoriteInfo.jompayRefList[1] : ""}
                                            onChange={updateJompayRefList.bind(this, 1)}
                                            disabled={showSummary}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            zakat && favoriteInfo.favouritePayee &&
                            <Zakat getInputData={getInputData} favoriteInfo={favoriteInfo} payDetailsData={payDetailsData}/>
                        }
                        {
                            mygst && favoriteInfo.favouritePayee &&
                            <Mygst getInputData={getInputData} favoriteInfo={favoriteInfo}/>
                        }
                        {
                            epf && favoriteInfo.favouritePayee &&
                            <Epf getInputData={getInputData} favoriteInfo={favoriteInfo} payDetailsData={payDetailsData}/>
                        }
                        {
                            akpk && favoriteInfo.favouritePayee &&
                            <Akpk getInputData={getInputData} favoriteInfo={favoriteInfo} payDetailsData={payDetailsData}/>
                        }
                        {
                            lhdn && favoriteInfo.favouritePayee &&
                            <Lhdn getInputData={getInputData} favoriteInfo={favoriteInfo} payDetailsData={payDetailsData}/>
                        }
                        {
                            currentTab === "reload" &&
                            <Reload getInputData={getInputData} favoriteInfo={favoriteInfo} payDetailsData={payDetailsData}/>
                        }
                        {
                            !(zakat || akpk || mygst || epf || lhdn || jompay || currentTab === "reload") &&
                            <div className={`row ${css.inputPair}`}>
                                <div className="col-md-4">
                                    <label className={css.tightLines}>{formatMessage({id: "app.transactions.accountNumber"})}</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        className={css["account-number"]}
                                        type="text"
                                        value={favoriteInfo.accountNumber || ""}
                                        onChange={(ev)=>handleUpdate("accountNumber", ev.target.value)}
                                        disabled={favoriteInfo.removeMode}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    {
                        billRegisterRequired &&
                        currentTab !== "reload" &&
                        <div className={css.billRegisterContainer}>
                            <div className={`row ${css.inputPair}`} onClick={(ev)=>handleUpdate("billRegister", !favoriteInfo.billRegister)}>
                                <div className={css.flexWrapper}>
                                {
                                    favoriteInfo.billRegister &&
                                    <div className={css.radioButton}>
                                        <img src="m2u/static/icons/radio_selected.svg"/>
                                    </div>
                                    ||
                                    <div className={css.radioButton}>
                                        <img src="m2u/static/icons/radio_button.svg"/>
                                    </div>
                                }
                                    <label className={css.billLabel}>{formatMessage(defaultMessages.registerBill)}</label>
                                </div>
                            </div>
                            {
                                favoriteInfo.billRegister &&
                                <div>
                                    <div className={`row ${css.inputPair}`}>
                                        <div className="col-md-4">
                                            <label>{formatMessage(defaultMessages.accountHolder)}</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                className={css["account-number"]}
                                                type="text"
                                                disabled={paymentSummaryData.registerBillInfo ? !!paymentSummaryData.registerBillInfo.accountHolderName : false}
                                                value={paymentSummaryData.registerBillInfo ? paymentSummaryData.registerBillInfo.accountHolderName : ""}
                                                onChange={(ev)=>handleUpdate("accountHolder", ev.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={`row ${css.inputPair}`}>
                                        <div className="col-md-4">
                                            <label>{formatMessage({id:"app.transactions.icNumber"})}</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                className={css["account-number"]}
                                                type="text"
                                                value={favoriteInfo.icNumber}
                                                onChange={(ev)=>handleUpdate("icNumber", ev.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                    <div className={css.whitebg}>
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-md-7">
                            {
                                billRegisterRequired && favoriteInfo.billRegister &&
                                <div className={`row ${css.flexWrapper}`} onClick={(ev)=>handleUpdate("termsConditions", !favoriteInfo.termsConditions)}>
                                    {
                                        favoriteInfo.termsConditions &&
                                        <div className={css.radioButton}>
                                            <img src="m2u/static/icons/radio_selected.svg"/>
                                        </div>
                                        ||
                                        <div className={css.radioButton}>
                                            <img src="m2u/static/icons/radio_button.svg"/>
                                        </div>
                                    }
                                    <div className={css.termsLeft}>{(formatMessage(defaultMessages.iAccept)).toUpperCase()}</div>
                                    <div className={css.terms}>{(formatMessage(defaultMessages.termsAndConditions)).toUpperCase()}</div>
                                </div>
                            }
                            </div>
                            <div className={`col-md-5 ${css.right}`}>
                                <Button onClick={toggleAction.bind(this,null)} className={`btn ${css["pay-btn"]}`}>
                                    {actionBtnText}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
FavoriteModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(FavoriteModal);
