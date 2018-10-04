import React from "react";
import * as css from "./RewardDetails.scss";
import { Panel } from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    rewardPoints: {
        id: "app.details.rewardPoints",
        defaultMessage: "Points"
    },
    treatsPoints: {
        id: "app.details.treatsPointsDetail",
        defaultMessage: "Treats Points"
    }
});
const RewardDetails = ({intl,rewardData,isTreatPoints}) => {
    const { formatMessage, formatNumber } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    return (
        <div className={css.container}>
            {
                isTreatPoints &&
                <Panel>
                    <div className={`col-xs-12 col-md-9 ${css.leftPanel}`}>
                        <div className={`row ${css.title}`}>
                            <span className={css.leftPadded}>
                                {formatMessage(defaultMessages[rewardData.id])}
                            </span>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-md-3 ${css.rightPanel} ${css.treatsPoints}`}>
                        <span>{formatNumber(rewardData.points,decimalDigits)} {formatMessage(defaultMessages.rewardPoints)}</span>
                    </div>
                </Panel>
                ||
                <Panel>
                    <div className={`col-xs-4 col-md-2 ${css.leftPanel}`}>
                        <img src={rewardData.imageUrl}/>
                    </div>
                    <div className={`col-xs-8 col-md-7 ${css.middlePanel}`}>
                        <div className={`row ${css.title}`}>
                            {rewardData.name}
                        </div>
                        <div className={`row ${css.number}`}>
                            <span>{rewardData.displayNumber}</span>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-md-3 ${css.rightPanel}`}>
                        <span>{formatNumber(rewardData.points,decimalDigits)} {formatMessage(defaultMessages.rewardPoints)}</span>
                    </div>
                </Panel>
            }
            
        </div>
   );
};
RewardDetails.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(RewardDetails);