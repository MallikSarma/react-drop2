import React from "react";
import * as css from "../PaymentModal.scss";
import Datepicker from "../../../routes/Transactions/components/Datepicker";
import RenderDesktopDropdown from "../../RenderDesktopDropdown";
import RenderMobileDropdown from "../../RenderMobileDropdown";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { Button, Modal } from "react-bootstrap";
import Zakat from "../OtherPayInfo/Zakat";
import AKPK from "../OtherPayInfo/AKPK";
import EPF from "../OtherPayInfo/EPF";
import LHDN from "../OtherPayInfo/LHDN";
import MyGST from "../OtherPayInfo/MyGST";
import CardPayment from "../OtherPayInfo/CardPayment";
import Toggle from "../../Toggle";
import Tooltip from "../../Tooltip";
import classnames from "classnames";
const defaultMessages = defineMessages({
    quick: {
        id: "app.details.quick",
        defaultMessage: "Quick"
    },
    payTo: {
        id: "app.details.payTo",
        defaultMessage: "Pay To"
    },
    accountNumber: {
        id: "app.details.accountNumber",
        defaultMessage: "Account Number"
    },
    ref1: {
        id: "app.details.ref1",
        defaultMessage: "Ref-1"
    },
    ref2: {
        id: "app.details.ref2",
        defaultMessage: "Ref-2"
    },
    payAmount: {
        id: "app.details.payAmount",
        defaultMessage: "Pay Amount"
    },
    effectiveDate: {
        id: "app.details.effectiveDate",
        defaultMessage: "Effective Date"
    },
    today: {
        id: "app.details.today",
        defaultMessage: "Today"
    },
    frequency:{
        id: "app.details.frequency",
        defaultMessage: "Frequency"
    },
    startDate: {
        id: "app.details.startDate",
        defaultMessage: "Start"
    },
    endDate: {
        id: "app.details.endDate",
        defaultMessage: "End"
    },
    notes: {
        id: "app.details.notes",
        defaultMessage: "Notes"
    },
    setRecurring: {
        id: "app.details.setRecurring",
        defaultMessage: "Set Recurring"
    },
    addAnotherPayment:{
        id: "app.details.addAnotherPayment",
        defaultMessage: "Add Another Payment +"
    },
    all:{
        id: "app.details.all",
        defaultMessage: "All"
    }
});

