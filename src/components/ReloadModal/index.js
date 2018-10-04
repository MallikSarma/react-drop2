import React from "react";
import * as css from "./ReloadModal.scss";
import Datepicker from "../../routes/Transactions/components/Datepicker";
import RenderDesktopDropdown from "../RenderDesktopDropdown";
import RenderMobileDropdown from "../RenderMobileDropdown";
import { injectIntl, intlShape ,defineMessages} from "react-intl";
import { Button, Modal } from "react-bootstrap";
import Toggle from "../Toggle";
const defaultMessages = defineMessages({
    mobileNumber: {
        id: "app.details.mobileNumber",
        defaultMessage: "Mobile Number"
    },
    reloadAmount: {
        id: "app.details.reloadAmount",
        defaultMessage: "Reload Amount"
    },
    reload: {
        id: "app.details.reload",
        defaultMessage: "RELOAD"
    },
    quickReloadTo: {
        id: "app.details.quickReloadTo",
        defaultMessage: "Quick Reload to"
    }
});
export const ReloadModal = ({intl, tempToSection, asyncSendQuickPay, togglePaymentModal, getInputData, isQuick, data}) => {
    const { formatMessage } = intl;
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    function payButtonClicked(){
        togglePaymentModal.call(this, null);
        asyncSendQuickPay();
    }
    function handleSwitch() {
        getInputData({
            key: "recurrence",
            value : !tempToSection.recurrence
        });
    }
    function getAccountData() {
        const list = data.accounts.map((obj,index)=>{
                return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj.name}</span>
                            </div>,
                   "mobileDisplay": obj.name,
                   "valueToPass": obj
                };
        });
        const currentAccount = !!tempToSection.fromAccount && list.find((obj)=>obj.valueToPass.accountNumber === tempToSection.fromAccount.accountNumber) || list[0];
        return {
            id: "all_accounts_dropdown",
            title: <div className={css.selectedItem}>
                                <span>{currentAccount.valueToPass.name}</span>
                            </div>,
            action: (obj)=>{getInputData({key:"fromAccount",value:obj});},
            list
        };
    }
    function getReloadAmount() {
        const list = data.transactionInfo.reloadAmount.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{data.currency}</span><span>{obj}</span>
                        </div>,
               "mobileDisplay": obj,
               "valueToPass": obj
            };
        });
        const currentTitle = !!tempToSection.amount && data.transactionInfo.reloadAmount.find((amount)=>amount === tempToSection.amount) || data.transactionInfo.reloadAmount[0];
        return {
            id: "reload_amount_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"amount",value:obj});},
            list
        };
    }
    const title = isQuick ? formatMessage(defaultMessages.quickReloadTo) : formatMessage({id: "app.transactions.reloadTo"});
    return (
        <div>
            <Modal show className={css.container}>
                <Modal.Header>
                    <h6 className={css.title}>{title}{data.transactionInfo.name || data.transactionInfo.serviceProviderName}</h6>
                    <span className={css.close} onClick={()=>togglePaymentModal()} />
                </Modal.Header>
                <Modal.Body>
                    <div className={css.greybg}>
                        {
                            isQuick &&
                            <div className={`row ${css.inputPair}`}>
                                <div className="col-sm-5">
                                     <label>{formatMessage({id: "app.details.fromAccount"})}</label>
                                </div>
                                <div className="col-sm-7">
                                    <div className="hidden-lg hidden-md hidden-sm">
                                        <RenderMobileDropdown data={getAccountData()} containerClass={css.containerClass}/>
                                    </div>
                                    <div className="hidden-xs">
                                        <RenderDesktopDropdown data={getAccountData()} containerClass={css.containerClass}/>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-sm-5">
                                 <label>{formatMessage(defaultMessages.mobileNumber)}</label>
                            </div>
                            <div className="col-sm-7">
                                <input className={css["account-number"]}
                                    disabled={tempToSection.isFavourite}
                                    type="text"
                                    onChange={handleUpdate.bind(this, "mobileNumber")}
                                    value={tempToSection.mobileNumber  || ""}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={css.whitebgMiddle}>
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-sm-5">
                                 <label>{formatMessage(defaultMessages.reloadAmount)}</label>
                            </div>
                            <div className="col-sm-7">
                                 <div className="hidden-lg hidden-md hidden-sm">
                                        <RenderMobileDropdown data={getReloadAmount()} containerClass={css.containerClass}/>
                                    </div>
                                    <div className="hidden-xs">
                                        <RenderDesktopDropdown data={getReloadAmount()} containerClass={css.containerClass}/>
                                </div>
                            </div>
                        </div>
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-sm-5">
                                 <label>{formatMessage({id: "app.details.effectiveDate"})}</label>
                            </div>
                            <div className="col-sm-7">
                                {
                                    !isQuick &&
                                    <Datepicker updateDate={getInputData} dateValue={tempToSection.effectiveDate}/>
                                }
                                {
                                    isQuick &&
                                    <div>
                                        <div className={css.effectiveDate}>
                                        <span>{formatMessage({id: "app.details.today"})}</span>
                                        {tempToSection.effectiveDate}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {
                            !isQuick &&
                            <div className={`row ${css.inputPair}`}>
                                <div className="col-sm-5"/>
                                <div className="col-sm-7">
                                    <div className={css.recurring}>
                                        <Toggle switchState={tempToSection.recurrence} toggleSwitch={handleSwitch}/>
                                        <span>{formatMessage({id: "app.details.setRecurring"})}</span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={css.whitebg}>
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-xs-6"/>
                            <Button onClick={payButtonClicked} className={`btn ${css["pay-btn"]} col-xs-6  pull-right`}>
                                <span className={css["pay-btn-text"]}>{formatMessage(defaultMessages.reload).toUpperCase()}</span>
                                <span className={css["pay-btn-icon"]}/>
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
ReloadModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(ReloadModal);
