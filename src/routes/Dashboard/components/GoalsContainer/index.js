import React from "react";
import * as css from "./GoalsContainer.scss";
import SwipeableViews from "react-swipeable-views";
import Pagination from "../../../Login/components/Pagination/Pagination";
import GoalsProgress from "../GoalsProgress";
import ZeroGoals from "../ZeroGoals";


import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    myGoals: {
        id: "app.dashboard.myGoals",
        defaultMessage: "MY GOALS",
    },
    createGoal: {
        id: "app.dashboard.createGoal",
        defaultMessage: "CREATE GOAL",
    }
});
export const GoalsContainer = ({
            intl,
            goalsDetails,
            goalsIndex,
            onClick,
            handleNextIndex,
            goalsStartIndex,
            retrievalStartIndex,
            retrievalReference,
            getAsyncMoreBalanceCards
        }) => {
    const { formatMessage } = intl;
    const reduceMap = {
        goal: {
            retrievalKey:"goal",
            dataKey: "goals"
        }
    };
    function handleIndexOnGoals(newIndex) {
        onClick(newIndex);
    }
    function getMoreGoals(){
        getAsyncMoreBalanceCards("goal":{ retrievalKey:"goal", dataKey: "goals"});
        handleNextIndex.call(this, goalsStartIndex + 3);
    }
    function removeGoals(){
        getAsyncMoreBalanceCards({reduce:true, key: "goals"});
        handleNextIndex.call(this, goalsStartIndex - 3);
    }
    function getGoals(){
        if (!goalsDetails) {
            return;
        }
        const goalsToRender = goalsDetails.length > 3 ? goalsDetails.slice(goalsStartIndex,goalsStartIndex + 3) : goalsDetails;
        return (<div className={`${css.goals} col-xs-10`}>
                {
                    goalsStartIndex >= 3 &&
                    <a className={css.back_arrow} onClick={removeGoals}><img src="static/icons/next.svg"/></a>
                }
                {
                    goalsToRender.map((goal, index)=>{
                        return (<div key={index} className="col-xs-4">
                                    <GoalsProgress goalElementDetails={goal}/>
                                </div>);
                    })
                }
                    <a className={css.next_arrow} onClick={getMoreGoals}><img src="static/icons/next.svg"/></a>
                </div>);
    }
    function getGoalsMobiles(){
        if (!goalsDetails) {
            return;
        }
        return (<div className={css.goals}>
                <SwipeableViews index={goalsIndex} onChangeIndex={handleIndexOnGoals}>
                {
                    goalsDetails.map((goal, index)=>{
                        return (<div key={index}>
                                    <GoalsProgress goalElementDetails={goal}/>
                                </div>);
                    })
                }
                </SwipeableViews>
            </div>);
    }
    return (
        <div className={`row ${css.goalsContainer}`}>
            {
               goalsDetails &&
                <div className={css.goalsContent}>
                    <div className={`row ${css.goalsHeader}`}>
                        <div className="col-sm-1 col-xs-12"/>
                        <div className="col-sm-4">
                            <h2>{formatMessage(defaultMessages.myGoals)}</h2>
                            <div className={`${css.goals_count_circle}`}>
                                <span>{goalsDetails.length}</span>
                            </div>
                        </div>
                        <div className="col-sm-2"/>
                        <div className="hidden-xs col-sm-5 col-md-4">
                            <button className={`${css.desktopCreateGoal} btn btn-default`}>
                                {formatMessage(defaultMessages.createGoal)}
                                <img src="m2u/static/icons/add.svg"  />
                            </button>
                        </div>
                        <div className="col-md-1 col-xs-12"/>
                    </div>
                    <div className={` hidden-lg hidden-md hidden-sm ${css[ "goals-content_mobile"]}`}>
                        {getGoalsMobiles()}
                    </div>
                    <div className={` hidden-lg hidden-md hidden-sm ${css[ "slide-pagination"]}`}>
                        <Pagination
                            dots={goalsDetails.length}
                            index={goalsIndex}
                            onChangeIndex={()=>{}}
                        />
                    </div>
                    <div className="row">
                        <div className="hidden-lg hidden-md hidden-sm col-xs-12">
                            <button className={`${css.mobileButton} btn btn-default`}>
                                {formatMessage(defaultMessages.createGoal)}
                                <img src="m2u/static/icons/add.svg"  />
                            </button>
                        </div>
                    </div>
                    <div className="hidden-xs row">
                        <div className="col-xs-1"/>
                        {getGoals()}
                        <div className="col-xs-1"/>
                    </div>
                </div>
                ||
                <div className="row">
                    <div className="col-xs-12">
                        <ZeroGoals/>
                    </div>
                    <div className="col-xs-12">
                        <button className="btn btn-default">
                            {formatMessage(defaultMessages.createGoal)}
                            <img src="m2u/static/icons/add.svg"  />
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

GoalsContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(GoalsContainer);
