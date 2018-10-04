import React from "react";
import * as css from "./WealthContainer.scss";
import TotalMarketValue from "../TotalMarketValue";
import Legend from "../TotalMarketValue/Legend";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    assetAllocationBasedOnMarket: {
        id: "app.dashboard.assetAllocationBasedOnMarket",
        defaultMessage: "Asset allocation based on market value",
    }
});

export const WealthContainer = ({intl, wealthDetails, colors, goToWealthDetails, path}) => {
    const { formatMessage } = intl;
    return (
        <div className={`row ${css.wealthContainer}`}>
            <div className="col-sm-1"/>
            <div className={`col-sm-5 ${css.contentPadding}`}><TotalMarketValue data={wealthDetails}/></div>
            <div className={`col-sm-5 ${css.contentPadding}`}>
                <h6>{formatMessage(defaultMessages.assetAllocationBasedOnMarket)}</h6>
                <Legend goToWealthDetails={goToWealthDetails} path={path} data={wealthDetails}/>
            </div>
            <div className="col-sm-1"/>
        </div>
    );
};
WealthContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(WealthContainer);
