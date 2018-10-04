import React from "react";
import * as css from "./FdUpliftmentModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import { DropdownButton, MenuItem, Button, Modal, Radio } from "react-bootstrap";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
const defaultMessages = defineMessages({
    transferTo: {
        id: "app.details.transferTo",
        defaultMessage: "Transfer To"
    },
    certificateNumber:{
        id: "app.details.certificateNumber",
        defaultMessage: "Certificate Number"
    },
    intrest:{
        id: "app.details.intrest",
        defaultMessage: "Interest"
    },
    intrestMode:{
        id: "app.details.intrestMode",
        defaultMessage: "Interest Mode"
    },
    tenure:{
        id: "app.details.tenure",
        defaultMessage: "Tenure"
    },
    closingAmount:{
        id: "app.details.closingAmount",
        defaultMessage: "Closing Amount"
    },
    fromAccount: {
        id: "app.details.fromAccount",
        defaultMessage: "From Account"
    },
    transferAmount: {
        id: "app.details.transferAmount",
        defaultMessage: "Transfer Amount"
    },
    Referance: {
        id: "app.details.referance",
        defaultMessage: "Referance"
    },
    uplift: {
        id: "app.details.uplift",
        defaultMessage: "Uplift"
    },
    maybankConventional: {
        id: "app.details.maybankConventional",
        defaultMessage: "Maybank Conventional Fixed Deposit - Upliftment"
    },
    maturityDate: {
        id: "app.details.maturityDate",
        defaultMessage: "Maturity Date"
    }
});

export const FdUpliftmentModal = ({intl, upliftManageFD, setUpliftManageData, upliftManageFDdata, accountTransactions, asyncCheckUpliftManage}) => {
    const { formatMessage } = intl;
    const {allAccounts} = accountTransactions.defaultData;
    function updateModalInfo (key, value) {
        setUpliftManageData({
            key,
            value
        });
    }
    function getTransferToData(){
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
    return (
        <div>
            <Modal show className={css.container}>
                <Modal.Header>
                    <h6>{formatMessage(defaultMessages.maybankConventional)}</h6>
                    <span className={css.close} onClick={upliftManageFD} />
                </Modal.Header>
                <Modal.Body>
                    <div className={css.greybg}>
                        <div className={`row ${css.seperator} ${css.accountDropdown}`}>
                            <div className="col-sm-5">
                                <label>{formatMessage(defaultMessages.transferTo)}</label>
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm col-md-8">
                                <RenderMobileDropdown data={getTransferToData()} containerClass={css.containerClass}/>
                            </div>
                            <div className={`hidden-xs col-md-7 col-sm-7 ${css.selectWrapper}`}>
                                <RenderDesktopDropdown data={getTransferToData()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                    </div>
                    <div className={css.whitebgMiddle}>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                <label>{formatMessage({id: "app.details.principalAmount"})}</label>
                            </div>
                            <div className="col-sm-7">
                                <span className={css.inputCurrency}>{accountTransactions.currency}</span>
                                <input
                                    type="text"
                                    value={upliftManageFDdata.principal}
                                    className={css.amountInput}
                                    onChange={(ev)=>updateModalInfo("principal", ev.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={css.greybg}>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                <label>{formatMessage({id: "app.details.accountNumber"})}</label>
                            </div>
                            <div className="col-sm-7">
                                <input
                                    disabled
                                    type="text"
                                    value={upliftManageFDdata.linkedFDAccNumber}
                                    className={css.commonInput}
                                    onChange={(ev)=>updateModalInfo("number", ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                <label>{formatMessage(defaultMessages.certificateNumber)}</label>
                            </div>
                            <div className="col-sm-7">
                                <input
                                    disabled
                                    type="text"
                                    value={upliftManageFDdata.certNumber}
                                    className={css.commonInput}
                                    onChange={(ev)=>updateModalInfo("certNumber", ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                 <label>{formatMessage({id:"app.details.maturityDate"})}</label>
                            </div>
                            <div className="col-sm-7">
                                <input
                                    disabled
                                    type="text"
                                    value={upliftManageFDdata.maturityDate}
                                    className={css.commonInput}
                                    onChange={(ev)=>updateModalInfo("maturityDate", ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                 <label>{formatMessage(defaultMessages.intrest)}</label>
                            </div>
                            <div className="col-sm-7">
                                <input
                                    disabled
                                    type="text"
                                    value={`${upliftManageFDdata.interestPA}% p.a.`}
                                    className={css.commonInput}
                                    onChange={(ev)=>updateModalInfo("interestPA", ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                <label>{formatMessage({id:"app.details.term"})}</label>
                            </div>
                            <div className="col-sm-7">
                                <input
                                    disabled
                                    type="text"
                                    value="On Maturity"
                                    className={css.commonInput}
                                    onChange={(ev)=>updateModalInfo("termInMonths", ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                <label>{formatMessage(defaultMessages.intrestMode)}</label>
                            </div>
                            <div className="col-sm-7">
                                <input
                                    disabled
                                    type="text"
                                    value={upliftManageFDdata.interestPayment}
                                    className={css.commonInput}
                                    onChange={(ev)=>updateModalInfo("interestPayment", ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                 <label>{formatMessage({id: "app.details.maturityInstructions"})}</label>
                            </div>
                            <div className="col-sm-7">
                                <input
                                    disabled
                                    type="text"
                                    value={upliftManageFDdata.uponMaturity}
                                    className={css.commonInput}
                                    onChange={(ev)=>updateModalInfo("uponMaturity", ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                 <label>{formatMessage(defaultMessages.tenure)}</label>
                            </div>
                            <div className="col-sm-7">
                                <input
                                    disabled
                                    type="text"
                                    value="3 Months"
                                    className={css.commonInput}
                                    onChange={(ev)=>updateModalInfo("tenure", ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className={`row ${css.seperator}`}>
                            <div className="col-sm-5">
                                 <label>{formatMessage(defaultMessages.closingAmount)}</label>
                            </div>
                            <div className="col-sm-7">
                                <span className={css.inputCurrency}>{accountTransactions.currency}</span>
                                <input
                                    disabled
                                    type="text"
                                    value={upliftManageFDdata.closingAmount}
                                    className={css.amountInput}
                                    onChange={(ev)=>updateModalInfo("closingAmount", ev.target.value)}
                                />
                            </div>
                        </div>
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
                                <Button className="btn btn-success" onClick={asyncCheckUpliftManage.bind(this, "uplift")}>
                                    <span>{formatMessage(defaultMessages.uplift).toUpperCase()}</span>
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
FdUpliftmentModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(FdUpliftmentModal);
