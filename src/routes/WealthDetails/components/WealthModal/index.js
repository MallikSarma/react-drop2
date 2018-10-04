import React from "react";
import { Button, Modal, Panel} from "react-bootstrap";
import * as css from "./WealthModal.scss";
import WealthSlider from "../WealthSlider";
import SwipeableViews from "react-swipeable-views";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    subscribeNew: {
        id: "app.dashboard.subscribeNew",
        defaultMessage: "Subscribe New fund",
    },
    editYourRisk: {
        id: "app.dashboard.editYourRisk",
        defaultMessage: "EDIT YOUR RISK TOLERANCE",
    },
    topFunds:  {
        id: "app.dashboard.topFunds",
        defaultMessage: "TOP 3 FUNDS BASED ON YOUR",
    },
    riskProfile:  {
        id: "app.dashboard.riskProfile",
        defaultMessage: "RISK PROFILE",
    },
    hlg: {
        id: "app.dashboard.hlg",
        defaultMessage: "HLG GLOBAL RESOURCES INCOME FUND",
    },
    amislamic: {
        id: "app.dashboard.amislamic",
        defaultMessage: "AMISLAMIC GREATER CHINA FUND",
    },
    mim: {
        id: "app.dashboard.mim",
        defaultMessage: "MIM Q TARGET RETURN FUND",
    },
    fundType: {
        id: "app.dashboard.fundType",
        defaultMessage: "FUND TYPE",
    },
    balanced: {
        id: "app.dashboard.balanced",
        defaultMessage: "BALANCED",
    },
    tolerance: {
        id: "app.dashboard.tolerance",
        defaultMessage: "TOLERANCE",
    },
    mixedAsset: {
        id: "app.dashboard.mixedAsset",
        defaultMessage: "MIXED ASSET",
    },
    lorem1: {
        id: "app.dashboard.lorem1",
        defaultMessage: "In imperdiet neque eu magna iaculis",
    },
    lorem2: {
        id: "app.dashboard.lorem2",
        defaultMessage: "eu faucibus lorem suscipit",
    },
    prospectus: {
        id: "app.dashboard.prospectus",
        defaultMessage: "PROSPECTUS",
    },
    moreFunds: {
        id: "app.dashboard.moreFunds",
        defaultMessage: "MORE FUNDS MATCHED YOUR RISK PROFILE",
    },
    fundHouse: {
        id: "app.dashboard.fundHouse",
        defaultMessage: "Fund House",
    },
    fundName: {
        id: "app.dashboard.fundName",
        defaultMessage: "Fund Name",
    },
    subscriptionDetails: {
        id: "app.dashboard.subscriptionDetails",
        defaultMessage: "SUBCSCRIPTION DETAILS",
    },
    investmentType: {
        id: "app.dashboard.investmentType",
        defaultMessage: "Investment Type",
    },
    fromAccount: {
        id: "app.dashboard.fromAccount",
        defaultMessage: "From Account",
    },
    amount: {
        id: "app.dashboard.amount",
        defaultMessage: "Amount",
    },
    currency: {
        id: "app.dashboard.currency",
        defaultMessage: "Currency",
    },
    availableUnitPrice: {
        id: "app.dashboard.availableUnitPrice",
        defaultMessage: "Available Unit Price",
    },
    salesCharges: {
        id: "app.dashboard.salesCharges",
        defaultMessage: "Sales Charges",
    },
    iHaveRead: {
        id: "app.dashboard.iHaveRead",
        defaultMessage: "I HAVE READ THE",
    },
    andAccept: {
        id: "app.dashboard.andAccept",
        defaultMessage: "AND ACCEPT",
    },
    termsAndConditions: {
        id: "app.dashboard.termsAndConditions",
        defaultMessage: "TERMS AND CONDITIONS",
    },
    subscribe: {
        id: "app.dashboard.subscribe",
        defaultMessage: "SUBSCRIBE",
    }
});

const myobj = {
     "items":[{
        "name":"ddfdfdfd"
     },{
        "name":"76767"
     },{
        "name":"5fdvhbgtt5"
     }]
};

const amountObj = {
     "items":[{
        "name":"RM"
     },{
        "name":"YEN"
     },{
        "name":"PHP"
     }]
};

