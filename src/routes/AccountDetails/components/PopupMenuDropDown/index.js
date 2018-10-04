import React from "react";
import * as css from "./PopupMenuDropDown.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";


const defaultMessages = defineMessages({
    payCard: {
        id: "app.details.payCard",
        defaultMessage: "Pay Card"
    },
    payBills: {
        id: "app.details.payBills",
        defaultMessage: "Pay Bills"
    },
    addSubCard: {
        id: "app.details.addSubCard",
        defaultMessage: "Add Sub Card"
    },
    transferFunds: {
        id: "app.details.transferFunds",
        defaultMessage: "Transfer Funds"
    },
    blockAndReplaceCard: {
        id: "app.details.blockAndReplaceCard",
        defaultMessage: "Block & Replace Card"
    },
    applyEzyCash: {
        id: "app.details.applyEzyCash",
        defaultMessage: "Apply EzyCash"
    },
    applyEzyCashPlus: {
        id: "app.details.applyEzyCashPlus",
        defaultMessage: "Apply EzyCash Plus"
    },
    balanceTransfer: {
        id: "app.details.balanceTransfer",
        defaultMessage: "Balance Transfer"
    },payMonthlyInstallment: {
        id: "app.details.payMonthlyInstallment",
        defaultMessage: "Pay Monthly Installment"
    },payInstallmentDue: {
        id: "app.details.payInstallmentDue",
        defaultMessage: "Pay Installment Due"
    },redrawAdvancePayment: {
        id: "app.details.redrawAdvancePayment",
        defaultMessage: "Redraw Advance Payment"
    },growth: {
        id: "app.details.growth",
        defaultMessage: "Growth"
    },yield: {
        id: "app.details.yield",
        defaultMessage: "Yield"
    },value: {
        id: "app.details.value",
        defaultMessage: "Value"
    },funds: {
        id: "app.details.funds",
        defaultMessage: "Funds"
    }
});

export const PopupMenuDropDown = ({intl, detailType,cardType,termLoan,togglePopupMenu, buttonActions}) => {

    const { formatMessage } = intl;
    function getListForCards() {
        const mapForCard = {
            "C" : [
                {text: formatMessage(defaultMessages.payCard)},
                {text: formatMessage({id: "app.dashboard.addSuppCard"})},
                {text: formatMessage(defaultMessages.blockAndReplaceCard)},
                {text: formatMessage({id: "app.dashboard.activateCard"})},
                {text: formatMessage({id: "app.dashboard.setPin"})},
                {text: formatMessage({id: "app.dashboard.viewStatement"})},
                {text: formatMessage(defaultMessages.applyEzyCash)},
                {text: formatMessage(defaultMessages.applyEzyCashPlus)},
                {text: formatMessage(defaultMessages.balanceTransfer)}

            ],
            "J" : [
                {text: formatMessage(defaultMessages.payCard)},
                {text: formatMessage(defaultMessages.blockAndReplaceCard)}
            ],
            "R" : [
                {text: formatMessage(defaultMessages.payCard)},
                {text: formatMessage(defaultMessages.blockAndReplaceCard)}
            ]
        };
        return mapForCard[cardType];
    }
    function handleClickAction(item) {
        if (item.action){
            item.action();
        }
        togglePopupMenu();
    }
    function getData() {
        const listMap = {
            "cards": getListForCards(),
            "loans": [
                {
                    text: formatMessage(defaultMessages.payMonthlyInstallment),
                    action: buttonActions
                },
                {
                    text: formatMessage(defaultMessages.payInstallmentDue),
                    action: buttonActions
                },
                {
                    text: formatMessage(defaultMessages.redrawAdvancePayment),
                    action: buttonActions
                }
            ],
            "casa": [
                {text: formatMessage(defaultMessages.payBills)},
                {text: formatMessage(defaultMessages.transferFunds)}
            ],
            "shares": [
                {text: formatMessage(defaultMessages.growth)},
                {text: formatMessage(defaultMessages.yield)},
                {text: formatMessage(defaultMessages.value)},
                {text: formatMessage(defaultMessages.funds)}
            ]
        };
        return listMap[detailType];
    }
    const data = getData();
    if (detailType === "loans" && !termLoan){
        data.shift();
    }
    return (
            <div className={css.popup} onClick={(ev)=> ev.stopPropagation()}>
                {data.map( (item, index) => <a key={index} onClick={handleClickAction.bind(this, item)}>{item.text}</a>)}
            </div>
        );
};
PopupMenuDropDown.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(PopupMenuDropDown);
