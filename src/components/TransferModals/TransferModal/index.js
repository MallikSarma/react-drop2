import React from "react";
import * as css from "../TransferModals.scss";
import Datepicker from "../../../routes/Transactions/components/Datepicker";
import RenderDesktopDropdown from "../../RenderDesktopDropdown";
import RenderMobileDropdown from "../../RenderMobileDropdown";
import { injectIntl, intlShape ,defineMessages} from "react-intl";
import { Button, Modal, Accordion, Panel } from "react-bootstrap";
import ITIBG from "../OtherTransferInfo/ITIBG";
import Mobile from "../OtherTransferInfo/Mobile";
import Card from "../OtherTransferInfo/Card";
import MFCA from "../OtherTransferInfo/MFCA";
import Toggle from "../../Toggle";
import Tooltip from "../../Tooltip";
import classnames from "classnames";
const defaultMessages = defineMessages({
    quickTransferTo: {
        id: "app.details.quickTransferTo",
        defaultMessage: "Quick Transfer To"
    },
    recipientReference: {
        id: "app.details.recipientReference",
        defaultMessage: "Recipient's Reference"
    },
    additionalInfo: {
        id: "app.details.additionalInfo",
        defaultMessage: "ADDITIONAL INFO (OPTIONAL)"
    },
    otherTransferDetails: {
        id: "app.details.otherTransferDetails",
        defaultMessage: "Other Transfer Details"
    },
    notifySms: {
        id: "app.details.notifySms",
        defaultMessage: "Notify via SMS"
    },
    notifyemail: {
        id: "app.details.notifyemail",
        defaultMessage: "Notify via Email"
    },
    cardNumber:{
        id: "app.details.cardNumber",
        defaultMessage: "Card Number"
    },
    payOption: {
        id: "app.details.payOption",
        defaultMessage: "Pay Option"
    },
    anyAmount: {
        id: "app.details.anyAmount",
        defaultMessage: "Any Amount"
    },
    minimumAmount: {
        id: "app.details.minimumAmount",
        defaultMessage: "Minimum Amount"
    },
    statementAmount: {
        id: "app.details.statementAmount",
        defaultMessage: "Statement Amount"
    },
    outstandingAmount: {
        id: "app.details.outstandingAmount",
        defaultMessage: "Outstanding Amount"
    },
    addAnotherTransfer:{
        id: "app.details.addAnotherTransfer",
        defaultMessage: "Add Another Transfer +"
    }

});
export const TransferModal = ({intl, tempToSection, togglePaymentModal,getInputData,isQuick, data,asyncSendQuickPay, asyncSendMultiplePay,showMultipleSticky, sendAsyncMultiTransaction }) => {
    const { formatMessage } = intl;
    function handleSwitch() {
        getInputData({
            key: "recurrence",
            value : !tempToSection.recurrence
        });
    }
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    function payMultipleButtonClicked(){
        asyncSendMultiplePay();
    }
    function payButtonClicked(){
        if (showMultipleSticky) {
            asyncSendMultiplePay();
            sendAsyncMultiTransaction();
        } else {
            asyncSendQuickPay();
        }
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
    const additionalArrowClasses = classnames({
        [css.rightArrow]: true,
        [css.arrowDown]: tempToSection.additionalInfoOpen
    });
    const amountLable =  data.loanPayment && { id: "app.details.totalAmount"} || {id:"app.details.transferAmount"};
    const title = isQuick ? formatMessage(defaultMessages.quickTransferTo) : formatMessage({id:"app.details.transferTo"});
    const transactionInfo = data.transactionInfo || {};
    return (
        <div>
            <Modal show className={css.container}>
                <Modal.Header>
                    <h6 className={css.title}>{title} {tempToSection.name || tempToSection.recipientBank}</h6>
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
                        {
                            (
                                transactionInfo.itibg || transactionInfo.thirdParty ||
                                !transactionInfo.mobile || !transactionInfo.ownCARDS
                            ) &&
                            <div className={`row ${css.inputPair}`}>
                                <div className="col-sm-5">
                                    <label>{formatMessage({id: "app.details.accountNumber"})}</label>
                                    <Tooltip/>
                                </div>
                                <div className="col-sm-7">
                                    <input className={css.accountNumber}
                                        type="text"
                                        disabled={tempToSection.isFavourite}
                                        onChange={handleUpdate.bind(this, "accountNumber")}
                                        value={tempToSection.accountNumber.replace(/ /g,"")  || ""}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    {
                        (transactionInfo.itibg || transactionInfo.thirdParty) &&
                        <ITIBG tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                    }
                    {
                        transactionInfo.mobile &&
                        <Mobile tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                    }
                    {
                        transactionInfo.ownCARDS &&
                        <Card tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                    }
                    <div className={css.whitebgMiddle}>
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-sm-5">
                                <label>{formatMessage(amountLable)}</label>
                                <Tooltip/>
                            </div>
                            <div className="col-sm-7">
                                <span className={css.inputCurrency}>{tempToSection.currency || data.currency}</span>
                                <input
                                    className={css["input-with-lable"]}
                                    type="text"
                                    disabled = {isQuick && tempToSection.payOption && tempToSection.payOption !== "anyAmount"}
                                    value={tempToSection.amount || ""}
                                    onChange={handleUpdate.bind(this,"amount")}
                                />
                            </div>
                        </div>

                        {
                            !transactionInfo.ownMFCA &&
                            <div>
                                <div className={`row ${css.inputPair}`}>
                                    <div className="col-sm-5">
                                        <label>{formatMessage({id:"app.details.effectiveDate"})}</label>
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
                                                <span>{formatMessage({id:"app.details.setRecurring"})}</span>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    {
                        transactionInfo.ownMFCA &&
                        <MFCA tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                        ||
                        <div className={css.lightgreybg}>
                            <div className={`row ${css.inputPair}`}>
                                <div className="col-sm-5">
                                    <label>{formatMessage(defaultMessages.recipientReference)}</label>
                                </div>
                                <div className="col-sm-7">
                                    <input
                                        className={css["account-number"]}
                                        type="text"
                                        value={tempToSection.recipientReference || ""}
                                        onChange={handleUpdate.bind(this,"recipientReference")}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    {
                        (tempToSection.itibg || tempToSection.thirdParty) &&
                        <div className={css.greybg}>
                            <div className={`row ${css.inputPair}`}>
                                <Accordion onClick={getInputData.bind(this,{key:"additionalInfoOpen", value: !tempToSection.additionalInfoOpen })}>
                                    <Panel header={<div>{formatMessage(defaultMessages.additionalInfo)}<span className={additionalArrowClasses}>></span></div>} eventKey="1">
                                        <div>
                                            <div className={`row ${css.inputPair}`}>
                                                <div className="col-sm-5">
                                                    <label>{formatMessage(defaultMessages.otherTransferDetails)}</label>
                                                </div>
                                                <div className="col-sm-7">
                                                    <input
                                                        className={css["account-number"]}
                                                        type="text"
                                                        value={tempToSection.otherTransferDetails || ""}
                                                        onChange={handleUpdate.bind(this,"otherTransferDetails")}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`row ${css.inputPair}`}>
                                                <div className="col-sm-5">
                                                    <label>{formatMessage(defaultMessages.notifySms)}</label>
                                                </div>
                                                <div className="col-sm-7">
                                                    <input
                                                        className={css["account-number"]}
                                                        type="text"
                                                        value={tempToSection.notifySms || ""}
                                                        onChange={handleUpdate.bind(this,"notifySms")}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`row ${css.inputPair}`}>
                                                <div className="col-sm-5">
                                                    <label>{formatMessage(defaultMessages.notifyemail)}</label>
                                                </div>
                                                <div className="col-sm-7">
                                                    <input
                                                        className={css["account-number"]}
                                                        type="text"
                                                        value={tempToSection.notifyemail || ""}
                                                        onChange={handleUpdate.bind(this,"notifyemail")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Panel>
                                </Accordion>
                            </div>
                        </div>
                    }
                    <div className={css.whitebg}>
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-xs-6">
                            {
                                tempToSection.isFavorite &&
                                <Button
                                    onClick={payMultipleButtonClicked}
                                    className={`${css["another-btn"]} pull-left`}
                                    disabled={!tempToSection.amount || (tempToSection.amount && tempToSection.amount.length === 0)}
                                >
                                    <span>{formatMessage(defaultMessages.addAnotherTransfer).toUpperCase()}</span>
                                </Button>
                            }
                            </div>
                            <div className="col-xs-6">
                                <Button onClick={payButtonClicked} className={`btn ${css["pay-btn"]} pull-right`}>
                                    <span className={css["pay-btn-text"]}>{formatMessage({id: "app.dashboard.transfer"}).toUpperCase()}</span>
                                    <span className={css["pay-btn-icon"]}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
TransferModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(TransferModal);
