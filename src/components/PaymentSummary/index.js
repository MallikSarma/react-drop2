import React from "react";
import * as css from "./PaymentSummary.scss";
import { Panel } from "react-bootstrap";
import _ from "lodash";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    payFrom: {
        id: "app.details.payFrom",
        defaultMessage: "Pay from"
    },
    id: {
        id: "app.details.id",
        defaultMessage: "Id"
    },
    otherAccountType: {
        id: "app.details.otherAccountType",
        defaultMessage: "Other Account Type"
    },
    recurrence: {
        id: "app.details.recurrence",
        defaultMessage: "Recurrence"
    },
    phoneNumber: {
        id: "app.details.phoneNumber",
        defaultMessage: "Phone Number"
    },
    taxNumber: {
        id: "app.details.taxNumber",
        defaultMessage: "Tax Number"
    },
    instalmentNumber: {
        id: "app.details.instalmentNumber",
        defaultMessage: "Instalment Number"
    },
    epfNumber: {
        id: "app.details.epfNumber",
        defaultMessage: "EPF Number"
    },
    membersName: {
        id: "app.details.membersName",
        defaultMessage: "MembersvName"
    },
    icNumber: {
        id: "app.details.icNumber",
        defaultMessage: "IC Number"
    },
    paymentType: {
        id: "app.details.paymentType",
        defaultMessage: "Payment Type"
    },
    epfAccountType: {
        id: "app.details.epfAccountType",
        defaultMessage: "EPF Account Type"
    },
    zakatType: {
        id: "app.details.zakatType",
        defaultMessage: "Zakat Type"
    },
    myGSTAccountNumber: {
        id: "app.details.myGSTAccountNumber",
        defaultMessage: "MyGST Account Number",
    },
    filingPeriod: {
        id: "app.details.filingPeriod",
        defaultMessage: "Filing Period",
    },
    mediaNumber: {
        id: "app.details.mediaNumber",
        defaultMessage: "Media Number",
    },
    paymentCode: {
        id: "app.details.paymentCode",
        defaultMessage: "Payment Code",
    },
    assesmentYear: {
        id: "app.details.assesmentYear",
        defaultMessage: "Assesment Year",
    }
});
export const PaymentSummary = ({intl, data, toggleFavoriteModal, confirm, editClick}) => {
    const { formatMessage, formatNumber  } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    const amountClass = classnames({
            [css.amount]: !confirm,
            [css.confirmed] : confirm
    });
    function quickPayInfo(){
        return (
            <Panel className={css.details}>
                { data.quickPayInfo.map((obj,index)=>{
                    return (<div key={index}>
                                <div className={css.row}>
                                    <span className="col-xs-6">{obj.label}</span>
                                    <span className={`col-xs-6 ${css.currency}`}>
                                        {obj.value}
                                    </span>
                                </div>
                            </div>);
                    })
                }
            </Panel>
        );
    }
    return (
            <div className={`row ${css.container}`}>
                <div className="col-xs-12 col-sm-2" />
                <div className="col-xs-12 col-sm-8">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className={css.head}>
                                <Panel>
                                    <div className={css.row}>
                                        <span>
                                            {formatMessage(defaultMessages.payFrom)}
                                            <span className={css.accountType}>{data.accountInfo.name}</span>
                                        </span>
                                        <span className={css.currency}>
                                            {_.capitalize(formatMessage({id: "app.details.availableBalance"}))} {' '}
                                            <span className={css.availableBalance}>
                                                {data.currency}
                                                {formatNumber(Math.abs(data.accountInfo.availableBalance), decimalDigits)}
                                             </span>
                                         </span>
                                    </div>
                                </Panel>
                            </div>
                            <Panel className={amountClass}>
                                <div className={css.row}>
                                    <span>
                                    { confirm &&
                                        <span>
                                            <span className={css.tick}>
                                                <img src="m2u/static/icons/success_white.svg"/>
                                            </span>
                                        </span>
                                    }
                                        {formatMessage({id:"app.details.payTo"})}
                                        <span className={css.accountType}>{data.linkedAccount.name}</span>
                                        <span className={css.account}>{data.linkedAccount.number}</span>
                                    </span>
                                    <span className={css.currency}>
                                        <span>
                                            {data.currency}
                                            {formatNumber(Math.abs(data.totalAmount), decimalDigits)}
                                        </span>
                                        {!confirm &&
                                            <span className={css.edit} onClick={editClick.bind(this, "showQuickPay")}><img src="m2u/static/icons/edit.svg"/></span>
                                        }
                                        {
                                            confirm &&
                                            <a className={css.favoriteStar} onClick={()=>toggleFavoriteModal()}>
                                                <img src="m2u/static/icons/favorite_gold.svg"/>
                                            </a>
                                        }
                                    </span>
                                </div>
                            </Panel>
                            {quickPayInfo()}
                            <Panel>
                                <div className={css.row}>
                                    <span>{formatMessage({id: "app.details.totalAmount"})}</span>
                                    <span className={css.currency}>
                                        <span className={css.principalAmount}>
                                            {data.currency}
                                            {formatNumber(Math.abs(data.totalAmount), decimalDigits)}
                                        </span>
                                    </span>
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-2" />
            </div>
   );
};
PaymentSummary.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(PaymentSummary);