export const PaymentModal = ({
    intl,
    resetError,
    errorName,
    payCard,
    tempToSection,
    togglePaymentModal,
    getInputData,
    isQuick,
    data,
    asyncSendQuickPay,
    jompay,
    openPdf,
    asyncSendMultiplePay,
    sendAsyncMultiTransaction,
    showMultipleSticky
}) => {
    const { formatMessage } = intl;
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
    function getRecurrenceFrequencyData() {
        const frequency = ["Weekly","Monthly","Half Year"];
        const list = frequency.map((obj,index)=>{
                return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj}</span>
                            </div>,
                   "mobileDisplay": obj,
                   "valueToPass": obj
                };
        });
        const currentFrequency = !!tempToSection.recurrenceFrequency && list.find((obj)=>obj.valueToPass === tempToSection.recurrenceFrequency) || list[0];
        return {
            id: "recurrence_frequency_dropdown",
            title: <div className={css.selectedItem}>
                                <span>{currentFrequency.valueToPass}</span>
                            </div>,
            action: (obj)=>{getInputData({key:"recurrenceFrequency",value:obj});},
            list
        };
    }
    const paytype = jompay ? "PAY" : getPaymentType().toUpperCase();
    function getPaymentType(){
        const checkArray = ["mygst","lhdn","akpk","epf","zakat"];
        return checkArray.find(el=>tempToSection[el]) || "PAY";
    }
    function updateJompayRefList(index,ev) {
        getInputData({
            key: "jompayRefList",
            value : tempToSection.jompayRefList.map((el,key)=>{
                if (key === index){
                    return ev.target.value;
                }
                return el;
            })
        });
    }
    const amountClasses = classnames({
        [css["pay-amount"]]: true,
        [css.error]: errorName === "amountError"
    });
    const accountNumberClasses = classnames({
        [css.container]: true,
        [css.greybg]: !isQuick,
        [css.whitebgMiddle]: isQuick
    });
    function getNoteRequired(){
        return (paytype !== "PAY");
    }
    const noteRequired = (jompay || tempToSection.jompayRefList) ? false : getNoteRequired();
    const jompayRefArray = tempToSection.jompayRefList || ["",""];
    const transactionButText = `${formatMessage({id: "app.transactions.payText"}).toUpperCase()} ${showMultipleSticky && formatMessage(defaultMessages.all).toUpperCase() || ""}`;
    return (
        <div>
            <Modal show className={css.container}>
                <Modal.Header>
                    <h6 className={css.title}>{formatMessage(defaultMessages.payTo)} {tempToSection.name}</h6>
                    <span className={css.close} onClick={()=>togglePaymentModal()} />
                </Modal.Header>
                <Modal.Body>
                    {
                        (tempToSection.jompayRefList || jompay || isQuick) &&
                        <div className={css.greybg}>
                                { isQuick &&
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
                                    (tempToSection.jompayRefList || jompay) &&
                                    jompayRefArray.map((elem,index)=>
                                        <div className={`row ${css.inputPair}`} key={index}>
                                            <div className="col-sm-5">
                                                <label>{formatMessage(defaultMessages["ref" + (index + 1)])}</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <input className={css.accountNumber}
                                                    type="text"
                                                    disabled={tempToSection.isFavorite}
                                                    onChange={updateJompayRefList.bind(this, index)}
                                                    value={elem}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                        </div>
                    }
                    {
                        !payCard && paytype === "ZAKAT" &&
                        <Zakat tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                    }
                    {
                        !payCard && paytype === "EPF" &&
                        <EPF tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                    }
                    {
                        !payCard && paytype === "AKPK" &&
                        <AKPK tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                    }
                    {
                        !payCard && paytype === "MYGST" &&
                        <MyGST tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                    }
                    {
                        !payCard && paytype === "LHDN" &&
                        <LHDN tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                    }
                    {
                        payCard &&
                        <CardPayment tempToSection = {tempToSection} getInputData = {getInputData} paymentSummaryData={data}/>
                    }
                    {
                        !payCard && paytype === "PAY" &&
                        <div>
                            <div className={accountNumberClasses}>
                                {
                                    !tempToSection.jompayRefList && !jompay &&
                                    <div className={`row ${css.inputPair}`}>
                                        <div className="col-sm-5">
                                            <label>{formatMessage(defaultMessages.accountNumber)}</label>
                                            <Tooltip/>
                                        </div>
                                        <div className="col-sm-7">
                                            <input className={css.accountNumber}
                                                type="text"
                                                disabled={tempToSection.isFavorite}
                                                onChange={handleUpdate.bind(this, "accountNumber")}
                                                value={tempToSection.accountNumber.replace(/ /g,"")  || ""}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className={css.whitebgMiddle}>
                                <div className={`row ${css.inputPair}`}>
                                    <div className="col-sm-5">
                                         <label>{formatMessage(defaultMessages.payAmount)}</label>
                                         <Tooltip/>
                                    </div>
                                    <div className="col-sm-7">
                                        <span className={css["amount-currency"]}>RM</span>
                                        <input className={amountClasses}
                                            type="text"
                                            onFocus={resetError}
                                            onChange={handleUpdate.bind(this, "amount")}
                                            value={tempToSection.amount  || ""}
                                        />
                                    </div>
                                </div>
                                <div className={`row ${css.inputPair}`}>
                                    <div className="col-sm-5">
                                         <label>{formatMessage(defaultMessages.effectiveDate)}</label>
                                    </div>
                                    <div className="col-sm-7">
                                        {
                                            !isQuick &&
                                            <Datepicker updateDate={getInputData} dateValue={tempToSection.effectiveDate} dateType={"effectiveDate"}/>
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
                                    tempToSection.recurrence &&
                                    <div>
                                        <div className={`row ${css.inputPair}`}>
                                            <div className="col-sm-5"/>
                                            <div className="col-sm-7">
                                                <Datepicker updateDate={getInputData} dateValue={tempToSection.endDate} dateType={"endDate"}/>
                                            </div>
                                        </div>
                                        <div className={`row ${css.inputPair}`}>
                                            <div className="col-sm-5">
                                                 <label>{formatMessage(defaultMessages.frequency)}</label>
                                            </div>
                                            <div className="col-sm-7">
                                                <div className="hidden-lg hidden-md hidden-sm">
                                                    <RenderMobileDropdown data={getRecurrenceFrequencyData()} containerClass={css.containerClass}/>
                                                </div>
                                                <div className="hidden-xs">
                                                    <RenderDesktopDropdown data={getRecurrenceFrequencyData()} containerClass={css.containerClass}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
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
                        </div>
                    }
                    {
                        noteRequired && tempToSection.notes &&
                        <div className={css.greybg}>
                            <div className="row">
                                <span className={css.notesHead}>{formatMessage(defaultMessages.notes)}</span>
                                <ul className={css.notes}>
                                    {tempToSection.notes.map((el,index)=><li key={index}>{el}</li>)}
                                </ul>
                            </div>
                        </div>
                    }
                    {
                        jompay &&
                        <div className={css.whitebgMiddle}>
                            <div className={`row ${css.inputPair}`}>
                                <div className="col-md-8">    
                                    <div className={`row ${css.flexWrapper}`}>
                                        {
                                            tempToSection.termsConditions &&
                                            <div className={css.radioButton} onClick={(ev)=>getInputData({key:"termsConditions",value: !tempToSection.termsConditions})}>
                                                <img src="m2u/static/icons/radio_selected.svg"/>
                                            </div>
                                            ||
                                            <div className={css.radioButton} onClick={(ev)=>getInputData({key:"termsConditions",value: !tempToSection.termsConditions})}>
                                                <img src="m2u/static/icons/radio_button.svg"/>
                                            </div>
                                        }
                                        <div className={css.termsLeft} onClick={(ev)=>getInputData({key:"termsConditions",value: !tempToSection.termsConditions})}>{(formatMessage({id:"app.transactions.iAccept"})).toUpperCase()}</div>
                                        <div className={css.terms} onClick={(ev)=>{ev.stopPropagation(); openPdf();}}>{(formatMessage({id:"app.transactions.termsAndConditions"})).toUpperCase()}</div>
                                    </div>
                                </div>
                                <div className="col-xs-4"/>
                            </div>
                        </div>
                    }
                    <div className={css.whitebg}>
                        <div className={`row ${css.inputPair}`}>
                            <div className="col-md-8">
                            {
                                tempToSection.isFavorite &&
                                <Button
                                    onClick={payMultipleButtonClicked}
                                    className={`${css["add-btn"]} pull-left`}
                                    disabled={!tempToSection.amount || (tempToSection.amount && tempToSection.amount.length === 0)}
                                >
                                    <span>{formatMessage(defaultMessages.addAnotherPayment).toUpperCase()}</span>
                                </Button>
                            }
                            </div>
                            <div className="col-md-4">
                                <Button onClick={payButtonClicked} className={`btn pull-right ${css["pay-btn"]}`}>
                                    <span className={css["pay-btn-text"]}>{transactionButText}</span>
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
PaymentModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(PaymentModal);
