import React from "react";
import * as css from "./CardsContainer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    showMore: {
        id: "app.dashboard.showMore",
        defaultMessage: "SHOW MORE",
    },
    showLess: {
        id: "app.dashboard.showLess",
        defaultMessage: "SHOW LESS",
    }
});

export const CardsContainer = ({
        intl,
        popupMenu,
        Card,
        cardType,
        title,
        cardDetails,
        accountsToShow,
        togglePopupMenu,
        goToAccountDetails,
        path,
        modifyCardActions,
        setCurrentAccount,
        retrievalStartIndex,
        retrievalReference,
        getAsyncMoreBalanceCards,
        dashboardType
    }) => {
    const { formatMessage } = intl;

    function triggerTogglePopup(index, ev){
        ev.stopPropagation();
        togglePopupMenu({
            cardType,
            index
        });
    }

    function checkPopupOpen(cardIndex) {
        return !!Object.keys(popupMenu).find(card=>card === cardType) && (popupMenu[cardType] === cardIndex);
    }

    function getCards(){
        if (!cardDetails) {
            return;
        }
        let noOfRows = Math.round(cardDetails.length / 2);
       // if ( cardType !== "WealthCard" && noOfRows > cardsCountInfo / 2) {
           // noOfRows = cardsCountInfo / 2;
       // }
        return Array.apply(null, Array(noOfRows)).map((row, index)=>{
            return (
                <div className="row" key={index}>
                    <div className="col-lg-1 col-md-1 col-xs-12" />
                    <div className={`col-lg-5 col-md-5 col-sm-6 col-xs-12 ${css.odd}`}>
                        <Card
                            setCurrentAccount={setCurrentAccount}
                            modifyCardActions={modifyCardActions}
                            goToAccountDetails={goToAccountDetails}
                            cardDetails={cardDetails[2 * index]}
                            togglePopup={triggerTogglePopup.bind(this, 2 * index)}
                            popupOpen={checkPopupOpen(2 * index)}
                            cardType={cardType}
                            path={path}
                        />
                    </div>
                    <div className={`col-lg-5 col-md-5 col-sm-6 col-xs-12 ${css.even}`}>
                    { cardDetails[2 * index + 1] &&
                        <Card
                            setCurrentAccount={setCurrentAccount}
                            modifyCardActions={modifyCardActions}
                            goToAccountDetails={goToAccountDetails}
                            cardDetails={cardDetails[2 * index + 1]}
                            togglePopup={triggerTogglePopup.bind(this, 2 * index + 1)}
                            popupOpen={checkPopupOpen(2 * index + 1)}
                            cardType={cardType}
                            path={path}
                            even
                        />
                    }
                    </div>
                    <div className="col-lg-1 col-md-1 col-xs-12" />
                </div>
            );
        });
    }
    const showMoreConditionMap = {
        Card: "balance",
        otherAccounts: "others"
    };
    const reduceMap = {
        Card: {
            retrievalKey:"balance",
            dataKey: "accSummary"
        },
        otherAccounts: {
            retrievalKey:"others",
            dataKey: "otherAccountsSummary"
        },
    };
    const retrievalCheck = retrievalReference[showMoreConditionMap[cardType]];
    //const showMoreLessVisible = cardsCountInfo === 6 ? cardDetails.length > cardsCountInfo : true
    return (
        <div className={css.cardsContainer}>
            { title &&
                <div className={`row ${css.sectionHeader}`}>
                    <div className="col-lg-1 col-md-1 col-xs-12"/>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                        <h2>{formatMessage(title)}</h2>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" />
                    <div className="col-lg 3col-md-3 col-sm-3 col-xs-12"/>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-12"/>
                </div>
            }
            <div className="row">
                <div className={`${css.cards} col-md-12`}>
                    {getCards()}
                </div>
            </div>
            { cardType !== "WealthCard" &&
                <div className={`row ${css.more}`}>
                    <div className="col-sm-1" />
                    <div className="col-sm-10">
                        <hr/>
                        {
                            retrievalStartIndex !== retrievalCheck &&
                            <button onClick={()=>getAsyncMoreBalanceCards(reduceMap[cardType].retrievalKey)}>{formatMessage(defaultMessages.showMore)}</button>
                        }
                        {
                            retrievalStartIndex === retrievalCheck &&
                            <button onClick={()=>getAsyncMoreBalanceCards({reduce:true, key: reduceMap[cardType]})}>{formatMessage(defaultMessages.showLess)}</button>
                        }
                        <hr/>
                    </div>
                    <div className="col-sm-1" />
                </div>
            }
        </div>
    );
};

CardsContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(CardsContainer);