export const WealthModal = ({intl,tempToSection, getInputData, cancelAction, getSliderPosition, sliderPosition}) => {
    const { formatMessage } = intl;
    function handleUpdate(key,ev) {
        getInputData({
            key,
            value : ev.target.value
        });
    }
    function handleSwitch() {
        getInputData({
            key: "recurrence",
            value : !tempToSection.recurrence
        });
    }
    function getDropDownValue() {
        const list = myobj.items.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj.name}</span>
                        </div>,
               "mobileDisplay": obj.name,
               "valueToPass": obj
            };
        });
        const currentTitle = "SELECT";
        return {
            id: "item_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"items",value:obj});},
            list
        };
    }
    function getDropDownAmount() {
        const list = amountObj.items.map((obj,index)=>{
            return {
               "display":<div className={css.selectedItem}>
                            <span>{obj.name}</span>
                        </div>,
               "mobileDisplay": obj.name,
               "valueToPass": obj
            };
        });
        const currentTitle = "RM";
        return {
            id: "amount_dropdown",
            title:  <div className={css.selectedItem}>
                        <span className={css.currentAmountTitle}>{currentTitle}</span>
                    </div>,
            action: (obj)=>{getInputData({key:"items",value:obj});},
            list
        };
    }

    function panelMobiles(){
        return (<div className={css.goals}>
                <SwipeableViews index={0}>
                    <div className={`col-xs-6 col-sm-7 ${css.panelCenter}`}>
                        <Panel className={css.panelTop}>
                            <label className={css.panelText}>{formatMessage(defaultMessages.hlg)}</label>
                            <label className={css.panelText}>{formatMessage(defaultMessages.fundType)} {":"}
                             {formatMessage(defaultMessages.balanced)}  </label>
                        </Panel>
                        <Panel className={css.panelDown}>
                            <label className={css.panelText}>{formatMessage(defaultMessages.lorem1)}{","}
                            {formatMessage(defaultMessages.lorem2)}{"."} </label>
                        </Panel>
                        <div className={css.topButton}>
                           <button type="button"  className={`btn ${css["btn-default-white"]}`}>
                                <span> {formatMessage(defaultMessages.prospectus)} </span> <img src="m2u/static/icons/download.svg"/>
                            </button>
                        </div>
                    </div>
                    <div className={`col-xs-6 col-sm-7 ${css.panelCenter}`}>
                            <Panel className={css.panelTop}>
                                <label className={`${css.panelText}`}>{formatMessage(defaultMessages.amislamic)}</label>
                                <label className={css.panelText}>{formatMessage(defaultMessages.fundType)} {":"}
                                {formatMessage(defaultMessages.tolerance)}  </label>
                            </Panel>
                            <Panel className={css.panelDown}>
                                <label className={css.panelText}>{formatMessage(defaultMessages.lorem1)}{","}
                                {formatMessage(defaultMessages.lorem2)}{"."} </label>
                            </Panel>
                             <div className={css.topButton}>
                                 <button type="button"  className={`btn ${css["btn-default-white"]}`}>
                                   <span> {formatMessage(defaultMessages.prospectus)} </span> <img src="m2u/static/icons/download.svg"/>
                                </button>
                            </div>
                    </div>
                    <div className={`col-xs-6 col-sm-7 ${css.panelCenter}`}>
                            <Panel className={css.panelTop}>
                                <label className={`topLabelLast ${css.panelText}`}>{formatMessage(defaultMessages.mim)}</label>
                                <label className={css.panelText}>{formatMessage(defaultMessages.fundType)} {":"}
                                {formatMessage(defaultMessages.mixedAsset)}  </label>
                            </Panel>
                            <Panel className={css.panelDown}>
                                <label className={css.panelText}>{formatMessage(defaultMessages.lorem1)}{","}
                                {formatMessage(defaultMessages.lorem2)}{"."} </label>
                            </Panel>
                            <div className={css.topButton}>
                                 <button type="button"  className={`btn ${css["btn-default-white"]}`}>
                                   <span> {formatMessage(defaultMessages.prospectus)} </span> <img src="m2u/static/icons/download.svg"/>
                                </button>
                            </div>
                    </div>
                </SwipeableViews>
            </div>);
    }

    return (
        <Modal show className={css.container}>
            <Modal.Header>
                    <h6 className={css.title}>{formatMessage(defaultMessages.subscribeNew)}</h6>
                   <span className={css.close} onClick={cancelAction} />
                </Modal.Header>
            <Modal.Body>
                <div className={css.lightgreybg}>
                    <div className="row">
                        <div className={`col-md-12 ${css.firstSubhHeader}`}>
                             <label className={css.bodySubHeader}>


                                {formatMessage(defaultMessages.editYourRisk)}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <WealthSlider getSliderPosition={getSliderPosition} sliderPosition={sliderPosition}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label className={css.bodySubHeader}>
                            {formatMessage(defaultMessages.topFunds)} {" "}
                            {
                                (sliderPosition < 38) && "CONSERVATIVE" || (sliderPosition > 39 && sliderPosition <= 70) && "MODERATE" 
                                || (sliderPosition > 70) && "AGGRESSIVE" || "MODERATE"
                            }
                            {" "} {formatMessage(defaultMessages.riskProfile)}
                            </label>
                        </div>
                    </div>
                    <div className="row hidden-xs hidden-sm">
                        <div className="col-md-4">
                            <Panel className={css.panelTop}>
                                <label className={css.panelText}>{formatMessage(defaultMessages.hlg)}</label>
                                <label className={css.panelText}>{formatMessage(defaultMessages.fundType)} {":"}
                                 {formatMessage(defaultMessages.balanced)}  </label>
                            </Panel>
                            <Panel className={css.panelDown}>
                                <label className={css.panelText}>{formatMessage(defaultMessages.lorem1)}{","}
                                {formatMessage(defaultMessages.lorem2)}{"."} </label>
                            </Panel>
                            <div className={css.topButton}>
                                 <button type="button"  className={`btn ${css["btn-default-white"]}`}>
                                   <span> {formatMessage(defaultMessages.prospectus)} </span> <img src="m2u/static/icons/download.svg"/>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Panel className={css.panelTop}>
                                <label className={`${css.panelText}`}>{formatMessage(defaultMessages.amislamic)}</label>
                                <label className={css.panelText}>{formatMessage(defaultMessages.fundType)} {":"}
                                {formatMessage(defaultMessages.tolerance)}  </label>
                            </Panel>
                            <Panel className={css.panelDown}>
                                <label className={css.panelText}>{formatMessage(defaultMessages.lorem1)}{","}
                                {formatMessage(defaultMessages.lorem2)}{"."} </label>
                            </Panel>
                             <div className={css.topButton}>
                                 <button type="button"  className={`btn ${css["btn-default-white"]}`}>
                                   <span> {formatMessage(defaultMessages.prospectus)} </span> <img src="m2u/static/icons/download.svg"/>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Panel className={css.panelTop}>
                                <label className={`topLabelLast ${css.panelText}`}>{formatMessage(defaultMessages.mim)}</label>
                                <label className={css.panelText}>{formatMessage(defaultMessages.fundType)} {":"}
                                {formatMessage(defaultMessages.mixedAsset)}  </label>
                            </Panel>
                            <Panel className={css.panelDown}>
                                <label className={css.panelText}>{formatMessage(defaultMessages.lorem1)}{","}
                                {formatMessage(defaultMessages.lorem2)}{"."} </label>
                            </Panel>
                            <div className={css.topButton}>
                                 <button type="button"  className={`btn ${css["btn-default-white"]}`}>
                                   <span> {formatMessage(defaultMessages.prospectus)} </span> <img src="m2u/static/icons/download.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`hidden-lg hidden-md ${css[ "goals-content_mobile"]}`}>
                        {panelMobiles()}
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                             <label className={css.bodySubHeader}>{"100"} {formatMessage(defaultMessages.moreFunds)}</label>
                        </div>
                    </div>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-md-4">
                             <label> {formatMessage(defaultMessages.fundHouse)} </label>
                        </div>
                        <div className="col-md-8">
                            <div className="hidden-lg hidden-md hidden-sm">
                                <RenderMobileDropdown data={getDropDownValue()} containerClass={css.containerClass}/>
                            </div>
                            <div className="hidden-xs">
                            <RenderDesktopDropdown data={getDropDownValue()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-md-4">
                             <label> {formatMessage(defaultMessages.fundName)} </label>
                        </div>
                        <div className="col-md-8">
                            <div className="hidden-lg hidden-md hidden-sm">
                                <RenderMobileDropdown data={getDropDownValue()} containerClass={css.containerClass}/>
                            </div>
                            <div className="hidden-xs">
                                <RenderDesktopDropdown data={getDropDownValue()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.greybg}>
                    <div className="row">
                        <div className="col-md-12">
                             <label className={css.bodySubHeader}>{formatMessage(defaultMessages.subscriptionDetails)}</label>
                        </div>
                    </div>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-md-4">
                             <label> {formatMessage(defaultMessages.investmentType)} </label>
                        </div>
                        <div className="col-md-8">
                            <div className="hidden-lg hidden-md hidden-sm">
                                <RenderMobileDropdown data={getDropDownValue()} containerClass={css.containerClass}/>
                            </div>
                            <div className="hidden-xs">
                                <RenderDesktopDropdown data={getDropDownValue()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-md-4">
                             <label> {formatMessage(defaultMessages.fromAccount)} </label>
                        </div>
                        <div className="col-md-8">
                            <div className="hidden-lg hidden-md hidden-sm">
                                <RenderMobileDropdown data={getDropDownValue()} containerClass={css.containerClass}/>
                            </div>
                            <div className="hidden-xs">
                                <RenderDesktopDropdown data={getDropDownValue()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-md-4">
                             <label> {formatMessage(defaultMessages.amount)} </label>
                        </div>
                        <div className="col-md-8">
                            <div className="hidden-lg hidden-md hidden-sm">
                                <RenderMobileDropdown data={getDropDownAmount()} containerClass={css.containerClass}/>
                            </div>
                            <div className="hidden-xs">
                                <RenderDesktopDropdown data={getDropDownAmount()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-md-4 col-xs-6">
                             <label> {formatMessage(defaultMessages.currency)} </label>
                        </div>
                        <div className={`col-md-8 col-xs-6 ${css.bottomLabel}`}>
                             <label> {"RM"} </label>
                        </div>
                    </div>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-md-4 col-xs-6">
                             <label> {formatMessage(defaultMessages.availableUnitPrice)} </label>
                        </div>
                        <div className={`col-md-8 col-xs-6 ${css.bottomLabel}`}>
                             <label> {"0.589700"} </label>
                        </div>
                    </div>
                    <div className={`row ${css.inputPair}`}>
                        <div className="col-md-4 col-xs-6">
                             <label> {formatMessage(defaultMessages.salesCharges)} {"%"} </label>
                        </div>
                        <div className={`col-md-8 col-xs-6 ${css.bottomLabel}`}>
                             <label> {"3.50%"} </label>
                        </div>
                    </div>
                </div>
                <div className={css.lightgreybg}>
                    <div className={`row ${css.inputPair}`}>
                        <div className={`hidden-xs col-md-12 ${css.termsContainer}`}>
                            <img src="m2u/static/icons/radio_button.svg"/>
                            <span> {formatMessage(defaultMessages.iHaveRead)} {" "} <span>{formatMessage(defaultMessages.prospectus)}</span>
                                {" "} {formatMessage(defaultMessages.andAccept)} <span className={css.lastSpan}>
                                {formatMessage(defaultMessages.termsAndConditions)}</span>
                            </span>
                        </div>
                        <div className="hidden-lg hidden-md hidden-sm  col-xs-1 termsDiv">
                             <img src="m2u/static/icons/radio_button.svg"/>
                        </div>
                        <div className={`hidden-lg hidden-md hidden-sm  col-xs-9 termsDiv ${css.bottomLabel}`}>
                             <span> {formatMessage(defaultMessages.iHaveRead)} {" "} <span>{formatMessage(defaultMessages.prospectus)}</span>
                                 {" "} {formatMessage(defaultMessages.andAccept)} <span className={css.lastSpan}>
                                 {formatMessage(defaultMessages.termsAndConditions)}</span>
                             </span>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <div className={css.whitebg}>
                    <div className="row ">
                         <div className="col-xs-12">
                            <Button className="btn btn-success"> {formatMessage(defaultMessages.subscribe)}
                                <img src="m2u/static/icons/transaction_white.svg"/>
                            </Button>
                        </div>
                    </div>
            </div>
            </Modal.Footer>
                }
        </Modal>
       );
};

WealthModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(WealthModal);
