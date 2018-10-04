import React from "react";
import { Panel, Well,ProgressBar } from "react-bootstrap";
import * as css from "./Card.scss";
import { injectIntl, intlShape } from "react-intl";
import PopupMenu from "../PopupMenu";
import classnames from "classnames";


export const Card = ({ intl, cardDetails, setCurrentAccount, goToAccountDetails, popupOpen, togglePopup, cardType,path, modifyCardActions }) => {

    const { formatNumber } = intl;
    const {primaryBalance, secondaryBalance, amountConsumed, maxLimit} = cardDetails.pageData || {};
    let progress = 0;
    let progressLabel = "";
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    if (!primaryBalance && amountConsumed) {
        progress = amountConsumed.value / maxLimit.value * 100;
        progressLabel = <span>RM {formatNumber(amountConsumed.value, decimalDigits)} / {formatNumber(maxLimit.value, decimalDigits)}</span>;
    }
    const amountClass = classnames({
        [css.amounts]: true,
        [css.negativeAmount] : primaryBalance && primaryBalance.value < 0
    });
    const openDetails = function () {
        goToAccountDetails.call(this, path);
        setCurrentAccount.call(this, cardDetails);
    };
    return (
        <div className={css.container} onClick={openDetails}>
            <Panel>
                <div className={css.cardSummary}>
                    { cardDetails.imgAccessUrl && <img src={cardDetails.imgAccessUrl}/>}
                    <div className={css.accountSummary}>
                        <span className={css.accountName}>{cardDetails.longName}</span>
                        <span className={css.accountNumber}>{cardDetails.displayNumber}</span>
                    </div>
                    <div className={css.dot} onClick={togglePopup}/>
                </div>
                <Well>
                    {
                        primaryBalance &&
                        <div>
                            <div className="row">
                                <div className={css.balances}>
                                    <div className={amountClass}>
                                        <span className={css.currency}>{primaryBalance.currency}</span>
                                        <span>{formatNumber(Math.abs(primaryBalance.value), decimalDigits)}</span>
                                    </div>
                                    {
                                        secondaryBalance &&
                                        <div>
                                            <span className={css.currency}>{secondaryBalance.currency}</span>
                                            <span>{formatNumber(secondaryBalance.value, decimalDigits)}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        ||
                        <ProgressBar now={progress} label={progressLabel}/>
                    }
                </Well>{
                    popupOpen &&
                    <PopupMenu cardType={cardType} openDetails={openDetails} path={path} cardDetails={cardDetails} modifyCardActions={modifyCardActions}/>
                }
            </Panel>
        </div>
    );
};
Card.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(Card);