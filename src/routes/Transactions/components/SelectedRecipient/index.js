import React from "react";
import * as css from "./SelectedRecipient.scss";
import { Panel } from "react-bootstrap";
import { injectIntl, intlShape } from "react-intl";
export const SelectedRecipient = ({
    intl,
    favoriteInfo,
    index,
    currentTab
}) => {
    const { formatNumber } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    const {name, accountNumber,amount} = favoriteInfo;
    return (
            <div className={css.container}>
                <Panel>
                {
                    <div className="row">
                        <div className="col-xs-1">
                            <div className={css.selectFavorite}>
                                <a><img src="m2u/static/icons/tick.svg" /></a>
                            </div>
                        </div>
                        <div className="col-xs-5">
                            <div className={`${css.favoriteContent} ${css.row}`} key={accountNumber}>
                                <span className={css.favoriteName}>{name}</span>
                                <span className={css.number}>{accountNumber}</span>
                            </div>
                        </div>
                        <div className={`col-xs-6 ${css.toggleButton} pull-right`}>
                            <span className={css.currency}>RM</span>
                            <span className={css.amount}>
                                {formatNumber(amount, decimalDigits)}
                            </span>
                            <span className={css.menu}><img src="m2u/static/icons/show_more.svg" /></span>
                        </div>
                    </div>
                }
                </Panel>
            </div>
    );
};
SelectedRecipient.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(SelectedRecipient);