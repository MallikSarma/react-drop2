import React from "react";
import * as css from "./PayFromToContainer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import SelectedRecipient from "../SelectedRecipient";
import {Clearfix, MenuItem } from "react-bootstrap";


const defaultMessages = defineMessages({
    payFrom: {
        id: "app.transactions.payFrom",
        defaultMessage: "Pay From",
    },
    payTo: {
        id: "app.transactions.payTo",
        defaultMessage: "Pay To",
    },
    transferFrom: {
        id: "app.transactions.transferFrom",
        defaultMessage: "Transfer From",
    },
    transferTo: {
        id: "app.transactions.transferTo",
        defaultMessage: "Transfer To",
    },
    reloadFrom: {
        id: "app.transactions.reloadFrom",
        defaultMessage: "Reload From",
    },
    reloadTo: {
        id: "app.transactions.reloadTo",
        defaultMessage: "Reload To",
    },
    availableBalance: {
        id: "app.transactions.availableBalance",
        defaultMessage: "Available Balance",
    },
    newPayment: {
        id: "app.transactions.newPayment",
        defaultMessage: "New Payment...",
    },
    telcoList: {
        id: "app.transactions.telcoList",
        defaultMessage: " Telco List",
    },
    enterBillerCode: {
        id: "app.transactions.enterBillerCode",
        defaultMessage: "Enter Biller Code",
    }
});
export const PayFromToContainer = (
    {
        intl,
        data,
        payeeList,
        userPayeeInput,
        updatePaymentList,
        updateAccountSelection,
        fromAccount,
        updatePayeeSelection,
        payeeInfo,
        asyncToggleJompayModal,
        togglePaymentModal,
        selectedRecipientList,
        currentTab
    }) => {
    const { formatMessage , formatNumber } = intl;
    const labelsMap = {
        pay: {
            fromText : formatMessage(defaultMessages.payFrom),
            toText: formatMessage(defaultMessages.payTo),
            listText: formatMessage(defaultMessages.newPayment)
        },
        transfer: {
            fromText : formatMessage(defaultMessages.transferFrom),
            toText: formatMessage(defaultMessages.transferTo),
            listText: formatMessage(defaultMessages.reloadTo)
        },
        reload: {
            fromText : formatMessage(defaultMessages.reloadFrom),
            toText: formatMessage(defaultMessages.reloadTo),
            listText: formatMessage(defaultMessages.telcoList)
        }
    };
    const {fromText,toText,listText}  = labelsMap[currentTab];
    const {pay,transfer,reload} = {
        pay : currentTab === "pay",
        transfer: currentTab === "transfer",
        reload:currentTab === "reload",
    };
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};

    const multiplePay = selectedRecipientList && selectedRecipientList.length > 0;
    function getMultipleRecipientData(){
        return selectedRecipientList.map((obj,index)=>{
            return  (<div className="row" key={index}>
                        <div className={`col-sm-2 col-xs-12 ${css.title}`}/>
                        <div className={`col-sm-10 col-xs-12 ${css.dropdownHolder}`}>
                            <SelectedRecipient favoriteInfo={obj} index={index} currentTab={currentTab}/>
                        </div>
                        <div className="col-sm-2 hidden-xs"/>
                    </div>);
        });
    }

    function getHighlightedInput(name,input)
    {

        const brokDown = name.split( (new RegExp(`^(${input})`,"i")));
        if (!input){
            return (<div>{name}</div>);
        }
        return (<div><span className={css.Highlighted}>{brokDown[1]}</span><span>{brokDown[2]}</span></div>);
    }
    function getAccountData() {
        const list = data.accounts.map((obj,index)=>{
                return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj.name}</span>
                                <span> {obj.displayNumber}</span>
                            </div>,
                   "mobileDisplay": obj.name,
                   "valueToPass": obj
                };
        });
        const currentAccount = !!fromAccount && list.find((obj)=>obj.valueToPass.accountNumber === fromAccount.accountNumber) || list[0];
        return {
            id: "accounts_dropdown",
            title: <div className={css.selectedItem}>
                                <span>{currentAccount.valueToPass.name}</span>
                                <span>{formatMessage(defaultMessages.availableBalance)} {" "}
                                    <span className={css.amountAvailable}>{currentAccount.valueToPass.currency}{formatNumber(currentAccount.valueToPass.availableBalance,decimalDigits)}</span>
                                </span>
                            </div>,
            action: (obj)=>{updateAccountSelection(obj);},
            list
        };
    }
    function getAvaliableBalance() {
         const list = data.accounts.map((obj,index)=>{
                return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj.name}</span>
                                <span> {obj.displayNumber}</span>
                            </div>,
                   "mobileDisplay": obj.name,
                   "valueToPass": obj
                };
        });
        const currentAccount = !!fromAccount && list.find((obj)=>obj.valueToPass.accountNumber === fromAccount.accountNumber) || list[0];
        return (<div className={css.avaliableBalance}>
                    <span>{formatMessage(defaultMessages.availableBalance)} {" "}</span>
                    <span className={css.amountAvailable}>{currentAccount.valueToPass.currency}{formatNumber(currentAccount.valueToPass.availableBalance,decimalDigits)}</span>
                </div>);
    }
    const dataToMap = {
        "pay" : [
            {
                id: "2132131",
                name: "Payee"
            },
            {
                id: "2132132",
                name: "Jompay"
            }
        ],
        "transfer" : [
            {
                "id": "123456",
                "name": "Own Accounts"
            },
            {
                "id": "123457",
                "name": "Other Accounts"
            },
            {
                "id": "123458",
                "name": "Overseas"
            },
            {
                "id": "654321",
                "name": "Mobile Number"
            },
            {
                "id": "685421",
                "name": "ASNB Accounts"
            }
        ],
        "reload" :[{
            "name": "Mobile Prepaid",
            "id": 12354884
        },
        {
            "name": "IDD / STD",
            "id": 12354894
        },
        {
            "name": "Internet",
            "id": 12354899
        }]
    };
    function getPayToData() {
        const list = dataToMap[currentTab].map((obj,index)=>{
                return {
                   "display": <div className={css.selectedItem}><span>{obj.name}</span></div>,
                   "mobileDisplay": obj.name,
                   "valueToPass": obj
                };
        });
        const currentPayee = !!payeeInfo && list.find((obj)=>obj.valueToPass.id === payeeInfo.id) || list[0];
        return {
            id: "payto_dropdown",
            title: currentPayee.display,
            action: (obj)=>{updatePayeeSelection(obj);},
            list
        };
    }
    function currentPayeeMultiPayment(){
        const list = dataToMap[currentTab].map((obj,index)=>{
                return {
                   "valueToPass": obj
                };
        });
        return !!payeeInfo && list.find((obj)=>obj.valueToPass.id === payeeInfo.id) || list[0];
    }
    const currentPayee = currentPayeeMultiPayment();
    function getNewPayment(){
       return (<Clearfix>
                <ul className="dropdown-menu">
                {
                    payeeList &&
                     payeeList.filter(obj=>!!obj.name.match(new RegExp(`^${userPayeeInput}`,"i"))).map((obj,index)=>
                        (<MenuItem key={obj.id} eventKey={obj.id} onClick={handlePaymentSelect.bind(this,obj)}>
                          {getHighlightedInput(obj.name,userPayeeInput)}
                        </MenuItem>)
                    )
                }
                </ul>
            </Clearfix>);
    }
    function handlePaymentSelect(obj){
        const otherTypes = getOtherAccountType(obj) || "";
        const tempToSection = {
            id: obj.id,
            name: obj.name,
            open: true,
            payOption: "pay",
            [otherTypes]:true,
            accountNumber:"",
            amount:"",
            notes:data.transactionInfo && data.transactionInfo.notes || []
        };
        togglePaymentModal({tempToSection});
    }
    function getOtherAccountType(obj) {
        const testArray = ["zakat","lhdn","epf","akpk","mygst"];
        return testArray.find(el=>obj[el]);
    }
    function handlePayeeOnchange(ev){
        updatePaymentList(ev.target.value);
    }
    function handleJomPayKeyDown(ev){
        if (ev.keyCode === 13){
            asyncToggleJompayModal();
        }
    }
    return (
        <div className={` row ${css.payFromToContainer}`}>
            <div className="col-xs-12 col-sm-2" />
            <div className="col-xs-12 col-sm-8">
                <div className="row">
                    <div className={`col-sm-2 col-xs-12 ${css.title}`}>
                        {fromText}
                    </div>
                    <div className={`hidden-lg hidden-md hidden-sm col-sm-10 col-xs-12 ${css.dropdownHolder}`}>
                        <RenderMobileDropdown data={getAccountData()} containerClass={css.containerClass}/>
                        {getAvaliableBalance()}
                    </div>
                    <div className={`hidden-xs col-sm-10 col-xs-12 ${css.dropdownHolder}`}>
                        <RenderDesktopDropdown data={getAccountData()} containerClass={css.containerClass} fromContainer="payFromToContainer"/>
                    </div>
                </div>
                {
                    !multiplePay &&
                    <div className="row">
                        <div className={`col-sm-2 col-xs-12 ${css.title}`}>
                            {toText}
                        </div>
                        <div className={`hidden-lg hidden-md hidden-sm col-sm-10 col-xs-12 ${css.dropdownHolder}`}>
                            <RenderMobileDropdown data={getPayToData()} containerClass={css.containerClass}/>
                        </div>
                        <div className={`hidden-xs col-sm-10 col-xs-12 ${css.dropdownHolder}`}>
                        <RenderDesktopDropdown data={getPayToData()} containerClass={css.containerClass} fromContainer="payFromToContainer"/>
                        </div>
                    </div>
                    ||
                    <div className="row">
                        <div className={`col-sm-2 col-xs-12 ${css.title}`}>
                            {toText}
                        </div>
                        <div className={`col-sm-10 col-xs-12 ${css.dropdownHolder}`}>
                            <input type="text" className={css.payeeDisabled}
                                value={currentPayee && currentPayee.valueToPass.name || ""}
                                disabled={multiplePay}
                            />
                        </div>
                        <div className="col-sm-2 hidden-xs"/>
                    </div>
                }
            {
                payeeInfo.name.toUpperCase() === "JOMPAY" &&
                <div className="row">
                    <div className={`col-sm-2 col-xs-12 ${css.jompayLogo}`}>
                        <img src="m2u/static/icons/jom_pay.svg" />
                    </div>
                    <div className={`col-sm-10 col-xs-12 ${css.dropdownHolder}`}>
                        <img className={css.inputImage} src="m2u/static/icons/grid.svg" />
                        <input type="text" className={css.paymentInput}
                            placeholder={formatMessage(defaultMessages.enterBillerCode)}
                            onKeyDown={handleJomPayKeyDown}
                            onChange={handlePayeeOnchange}
                            value={userPayeeInput}
                        />
                    </div>
                    <div className="col-sm-2 hidden-xs"/>
                </div>
                ||
                currentTab !== "transfer" &&
                <div className="row">
                    <div className="col-sm-2 hidden-xs" />
                    <div className={`col-sm-10 col-xs-12 ${css.dropdownHolder}`}>
                        <img className={css.inputImage} src="m2u/static/icons/payee_icon.svg" />
                        <input type="text" className={css.paymentInput}
                            placeholder={listText}
                            onChange={handlePayeeOnchange}
                            value={userPayeeInput}
                        />
                       {getNewPayment()}
                    </div>
                    <div className="col-sm-2 hidden-xs"/>
                </div>
            }
            {
                multiplePay &&
                getMultipleRecipientData()
            }
            </div>
            <div className="col-xs-12 col-sm-2" />
        </div>
    );
};

PayFromToContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(PayFromToContainer);