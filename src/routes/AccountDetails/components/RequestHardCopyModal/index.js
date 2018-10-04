import React from "react";
import { Modal, Button } from "react-bootstrap";
import * as css from "./RequestHardCopyModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";
import _ from "lodash";
const defaultMessages = defineMessages({
    statementMonth: {
        id: "app.dashboard.statementMonth",
        defaultMessage: "Statement Month"
    },
    collectionMode: {
        id: "app.dashboard.collectionMode",
        defaultMessage: "Collection Mode"
    }
});
export const RequestHardCopyModal = ({ intl, setRequestHardCopyData, accountTransactions, requestHardCopy, toggleRequestHardCopyPopup, asyncCheckRequestHardCopy}) => {
    const { formatMessage } = intl;
    const address = requestHardCopy.collectionModes.address;
    function requestHardCopyContinue(){
        toggleRequestHardCopyPopup();
        asyncCheckRequestHardCopy();
    }
    function handleUpdate(key,value) {
        setRequestHardCopyData({
            key,
            value
        });
    }
    function getStatementDetails(){
        const list = accountTransactions.statementDetails.map((range,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{range.label}</span>
                            </div>,
                   "mobileDisplay": range.label,
                   "valueToPass": range
                };
        });
        const currentTitle = requestHardCopy.statementDetails.label;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (range)=>{handleUpdate("statementDetails", range);},
            list
        };
    }
    function getCollectionModes(){
        const list = accountTransactions.collectionModes.map((mode,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{mode.label}</span>
                            </div>,
                   "mobileDisplay": mode.label,
                   "valueToPass": mode
                };
        });
        const currentTitle = requestHardCopy.collectionModes.label;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (mode)=>{handleUpdate("collectionModes", mode);},
            list
        };
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header>
                <h6>{_.capitalize(formatMessage({id: "app.details.requestHardCopy"}))}</h6>
                <span className={css.close} onClick={toggleRequestHardCopyPopup.bind(this,false)}  />
            </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className={` row ${css.textBoxSection}`}>
                    <div className="col-xs-12">
                        <div className={`${css.row} row`}>
                            <div className="col-md-4">
                                <p>{formatMessage(defaultMessages.statementMonth)}</p>
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm col-md-8">
                                <RenderMobileDropdown data={getStatementDetails()} containerClass={css.containerClass}/>
                            </div>
                            <div className={`hidden-xs col-md-8 ${css.selectWrapper}`}>
                                <RenderDesktopDropdown data={getStatementDetails()} containerClass={css.containerClass}/>
                            </div>
                        </div>
                        <div className={`${css.row} row`}>
                            <div className="col-md-4">
                                <p>{formatMessage(defaultMessages.collectionMode)}</p>
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm col-md-8">
                                <RenderMobileDropdown data={getCollectionModes()} containerClass={css.containerClass}/>
                                <span className={css.address}>{address}</span>
                            </div>
                            <div className={`hidden-xs col-md-8 ${css.selectWrapper}`}>
                                <RenderDesktopDropdown data={getCollectionModes()} containerClass={css.containerClass}/>
                                <span className={css.address}>{address}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-xs-12 col-sm-8" />
                        <div className="col-xs-12 col-sm-4">
                            <Button className="btn btn-success" onClick={requestHardCopyContinue} >{formatMessage({id: "app.registration.continue"})} <img src="m2u/static/icons/foward_arrow_white.svg"/></Button>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};

RequestHardCopyModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(RequestHardCopyModal);
