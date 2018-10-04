import React from "react";
import * as css from "./RewardDetailsContainer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import RewardDetails from "../RewardDetails";
import { DropdownButton, MenuItem ,Button} from "react-bootstrap";
const defaultMessages = defineMessages({
    treatsPoints: {
        id: "app.details.treatsPoints",
        defaultMessage: "Treats Points"
    },
    membershipRewardPoints: {
        id: "app.details.membershipRewardPoints",
        defaultMessage: "Membership Reward Points"
    },
    treatsAirmiles: {
        id: "app.details.treatsAirmiles",
        defaultMessage: "Treats Airmiles"
    },
    redeemBtn: {
        id: "app.details.redeemBtn",
        defaultMessage: "REDEEM"
    },
    rewardAvailable: {
        id: "app.details.rewardAvailable",
        defaultMessage: "Available "
    },
    rewardHeaderMassage: {
        id: "app.details.rewardHeaderMassage",
        defaultMessage: "You latest Rewards Points Balance will be updated daily and only accounts with the balance of 2,000 Points and above will be displayed."
    }
});
export const RewardDetailsContainer = ({ intl ,currentAccount,getAsyncRewardDetails ,refreshRewards, rewards }) => {
    const { formatMessage ,formatNumber} = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    const rewardTypeData = refreshRewards.details || [];
    //let currentId = refreshRewards.length < 1 && rewardTypeData[0].id || refreshRewards;
   // let rewards = refreshRewards.length > 0 && rewardTypeData.find(obj=> obj.id === refreshRewards).details || rewardTypeData.find(obj=> obj.id === currentId).details;
    let availablePoints = currentAccount.displayNumber;   
    let currentTitle = currentAccount.longName;
    let rewardTitle = <div>
                        <span className={css.headerLeft}>{currentTitle}</span>
                        <span className={css.headerRight}>
                            <span className={css.rightPadded}>
                                {formatMessage(defaultMessages.rewardAvailable)}
                            </span>
                            <span className={css.availablePoints}>
                                <span className={css.rightPadded}>
                                    {formatNumber(availablePoints,decimalDigits)}
                                </span>
                                {formatMessage({id: "app.details.rewardPoints"})}
                            </span>
                            <span>
                                <img src="m2u/static/icons/open_dropdown.svg"/>
                            </span>
                        </span>
                    </div>;
    return (<div className={`row ${css.rewardDetailsContainer}`}>
                <div className="col-md-1"/>
                <div className={`col-sm-12 col-md-10 ${css.rewardDetailsHeader}`}>
                    <div>
                        <div className={`hidden-sm hidden-xs col-md-9 ${css.selectWrapper}`}>
                                <DropdownButton id="total-card-dropdown" noCaret title={rewardTitle}>
                                    {
                                        rewards.map(obj=>
                                            <MenuItem key={`menuitem-${obj.idx}`} onClick={getAsyncRewardDetails.bind(this,obj)}>
                                                {obj.longName}
                                            </MenuItem>
                                        )
                                    }
                                </DropdownButton>
                        </div>
                        <div className="hidden-md hidden-lg">
                            <select className="form-control col-md-8" onChange={(ev)=>getAsyncRewardDetails(ev.target.value)}>
                            {
                                rewards.map(obj=>
                                    <option key={obj.idx} value={obj} >
                                        {obj.longName}
                                    </option>
                                )
                            }
                            </select>
                            <span className={css.headerRight}>
                                <span className={css.rightPadded}>
                                    {formatMessage(defaultMessages.rewardAvailable)}
                                </span>
                                <span className={css.availablePoints}>
                                    <span className={css.rightPadded}>
                                        {formatNumber(availablePoints,decimalDigits)}
                                    </span>
                                    {formatMessage({id: "app.details.rewardPoints"})}
                                </span>
                            </span>
                        </div>
                        <div className={`hidden-xs hidden-sm col-xs-12 col-md-3 ${css.headerRight}`}>
                            <Button className="btn btn-success">{formatMessage(defaultMessages.redeemBtn)}</Button>
                        </div>
                    </div>
                    <div className={css.rewardCards}>
                        <div className="row">
                            <div className="col-xs-12 col-md-9">
                                <h6>{formatMessage(defaultMessages.rewardHeaderMassage)}</h6>
                            </div>
                        </div>
                        <div className="col-xs-4"/>
                    </div>
                    <div>
                       {
                         refreshRewards && refreshRewards.details.map((obj,index)=>{
                                return <RewardDetails key={index} rewardData={obj} isTreatPoints={false}/>;
                            })
                       }
                       {
                            refreshRewards && refreshRewards === rewardTypeData[0].id  &&
                            <RewardDetails rewardData={rewardTypeData[0]} isTreatPoints/>
                       }
                       {
                             refreshRewards && refreshRewards.length < 1 &&
                            <RewardDetails rewardData={rewardTypeData[0]} isTreatPoints/>
                       }
                    </div>
                    <div>
                        <button className="hidden-lg hidden-md col-xs-12 btn btn-success">{formatMessage(defaultMessages.redeemBtn)}</button>
                    </div>
                </div>
            </div>);
};

RewardDetailsContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(RewardDetailsContainer);
