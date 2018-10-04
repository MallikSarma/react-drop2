import React from "react";
import * as css from "./TotalSpendingContainer.scss";
import TotalSpending from "../TotalSpending";
import Legend from "../TotalSpending/Legend";
import { DropdownButton  } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    myTotalSpending: {
        id: "app.dashboard.myTotalSpending",
        defaultMessage: "My Spending",
    },
    allMaybankCards: {
        id: "app.dashboard.allMaybankCards",
        defaultMessage: "All Maybank Cards",
    },
});
export const TotalSpendingContainer = ({ intl, updateTotalSpendingInfo, totalSpendingInfo, spendings }) => {
    const { formatMessage } = intl;
    function processCardsList() {
        let obj = {};
        obj[formatMessage(defaultMessages.allMaybankCards)] = spendings.aggregate;
        return  {...obj, ...spendings.cardSpecific};
    }
    function updateCardsInfo(card) {
        updateTotalSpendingInfo({
            card
        });
    }
    const processedList = processCardsList();
    const dataForDoughnut = processedList[totalSpendingInfo.card || formatMessage(defaultMessages.allMaybankCards)];
    let dropDownTitle = totalSpendingInfo.card || formatMessage(defaultMessages.allMaybankCards);
    dropDownTitle = <span>{dropDownTitle}<img src="m2u/static/icons/open_dropdown.svg"/></span>;
    return (
        <div className={`container-fluid ${css.totalSpendingContainer}`}>
            <div className={css.totalSpendingContent}>
                <div className={`row ${css.totalSpendingHeader}`}>
                    <div className="col-sm-1 hidden-xs"/>
                    <div className="col-sm-3 col-xs-12">
                        <h2>{formatMessage(defaultMessages.myTotalSpending)}</h2>
                    </div>
                    <div className="col-sm-4 col-xs-12"/>
                    <div className="col-sm-4 col-md-3 col-xs-12">
                        <div className={`${css.selectWrapper}`}>
                            <div className="hidden-lg hidden-md">
                                <select className="form-control" onChange={(ev)=>updateCardsInfo(ev.target.value)}>
                                    {
                                        Object.keys(processedList).map((card, index)=>
                                            <option key={index} value={card}>{card}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="hidden-sm hidden-xs">
                                <DropdownButton id="total-card-dropdown" noCaret title={dropDownTitle}>
                                {
                                    Object.keys(processedList).map((card, index)=>
                                        <MenuItem key={index} onClick={(ev)=>updateCardsInfo(ev.target.innerText)}>
                                            {card}
                                        </MenuItem>
                                    )
                                }
                                </DropdownButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-1 col-xs-12"/>
                </div>
                <div className="row">
                    <div className="col-sm-1"/>
                    <div className="col-sm-5 col-xs-12">
                        <TotalSpending
                            data={dataForDoughnut}
                            colors={spendings.colorsList}
                            currency={spendings.currency}
                            updateTotalSpendingInfo={updateTotalSpendingInfo}
                            totalSpendingInfo={totalSpendingInfo}
                        />
                    </div>
                    <div className="col-sm-5 col-xs-12">
                        <Legend
                            data={dataForDoughnut}
                            colors={spendings.colorsList}
                            currency={spendings.currency}
                            updateTotalSpendingInfo={updateTotalSpendingInfo}
                            totalSpendingInfo={totalSpendingInfo}
                        />
                    </div>
                    <div className="col-sm-1"/>
                </div>
            </div>
        </div>
    );
};

TotalSpendingContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(TotalSpendingContainer);
