import React from "react";
import { Panel } from "react-bootstrap";
import * as css from "./RewardCard.scss";
import PopupMenu from "../PopupMenu";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    rewardPoints: {
        id: "app.dashboard.rewardPoints",
        defaultMessage: "Points",
    }
});
const RewardCard = ({intl,cardDetails, setCurrentAccount, goToAccountDetails, popupOpen, path, cardType }) => {
    const { formatMessage, formatNumber } = intl;
    const openDetails = function () {
        goToAccountDetails.call(this, "reward");
        setCurrentAccount.call(this, cardDetails);
    };
    return (
        <div className={css.container} onClick={openDetails}>
            <Panel>
                <div className={css.cardSummary}>
                    <div className={css.rewardSummary}>
                        <div className="row">
                            <div className="col-xs-10">
                                <span className={css.rewardName}>{cardDetails.longName}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <span className={css.rewardPoint}>{formatNumber(cardDetails.displayNumber)}</span>
                                <span className={css.rewardPointMessage}>{formatMessage(defaultMessages.rewardPoints)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
            {
                popupOpen &&
                <PopupMenu path={path} cardType={cardType}/>
            }
        </div>
    );
};
RewardCard.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(RewardCard);
