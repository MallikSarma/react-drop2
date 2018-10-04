import React from "react";
import {Button} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./RedrawModal.scss";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    redraw: {
        id: "app.details.redraw",
        defaultMessage: "REDRAW",
    },
    redrawModalHeader: {
        id: "app.details.redrawModalHeader",
        defaultMessage: "Advance Payment Redraw",
    },
    note: {
        id: "app.details.note",
        defaultMessage: "Notes",
    },
    toAccount: {
        id: "app.details.toAccount",
        defaultMessage: "To Account",
    },
    redrawModalfooter: {
        id: "app.details.redrawModalfooter",
        defaultMessage: "I AGREE TO THE TERMS AND CONDITIONS",
    },
    aProcessingFee: {
        id: "app.details.aProcessingFee",
        defaultMessage: "A processing fee of",
    },
    willBeDeducted: {
        id: "app.details.willBeDeducted",
        defaultMessage: "will be debited from your",
    },
    account: {
        id: "app.details.account",
        defaultMessage: "Account",
    }
});
export const RedrawModal = ({intl,redrawData,accountDetails,updateRedrawData,toggleRedrawLoan, asyncCheckRedraw}) => {
    const { formatMessage, formatNumber } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    const {allAccounts} = accountDetails;
    function updateModalInfo (key, value) {
        updateRedrawData({
            key,
            value
        });
    }
    function redrawClicked(){
        asyncCheckRedraw();
        toggleRedrawLoan.call(this, false);
    }
    function getToData(){
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
        const currentTitle = redrawData ? redrawData.toAccount.name : list[0].display;
        return {
            id: "get_to_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (obj)=>{updateModalInfo("toAccount", obj);},
            list
        };
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header>
                <h6>{formatMessage(defaultMessages.redrawModalHeader)}</h6>
                <span className={css.close} onClick={toggleRedrawLoan.bind(this, false)} />
            </Modal.Header>
            <Modal.Body>
                <div className={css.even}>
                <h5>
                    <span>{formatMessage(defaultMessages.aProcessingFee)} </span>
                    <span>{accountDetails.currency} </span>
                    <span>{ redrawData.processingFee ? formatNumber(Math.abs(redrawData.processingFee), decimalDigits) : formatNumber(Math.abs(accountDetails.processingFee), decimalDigits)} </span>
                    <span>{formatMessage(defaultMessages.willBeDeducted)} </span>
                    <span>{ redrawData.redrawFrom ? redrawData.redrawFrom.name : accountDetails.name} </span>
                    <span>{formatMessage(defaultMessages.account)} </span>
                </h5>
                    <h3>{formatMessage(defaultMessages.note)}</h3>
                    <span>{accountDetails.redrawNotes}</span>
                </div>
                <div className={css.odd}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-5">
                            <label>{formatMessage({"id":"app.details.amountHeader"})}</label>
                        </div>
                        <div className="col-xs-12 col-sm-7">
                            <span className={css.inputCurrency}>{accountDetails.currency}</span>
                            <input
                                type="text"
                                value={redrawData.amount || ""}
                                className={css.amountInput}
                                onChange={(ev)=>updateModalInfo("amount", ev.target.value)}
                            />
                        </div>
                    </div>
                    <div className={`row ${css.selectWrapper}`}>
                        <div className=" col-xs-12 col-sm-5">
                             <label>{formatMessage(defaultMessages.toAccount)}</label>
                        </div>
                        <div className="hidden-md hidden-lg hidden-sm col-md-8">
                            <RenderMobileDropdown data={getToData()} containerClass={css.containerClass}/>
                        </div>
                        <div className={`hidden-xs col-xs-12 col-sm-7 ${css.selectWrapper} ${css.accountDropdown}`}>
                            <RenderDesktopDropdown data={getToData()} containerClass={css.containerClass}/>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className={` row ${css[ "btn-wrapper"]}`}>
                    <div className={`col-xs-2 ${css.termsContainer}`}  onClick={(ev)=>updateModalInfo("agreeConditions", !redrawData.agreeConditions)}>
                        {
                           redrawData.agreeConditions &&
                            <div className={css.radioButton}>
                                <img src="m2u/static/icons/radio_selected.svg"/>
                            </div>
                            ||
                            <div className={css.radioButton}>
                                <img src="m2u/static/icons/radio_button.svg"/>
                            </div>
                        }
                    </div>
                    <div className="col-xs-6">
                        <span className={css.terms} onClick={(ev)=>updateModalInfo("agreeConditions", !redrawData.agreeConditions)}>{formatMessage({id:"app.registration.agree"})} </span>
                        <span className={css.link} onClick={()=>{window.open("static/img/Blank_pdf.pdf", "_blank");}}>{formatMessage({id:"app.registration.t&c"})}</span>
                    </div>
                    <div className="col-xs-4">
                        <div>
                            <Button className="btn btn-success" onClick={asyncCheckRedraw}>
                                <span>{formatMessage(defaultMessages.redraw)}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};
RedrawModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(RedrawModal);