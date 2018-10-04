import React from "react";
import { Panel} from "react-bootstrap";
import * as css from "./WealthCard.scss";
import { injectIntl, intlShape } from "react-intl";
import Slider from "../../../../components/Slider";
import classnames from "classnames";

export const WealthCard = ({ intl, goToAccountDetails, cardDetails }) => {
    const { formatNumber } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};

    return (
        <div className={css.container} onClick={goToAccountDetails.bind(this, cardDetails.id)}>
            <Panel>
                <div className={css.cardSummary}>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <div className={css.imgWrapper}>
                                <img src={cardDetails.imgAccessUrl}/>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                            <div className={css.wealthSummary}>
                                <p className={css.cardName}>{cardDetails.name}</p>
                                <span className={css.cardDescription}>{cardDetails.description}</span>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <div className={css.imgMore}>
                                <img src="m2u/static/icons/show_more.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
};
WealthCard.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(WealthCard);
