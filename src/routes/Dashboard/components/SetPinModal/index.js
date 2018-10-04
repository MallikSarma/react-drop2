import React from "react";
import { Button } from "react-bootstrap";
import  Modal  from "../../../../components/GeneralModal";
import * as css from "./SetPinModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    importantPleaseEnsure: {
        id: "app.dashboard.importantPleaseEnsure",
        defaultMessage: "Important: Please ensure you have received physical card before proceed for Set PIN.",
    },
    newPin: {
        id: "app.personalize.newPin",
        defaultMessage: "New Pin",
    },
    confirmPin: {
        id: "app.dashboard.confirmPin",
        defaultMessage: "Confirm Pin",
    }
});

export const SetPinModal = ({ intl,asyncCheckCardsActions, updateInputCardDetails, toggleSetpinModal, data}) => {
    const { formatMessage } = intl;
    function saveSetpin() {
        asyncCheckCardsActions({
            showOneTime: true,
            setPin:true,
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
            <Modal.Header closeButton onHide={toggleSetpinModal.bind(this,null)}>
                <h6>{formatMessage({id: "app.dashboard.setPin"})}</h6>
            </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                    <div className={` row ${css.cardTitleSection}`}>
                        <div className="col-xs-4 col-md-3">
                            <div className={css.cardImage}>
                                <img className="img-responsive"  src={data.imgAccessUrl}/>
                            </div>
                        </div>
                        <div className="col-xs-8 col-md-9">
                            <h2>{data.name}</h2>
                            <span>{data.displayNumber}</span>
                        </div>
                    </div>
                    <div className={` row ${css.textSection}`}>
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-12">
                                    <h3>{formatMessage({id: "app.dashboard.notes"})}</h3>
                                    <span>{formatMessage(defaultMessages.importantPleaseEnsure)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={` row ${css.textBoxSection}`}>
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-md-4">
                                    <lable>{formatMessage(defaultMessages.newPin)}</lable>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        className={`${css[ "pair-input"]}`}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <lable>{formatMessage(defaultMessages.confirmPin)}</lable>
                                </div>
                                <div className="col-md-8">
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
                                    {formatMessage({id: "app.dashboard.iHereByAgree"})}
                                    <span> {formatMessage({id: "app.registration.t&c"})}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-xs-12 col-sm-8" />
                        <div className="col-xs-12 col-sm-4">
                            <Button onClick={saveSetpin} className="btn btn-success" >{formatMessage({id: "app.dashboard.setPin"})}</Button>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};

SetPinModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(SetPinModal);
