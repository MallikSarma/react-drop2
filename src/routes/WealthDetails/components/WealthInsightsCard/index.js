import React from "react";
import { Panel, Well } from "react-bootstrap";
import * as css from "./WealthInsightsCard.scss";
import { injectIntl, intlShape} from "react-intl";
export const WealthInsightsCard = ({ data, intl}) => {
    return (
        <div className={css.container}>
            <Panel>
                <Well>
                    <span className={css.category}>{(data.category).toUpperCase()}</span>
                    <span className={css.region}>{(data.location).toUpperCase()}</span>
                </Well>
                <div className={css.cardSummary}>
                    <span>{(data.date).toUpperCase()}</span>
                    <h6>{data.headLine}</h6>
                </div>
            </Panel>
        </div>
    );
};
WealthInsightsCard.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(WealthInsightsCard);