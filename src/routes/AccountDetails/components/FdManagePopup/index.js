import React from "react";
import * as css from "./FdManagePopup.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { DropdownButton, MenuItem, Button, Modal } from "react-bootstrap";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import Tooltip from "../../../../components/Tooltip";
const defaultMessages = defineMessages({
    intrestPaymentFrequency: {
        id: "app.details.intrestPaymentFrequency",
        defaultMessage: "Interest Payment Frequency"
    },
    intrestMode: {
        id: "app.details.intrestPaymentMode",
        defaultMessage: "Interest Mode"
    },
    creditToAccount:{
        id: "app.details.creditToAccount",
        defaultMessage: "Credit To Account"
    },
    maybankConventionalManage:{
        id: "app.details.maybankConventionalManage",
        defaultMessage: "Maybank Conventional fixed Deposit - Manage"
    }
});

export const FdManagePopup = ({intl, upliftManageFD, setUpliftManageData, upliftManageFDdata, accountDetails, asyncCheckUpliftManage}) => {
    const { formatMessage } = intl;
    const {allAccounts, term, interestMode, maturityInstructions} = accountDetails.defaultData;
    function updateModalInfo (key, value) {
        setUpliftManageData({
            key,
            value
        });
    }
    function getCreditToAccountData(){
        const list = allAccounts.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj.name}</span>
                                <span className={css.accountNumber}>{obj.number}</span>
                            </div>,
                   "mobileDisplay": obj.name,
                   "valueToPass": obj
                };
        });
        const currentTitle = allAccounts[0].name;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("accountInfo", obj);},
            list
        };
    }
    function getTermData(){
        const list = term.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{`${obj.months} ${formatMessage({id:"app.details.months"})}`}</span>
                            </div>,
                   "mobileDisplay": `${obj.months} ${formatMessage({id:"app.details.months"})}`,
                   "valueToPass": obj
                };
        });
        const currentTitle = `${upliftManageFDdata.termInMonths} ${formatMessage({id:"app.details.months"})}`;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("termInMonths", obj.months);},
            list
        };
    }
    function getInterestFrequencyData(){
        const termObj = term.find((el,termIndex)=>upliftManageFDdata.termInMonths === el.months);
        const list = termObj.interestFrequency.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj} { isNaN(obj) ?  "" : formatMessage({id:"app.details.months"})}</span>
                            </div>,
                   "mobileDisplay": `${obj} ${ isNaN(obj) ?  "" : formatMessage({id:"app.details.months"})}`,
                   "valueToPass": obj
                };
        });
        const currentTitle = `${termObj.interestFrequency[0]} ${ isNaN(termObj.interestFrequency[0]) ?  "" : formatMessage({id:"app.details.months"})}`;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("interestFrequency", obj);},
            list
        };
    }
    function getInterestModeData(){
        const list = interestMode.map((obj,index)=>{
        return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj}</span>
                            </div>,
                   "mobileDisplay": obj,
                   "valueToPass": obj
                };
        });
        const currentTitle = upliftManageFDdata.interestPayment;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("interestPayment", obj);},
            list
        };
    }
    function getMaturityInstructionsData(){
        const list = maturityInstructions.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{obj}</span>
                            </div>,
                   "mobileDisplay": obj,
                   "valueToPass": obj
                };
        });
        const currentTitle = upliftManageFDdata.uponMaturity;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("uponMaturity", obj);},
            list
        };
    }
    return (
        <div>
            <Modal show className={css.container}>
                <Modal.Header>
                    <h6>{formatMessage(defaultMessages.maybankConventionalManage)}</h6>
                    <span className={css.close} onClick={upliftManageFD} />
                </Modal.Header>
                <Modal.Body>
                    <div className={css.greybg}>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-4">
                                <label>{formatMessage({id: "app.details.principalAmount"})}</label>
                            </div>
                            <div className="col-sm-8">
                                <span className={css.inputCurrency}>{accountDetails.currency}</span>
                                <input
                                    type="text"
                                    value={upliftManageFDdata.principal}
                                    className={css.amountInput}
                                    onChange={(ev)=>updateModalInfo("principal", ev.target.value)}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-4">
                                <label>{formatMessage({id:"app.details.maturityDate"})}</label>
                                <div className={css.help}><Tooltip/></div>
                            </div>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    value={upliftManageFDdata.maturityDate}
                                    className={css.commonInput}
                                    onChange={(ev)=>updateModalInfo("maturityDate", ev.target.value)}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className={css.whitebg}>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-4">
                                <label>{formatMessage({id:"app.details.term"})}</label>
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm col-sm-8">
                                <RenderMobileDropdown data={getTermData()} containerClass={css.containerClass}/>
                            </div>
                            <div className={`hidden-xs col-sm-8 ${css.selectWrapper}`}>
                                <RenderDesktopDropdown data={getTermData()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-4">
                                <label className={css.multiLine}>{formatMessage(defaultMessages.intrestPaymentFrequency)}</label>
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm col-sm-8">
                                <RenderMobileDropdown data={getInterestFrequencyData()} containerClass={css.containerClass}/>
                            </div>
                            <div className={`hidden-xs col-sm-8 ${css.selectWrapper}`}>
                                <RenderDesktopDropdown data={getInterestFrequencyData()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-4">
                                <label>{formatMessage(defaultMessages.intrestMode)}</label>
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm col-sm-8">
                                <RenderMobileDropdown data={getInterestModeData()} containerClass={css.containerClass}/>
                            </div>
                            <div className={`hidden-xs col-sm-8 ${css.selectWrapper}`}>
                                <RenderDesktopDropdown data={getInterestModeData()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-4">
                                <label className={css.multiLine}>{formatMessage({id:"app.details.maturityInstructions"})}</label>
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm col-sm-8">
                                <RenderMobileDropdown data={getMaturityInstructionsData()} containerClass={css.containerClass}/>
                            </div>
                            <div className={`hidden-xs col-sm-8 ${css.selectWrapper}`}>
                                <RenderDesktopDropdown data={getMaturityInstructionsData()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                        { upliftManageFDdata.interestPayment === "Credit to Account" &&
                            <div className={`row ${css.seperator} ${css.accountDropdown}`}>
                                <div className="col-sm-4">
                                    <label>{formatMessage(defaultMessages.creditToAccount)}</label>
                                </div>
                                <div className="hidden-md hidden-lg hidden-sm col-sm-8">
                                    <RenderMobileDropdown data={getCreditToAccountData()} containerClass={css.containerClass}/>
                                </div>
                                <div className={`hidden-xs col-sm-8 ${css.selectWrapper}`}>
                                    <RenderDesktopDropdown data={getCreditToAccountData()} containerClass={css.containerClass}/>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={css.termsContainer} onClick={(ev)=>updateModalInfo("agreeConditions", !upliftManageFDdata.agreeConditions)}>
                        <div className="row">
                            <div className="col-xs-2 col-sm-1" >
                            {
                               upliftManageFDdata.agreeConditions &&
                                <div className={css.radioButton}>
                                    <img src="m2u/static/icons/radio_selected.svg"/>
                                </div>
                                ||
                                <div className={css.radioButton}>
                                    <img src="m2u/static/icons/radio_button.svg"/>
                                </div>
                            }
                            </div>
                            <div className="col-xs-10 col-sm-11">
                                <div className={css.terms}>{formatMessage({id: "app.details.footerMessage"})}</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={` row ${css[ "btn-wrapper"]}`}>
                        <div className="col-sm-8 col-xs-12"/>
                        <div className="col-sm-4 col-xs-12">
                            <div>
                                <Button className="btn btn-success" onClick={asyncCheckUpliftManage.bind(this, "manage")}>
                                    <span>{formatMessage({id: "app.personalize.done"})}</span>
                                    <img src="m2u/static/icons/proceed_white.svg"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
FdManagePopup.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(FdManagePopup);
