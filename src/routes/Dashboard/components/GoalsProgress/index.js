import React from "react";
import * as css from "./GoalsProgress.scss";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";


const defaultMessages = defineMessages({
    completed: {
        id: "app.dashboard.completed",
        defaultMessage: "COMPLETED",
    },
    savedSoFar: {
        id: "app.dashboard.savedSoFar",
        defaultMessage: "SAVED SO FAR",
    }
});
export const GoalsProgress = ({intl, goalElementDetails}) => {
        const {formatMessage,formatNumber} = intl;
        const goal = goalElementDetails.message;
        const amount = goalElementDetails.target;
        const percentage = 100 * goalElementDetails.achieved / amount;
        const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
        const radius = 107.5;
        const width = "100%";
        const height = 230;
        const viewBox = "0 0 230 230";
        const dashArray = radius * Math.PI * 2;
        const dashOffset = dashArray - dashArray * percentage / 100;

        let frontCircleClass = classnames({
            [css["CircularProgress-Fg"]]: true,
            [css.completed]: percentage === 100
        });
        const image = percentage !== 100 ? "m2u/static/icons/travel_orange.svg" : "m2u/static/icons/travel_green.svg";

        function getTspan(goalMessage) {
            let y = 90;
            return goalMessage.match(/.{1,11}/g).map(val=>{
                y += 15;
                return <tspan key={val} x="115" y = {y}>{val}</tspan>;
            });
        }
        return (
            <svg
                className={css.CircularProgress}
                width={width}
                height={height}
                viewBox={viewBox}
            >
                <circle
                    className={css["CircularProgress-Bg"]}
                    cx={115}
                    cy={115}
                    r={107.5}
                    strokeWidth="5px"
                />
                <circle
                    className={frontCircleClass}
                    cx={115}
                    cy={115}
                    r={107.5}
                    strokeWidth="5px"
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }}
                    transform="rotate(-90 115 115)"
                />
                <image xlinkHref={image} x="90" y="30" height="50px" width="50px"/>
                <text
                    className={css.goalMessage}
                    textAnchor="middle"
                >
                {getTspan(goal)}
                </text>
                <text
                    className={css["CircularProgress-Text"]}
                    x={115}
                    y={145}
                    textAnchor="middle"
                >
                {percentage === 100 ? formatMessage(defaultMessages.completed) : formatMessage(defaultMessages.savedSoFar)}
                </text>
                <text
                    className={css["CircularProgress-Amount"]}
                    x={115}
                    y={170}
                    textAnchor="middle"
                >
                {`RM ${formatNumber(amount,decimalDigits)}`}
                </text>
                <image xlinkHref="m2u/static/icons/show_more.svg" x="109" y="180" height="15px" width="15px" onClick={()=>{}} />
            </svg>
        );
};
GoalsProgress.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(GoalsProgress);
