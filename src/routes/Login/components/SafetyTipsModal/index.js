import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./SafetyTipsModal.scss";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import SwipeableViews from "react-swipeable-views";
import Pagination from "../Pagination/Pagination";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    safetyTips: {
        id: "app.login.safetyTips",
        defaultMessage: "Safety Tips",
    },
        letsLookAtSafety: {
        id: "app.login.letsLookAtSafety",
        defaultMessage: "Let's look at some safety tips.",
    },
   youCanSkip: {
        id: "app.login.youCanSkip",
        defaultMessage: "You can skip if you already know how to protect your account when banking online",
    },
    okImReady: {
        id: "app.login.okImReady",
        defaultMessage: "OK, I’M READY",
    }
});
export const SafetyTipsModal = ({intl, updateSafetyStep, currentSafetyStepIndex}) => {
    const { formatMessage } = intl;
    function handleIndexOnSlider(newIndex) {
        updateSafetyStep(newIndex + 1);
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header closeButton onHide={updateSafetyStep.bind(this, 0)}>
                <h6>{formatMessage(defaultMessages.safetyTips)}</h6>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <h1>{formatMessage(defaultMessages.letsLookAtSafety)}</h1>
                            <p>{formatMessage(defaultMessages.youCanSkip)}</p>
                        </div>
                    </div>
                    <SwipeableViews index={currentSafetyStepIndex - 1} onChangeIndex={handleIndexOnSlider}>
                        <StepOne/>
                        <StepTwo/>
                        <StepThree/>
                        <StepFour/>
                    </SwipeableViews>
                    <div className={` hidden-lg hidden-md ${css[ "slide-pagination"]}`}>
                        <Pagination
                            dots={4}
                            index={currentSafetyStepIndex - 1}
                            onChangeIndex={()=>{}}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {   currentSafetyStepIndex !== 4 &&
                    <div className={` row ${css[ "btn-wrapper"]}`}>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"/>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div>
                                <Button className="btn btn-default" onClick={updateSafetyStep.bind(this, 0)}>
                                    {formatMessage({id: "app.dashboard.skip"})}
                                </Button>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div>
                                <Button className="btn btn-success" onClick={updateSafetyStep.bind(this, currentSafetyStepIndex + 1)}>
                                    {formatMessage({id: "app.personalize.next"})}
                                </Button>
                            </div>
                        </div>
                         <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"/>
                    </div>
                }
                {   currentSafetyStepIndex === 4 &&
                    <div className={`row ${css[ "btn-wrapper"]}`}>
                        <div className="col-md-4"/>
                            <div className="col-md-4">
                                <Button className="btn btn-success" onClick={updateSafetyStep.bind(this, 0)}>
                                    {formatMessage(defaultMessages.okImReady)}
                                </Button>
                            </div>
                        <div className="col-md-4"/>
                    </div>
                }
            </Modal.Footer>
        </Modal>
       );
};
SafetyTipsModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(SafetyTipsModal);
