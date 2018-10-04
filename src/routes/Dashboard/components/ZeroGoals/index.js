import React from "react";
import * as css from "./ZeroGoals.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    zeroGoalsTitle: {
        id: "app.dashboard.zeroGoalsTitle",
        defaultMessage: "Set Your Goal!",
    },
     zeroGoalsMessage: {
        id: "app.dashboard.zeroGoalsMessage",
        defaultMessage: "Plan and achieve your goals are so simple with Goal-Based Savings Account. Get started today!",
    }
});
export const ZeroGoals = ({intl}) => {
    const {formatMessage} = intl;
    return (
        <div className={`${css[ "zero_goals-wrapper"]}`}>
            <div className="row">
                <div className="col-xs-12">
                    <div className={`${css.error_picture_container}`}>
                        <img
                            src="m2u/static/icons/set_your_goal.png"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <h2>{formatMessage(defaultMessages.zeroGoalsTitle)}</h2>
                </div>
             </div>
             <div className="row">
                <div className="col-xs-12">
                    <h6>{formatMessage(defaultMessages.zeroGoalsMessage)}</h6>
                </div>
            </div>
        </div>
);
};
ZeroGoals.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(ZeroGoals);