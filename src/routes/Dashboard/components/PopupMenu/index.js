import React from "react";
import * as css from "./popupMenu.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";


const defaultMessages = defineMessages({
    viewDetails: {
        id: "app.dashboard.viewDetails",
        defaultMessage: "View Details"
    },
    payBills: {
        id: "app.dashboard.payBills",
        defaultMessage: "Pay Bills"
    },
    transferFunds: {
        id: "app.dashboard.transferFunds",
        defaultMessage: "Transfer Funds"
    },
    viewStatement: {
        id: "app.dashboard.viewStatement",
        defaultMessage: "View Statement"
    },
    chequeServices: {
        id: "app.dashboard.chequeServices",
        defaultMessage: "Cheque Services"
    },
    addNickname: {
        id: "app.dashboard.addNickname",
        defaultMessage: "Add Nickname"
    },
    payCard: {
        id: "app.dashboard.payCard",
        defaultMessage: "Pay Card"
    },
    addSuppCard: {
        id: "app.dashboard.addSuppCard",
        defaultMessage: "Add Supp. Card"
    },
    blockAndReplaceCard: {
        id: "app.dashboard.blockAndReplaceCard",
        defaultMessage: "Block & Replace Card"
    },
    activateCard: {
        id: "app.dashboard.activateCard",
        defaultMessage: "Activate Card"
    },
    setPin: {
        id: "app.dashboard.setPin",
        defaultMessage: "Set Pin"
    },
    activationConfirmation: {
        id: "app.dashboard.activationConfirmation",
        defaultMessage: "Important Notice"
    },
    activatetionText: {
        id: "app.dashboard.activatetionText",
        defaultMessage: "Your Card hase been successfully activated"
    },
    activationOkBtnText: {
        id: "app.dashboard.activationOkBtnText",
        defaultMessage: "SET NOW"
    },
    activationCancelBtnText: {
        id: "app.dashboard.activationCancelBtnText",
        defaultMessage: "LATER"
    },
    makePlacement: {
        id: "app.dashboard.makePlacement",
        defaultMessage: "Make Placement"
    },
    makePayment: {
        id: "app.dashboard.makePayment",
        defaultMessage: "Make Payment"
    }

});
export const PopupMenu = ({intl, openDetails, menuButtonClick,searchButtonClick, cardType, path, cardDetails, modifyCardActions}) => {

    const { formatMessage } = intl;

    function activateCard() {
        modifyCardActions({
            activateCard: true,
            cardDetails
        });
    }
    function setPin() {
        modifyCardActions({
            setPin: true,
            cardDetails
        });
    }
    function getListForCards() {
        const mapForCard = {
            "casa" : [
                {
                    text: formatMessage(defaultMessages.viewDetails),
                    action: openDetails
                },
                {text: formatMessage(defaultMessages.payBills)},
                {text: formatMessage(defaultMessages.transferFunds)},
                {text: formatMessage(defaultMessages.viewStatement)},
                {text: formatMessage(defaultMessages.chequeServices)},
                {text: formatMessage(defaultMessages.addNickname)}
            ],
            "cards": [
                {
                    text: formatMessage(defaultMessages.activateCard),
                    action: activateCard
                },
                {
                    text: formatMessage(defaultMessages.setPin),
                    action: setPin
                },
                {text: formatMessage(defaultMessages.payCard)},
                {
                    text: formatMessage(defaultMessages.viewDetails),
                    action: openDetails
                },
                {text: formatMessage(defaultMessages.viewStatement)},
                {text: formatMessage(defaultMessages.addSuppCard)},
                {text: formatMessage(defaultMessages.blockAndReplaceCard)}
            ],
            "fixedDeposit": [
                {
                    text: formatMessage(defaultMessages.viewDetails),
                    action: openDetails
                },
                {text: formatMessage(defaultMessages.makePlacement)}
            ],
            "loans": [
                {
                    text: formatMessage(defaultMessages.viewDetails),
                    action: openDetails
                },
                {text: formatMessage(defaultMessages.makePayment)},
                {text: formatMessage(defaultMessages.viewStatement)}
            ]
        };
        return mapForCard[path];
    }
    function getData() {
        const listMap = {
            "Card": getListForCards(),
            "otherAccounts": [
                {text: formatMessage(defaultMessages.viewDetails)},
                {text: formatMessage(defaultMessages.transferFunds)},
                {text: formatMessage(defaultMessages.viewStatement)}
            ],
            "rewards": []
        };
        return listMap[cardType];
    }

    const data = getData();

    return (
            <div className={css.popup} onClick={(ev)=> ev.stopPropagation()}>
                {data.map( (item, index) => <a key={index} onClick={item.action}>{item.text}</a>)}
            </div>
        );
};
PopupMenu.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(PopupMenu);
