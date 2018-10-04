import React from "react";
import { DropdownButton, MenuItem, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./PlacementModal.scss";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    makePlacement: {
        id: "app.details.mgreakePlacementBtn",
        defaultMessage: "MAKE PLACEMENT",
    },
    fdPlacementModalHeader: {
        id: "app.details.fdPlacementModalHeader",
        defaultMessage: "Maybank Conventional Fixed Deposit",
    },
    transferFrom: {
        id: "app.details.transferFrom",
        defaultMessage: "Transfer From",
    },
    principalAmount: {
        id: "app.details.principalAmount",
        defaultMessage: "Principal Amount",
    },
    interestFrequency: {
        id: "app.details.interestFrequency",
        defaultMessage: "Interest Frequency",
    },
    interestMode: {
        id: "app.details.interestMode",
        defaultMessage: "Interest Mode",
    },
    footerMessage: {
        id: "app.details.footerMessage",
        defaultMessage: "I have read the PIDM brochure and understand the Maybank conventional fixed deposit is eligible for protection by PIDM.",
    },
    term: {
        id: "app.details.term",
        defaultMessage: "Term",
    },
    maturityInstructions: {
        id: "app.details.maturityInstructions",
        defaultMessage: "Maturity Instructions",
    }
});
export const PlacementModal = ({intl,placementData, accountTransactions,updatePlacementData,togglePlacementFD, asyncCheckMakePlacement, certificateSummary}) => {
    const { formatMessage } = intl;
    const {allAccounts, term, interestMode, maturityInstructions} = accountTransactions.defaultData;
    function updateModalInfo (key, value) {
        updatePlacementData({
            key,
            value
        });
    }
    function getTransferFromData(){
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
        const currentTitle = placementData ? placementData.transferFrom.name : list[0].display;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("transferFrom", obj);},
            list
        };
    }
    function getTermData(){
        const list = term.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{`${obj.months} ${formatMessage({id:"app.details.months"})} @ ${obj.rate}`}</span>
                            </div>,
                   "mobileDisplay": `${obj.months} ${formatMessage({id:"app.details.months"})} @ ${obj.rate}`,
                   "valueToPass": obj
                };
        });
        const currentTitle = `${placementData.term.months} ${formatMessage({id:"app.details.months"})} @ ${placementData.term.rate}`;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("term", obj);},
            list
        };
    }
    function getInterestFrequencyData(){
        const listToMap = placementData.term;
        const list = listToMap.interestFrequency.map((obj,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{`${obj} ${formatMessage({id:"app.details.months"})}`}</span>
                            </div>,
                   "mobileDisplay": `${obj} ${formatMessage({id:"app.details.months"})}`,
                   "valueToPass": obj
                };
        });
        const currentTitle = `${placementData.term.interestFrequency[0]} ${formatMessage({id:"app.details.months"})}`;
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
        const currentTitle = placementData.interestMode;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("interestMode", obj);},
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
        const currentTitle = placementData.maturityInstructions;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("maturityInstructions", obj);},
            list
        };
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header>
                <h6>{formatMessage(defaultMessages.fdPlacementModalHeader)}</h6>
                <span className={css.close} onClick={togglePlacementFD.bind(this, false)} />
            </Modal.Header>
            <Modal.Body>
                <div className={css.even}>
                    <div className="row">
                        <div className="col-sm-5">
                             <label>{formatMessage(defaultMessages.transferFrom)}</label>
                        </div>
                        <div className="hidden-md hidden-lg hidden-sm col-md-8">
                            <RenderMobileDropdown data={getTransferFromData()} containerClass={css.containerClass}/>
                        </div>
                        <div className={`hidden-xs col-sm-7 ${css.selectWrapper} ${css.accountDropdown}`}>
                            <RenderDesktopDropdown data={getTransferFromData()} containerClass={css.containerClass}/>
                        </div>
                    </div>
                </div>
                <div className={css.odd}>
                    <div className="row">
                        <div className="col-sm-5">
                             <label>{formatMessage(defaultMessages.term)}</label>
                        </div>
                        <div className="hidden-md hidden-lg hidden-sm col-md-8">
                            <RenderMobileDropdown data={getTermData()} containerClass={css.containerClass}/>
                        </div>
                        <div className={`hidden-xs col-sm-7 ${css.selectWrapper}`}>
                            <RenderDesktopDropdown data={getTermData()} containerClass={css.containerClass}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5">
                             <label>{formatMessage(defaultMessages.principalAmount)}</label>
                        </div>
                        <div className="col-sm-7">
                            <span className={css.inputCurrency}>{accountTransactions.currency}</span>
                            <input
                                type="text"
                                value={placementData.amount || ""}
                                className={css.commonInput}
                                onChange={(ev)=>updateModalInfo("amount", ev.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={css.even}>
                    <div className="row">
                        <div className="col-sm-5">
                             <label>{formatMessage(defaultMessages.interestFrequency)}</label>
                        </div>
                        <div className="hidden-md hidden-lg hidden-sm col-md-8">
                            <RenderMobileDropdown data={getInterestFrequencyData()} containerClass={css.containerClass}/>
                        </div>
                        <div className={`hidden-xs col-sm-7 ${css.selectWrapper}`}>
                            <RenderDesktopDropdown data={getInterestFrequencyData()} containerClass={css.containerClass}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5">
                             <label>{formatMessage(defaultMessages.interestMode)}</label>
                        </div>
                        <div className="hidden-md hidden-lg hidden-sm col-md-8">
                            <RenderMobileDropdown data={getInterestModeData()} containerClass={css.containerClass}/>
                        </div>
                        <div className={`hidden-xs col-sm-7 ${css.selectWrapper}`}>
                            <RenderDesktopDropdown data={getInterestModeData()} containerClass={css.containerClass}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5">
                             <label>{formatMessage(defaultMessages.maturityInstructions)}</label>
                        </div>
                        <div className="hidden-md hidden-lg hidden-sm col-md-8">
                            <RenderMobileDropdown data={getMaturityInstructionsData()} containerClass={css.containerClass}/>
                        </div>
                        <div className={`hidden-xs col-sm-7 ${css.selectWrapper}`}>
                            <RenderDesktopDropdown data={getMaturityInstructionsData()} containerClass={css.containerClass}/>
                        </div>
                    </div>
                </div>
                <div className={css.termsContainer} onClick={(ev)=>updateModalInfo("agreeConditions", !placementData.agreeConditions)}>
                    <div className="row">
                        <div className="col-xs-1">
                        {
                           placementData.agreeConditions &&
                            <div className={css.radioButton}>
                                <img src="m2u/static/icons/radio_selected.svg"/>
                            </div>
                            ||
                            <div className={css.radioButton}>
                                <img src="m2u/static/icons/radio_button.svg"/>
                            </div>
                        }
                        </div>
                        <div className="col-xs-11">
                            <div className={css.terms}>{formatMessage(defaultMessages.footerMessage)}</div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={` row ${css[ "btn-wrapper"]}`}>
                    <div className="col-sm-6 col-xs-12"/>
                    <div className="col-sm-6 col-xs-12">
                        <div>
                            <Button className="btn btn-success" onClick={asyncCheckMakePlacement}>
                                <span>{formatMessage(defaultMessages.makePlacement)}</span>
                                <img src="m2u/static/icons/add_white.svg"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};
PlacementModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(PlacementModal);