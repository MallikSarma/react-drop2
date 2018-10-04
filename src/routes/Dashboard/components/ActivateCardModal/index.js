import React from "react";
import { Button, OverlayTrigger } from "react-bootstrap";
import  Modal  from "../../../../components/GeneralModal";
import * as css from "./ActivateCardModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import Tooltip from "../../../../components/Tooltip";

const defaultMessages = defineMessages({
    kindlyBeadvised: {
        id: "app.dashboard.kindlyBeadvised",
        defaultMessage: "Kindly be advised once you have activated your new " +
                        "PIN & PAY card, your current card (if any) will be deactivated immediately.",
    },
    notes: {
        id: "app.dashboard.notes",
        defaultMessage: "Notes",
    },
    thisOnlyAppliesTo: {
        id: "app.personalize.thisOnlyAppliesTo",
        defaultMessage: "This only applies to all individual Credit/Charge card(s)." +
                        "In order to mitigate any fraudulent and unauthorized usage kindly " +
                        "ensure that the physical card is in your custody before proceeding " +
                        "for card activation.",
    },
    expiryYearForYourCard: {
        id: "app.dashboard.expiryYearForYourCard",
        defaultMessage: "Expiry Year of Your New Card",
    },
    iHereByAgree: {
        id: "app.dashboard.iHereByAgree",
        defaultMessage: "I HEREBY AGREE TO THE",
    },
    activate: {
        id: "app.dashboard.activate",
        defaultMessage: "ACTIVATE",
    },
    viewSample: {
        id: "app.dashboard.viewSample",
        defaultMessage: "VIEW SAMPLE"
    }

});

export const ActivateCardModal = ({ intl, asyncCheckCardsActions, updateInputCardDetails, toggleActivateModal, data}) => {
    const { formatMessage } = intl;
    function activationConfirmation() {
        asyncCheckCardsActions({
            showOneTime: true,
            activateCard:true,
            cardDetails:data
        });
    }
    function updateModalInfo (key, value) {
        updateInputCardDetails({
            key,
            value
        });
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header closeButton onHide={toggleActivateModal.bind(this,null)}>
                <h6>{formatMessage({id: "app.dashboard.activateCard"})}</h6>
            </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                    <div className={` row ${css.cardTitleSection}`}>
                        <div className={css.cardInfo}>
                            <div className={css.cardImage}>
                                <img className="img-responsive"  src={data.imgAccessUrl}/>
                            </div>
                            <div>
                               <h2>{data.name}</h2>
                               <span>{data.displayNumber}</span>
                            </div>
                        </div>
                    </div>
                    <div className={` row ${css.textSection}`}>
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-12">
                                    <p>{formatMessage(defaultMessages.kindlyBeadvised)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <h3>{formatMessage(defaultMessages.notes)}</h3>
                                    <span>{formatMessage(defaultMessages.thisOnlyAppliesTo)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` row ${css.textBoxSection}`}>
                        <div className="col-xs-12">
                            <div className="row">
                                <div className={`col-md-5 ${css.lableWithHelp}`}>
                                    <lable>{formatMessage(defaultMessages.expiryYearForYourCard)}</lable>
                                    <Tooltip/>
                                </div>
                                <div className={`${css.tooltipWithInput} col-md-7`}>
                                    <input
                                        className={`${css[ "pair-input"]}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="container-fluid">
                    <div className={css.termsContainer} onClick={(ev)=>updateModalInfo("conditionAgreed", !data.conditionAgreed)}>
                        <div className="row">
                            <div className="col-xs-1">
                            {
                               data.conditionAgreed &&
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
                                <p>
                                    {formatMessage(defaultMessages.iHereByAgree)}
                                    <span> {formatMessage({id: "app.registration.t&c"})}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-xs-12 col-sm-8" />
                        <div className="col-xs-12 col-sm-4">
                            <Button onClick={activationConfirmation} className="btn btn-success" >{formatMessage(defaultMessages.activate)}</Button>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};

ActivateCardModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(ActivateCardModal);
