import React from "react";
import * as css from "./AccountTransactionSummary.scss";
import { Panel } from "react-bootstrap";
import _ from "lodash";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    placement: {
        id: "app.details.placement",
        defaultMessage: "Placement"
    },
    manage: {
        id: "app.details.manage",
        defaultMessage: "Manage"
    }
});
export const AccountTransactionSummary = ({intl, data, certificateSummary, confirm, tacRequest, editClick, redrawSummary}) => {
    const { formatMessage, formatNumber  } = intl;
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    const amountClass = classnames({
            [css.amount]: !confirm,
            [css.confirmed] : confirm
    });
    const summary =  redrawSummary || certificateSummary;
    function checkIfItsNumber(value, key){
        let numberArray = ["amount"];
        if (numberArray.includes(key)){
            return formatNumber(Math.abs(value), decimalDigits);
        } else {
            return  value;
        }
    }
    function certificateInfo(){
        return (
            <Panel className={css.details}>
                { summary.certificateInfo.map((obj,index)=>{
                    return (<div key={index}>
                                <div className={css.row}>
                                    <span>{obj.label}</span>
                                    <span className={css.currency}>
                                        {checkIfItsNumber(obj.value, index)}
                                    </span>
                                </div>
                            </div>);
                    })
                }
            </Panel>
        );
    }
    function redrawInfo(){
        return (
            <Panel className={css.details}>
                { summary.redrawInfo.map((obj,index)=>{
                    return (<div key={index}>
                                <div className={css.row}>
                                    <span>{obj.label}</span>
                                    <span className={css.currency}>
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
                        { (summary.makePlacementModal || summary.uplift || summary.redrawModal) &&
                            <div className={css.head}>
                                <Panel>
                                    <div className={css.row}>
                                        <span>
                                            {formatMessage({id: "app.details.transferFrom"})}
                                            <span className={css.accountType}>{summary.accountInfo.name}</span>
                                            { summary.uplift &&
                                            <span className={css.account}>{summary.accountInfo.number}</span>
                                            }
                                        </span>
                                        { summary.makePlacementModal &&
                                        <span className={css.currency}>
                                            {_.capitalize(formatMessage({id: "app.details.availableBalance"}))} {' '}
                                            <span className={css.availableBalance}>
                                                {summary.currency}
                                                {formatNumber(Math.abs(summary.accountInfo.availableBalance), decimalDigits)}
                                             </span>
                                        </span>
                                        }
                                    </div>
                                </Panel>
                            </div>
                        }
                            <Panel className={amountClass}>
                                <div className={css.row}>
                                { summary.makePlacementModal &&
                                    <span>
                                    { confirm &&
                                        <span><span className={css.tick}><img src="m2u/static/icons/success_white.svg"/></span></span>
                                    }
                                        {formatMessage(defaultMessages.placement)}
                                        <span className={css.accountType}>{summary.linkedFDAccount.name}</span>
                                        <span className={css.account}>{summary.linkedFDAccount.number}</span>
                                    </span>
                                }
                                { summary.uplift &&
                                    <span>
                                    { confirm &&
                                        <span><span className={css.tick}><img src="m2u/static/icons/success_white.svg"/></span></span>
                                    }
                                        {formatMessage({id: "app.details.transferTo"})}
                                        <span className={css.accountType}>{summary.linkedFDAccount.name}</span>
                                        <span className={css.account}>{summary.linkedFDAccount.number}</span>
                                    </span>
                                }
                                { summary.manage &&
                                    <span>
                                    { confirm &&
                                        <span><span className={css.tick}><img src="m2u/static/icons/success_white.svg"/></span></span>
                                    }
                                        {formatMessage(defaultMessages.manage)}
                                        <span className={css.accountType}>{summary.linkedFDAccount.name}</span>
                                    </span>
                                }
                                { summary.redrawModal &&
                                    <span>
                                    { confirm &&
                                        <span><span className={css.tick}><img src="m2u/static/icons/success_white.svg"/></span></span>
                                    }
                                        {formatMessage(defaultMessages.manage)}
                                        <span className={css.accountType}>{summary.toAccount.name}</span>
                                        <span className={css.account}>{summary.toAccount.number}</span>
                                    </span>
                                }
                                    <span className={css.currency}>
                                        <span>
                                            {summary.currency}
                                            {   summary.principalAmount &&
                                                formatNumber(Math.abs(summary.principalAmount), decimalDigits)
                                                ||
                                                formatNumber(Math.abs(summary.totalAmount), decimalDigits)
                                            }
                                        </span>
                                        {(!confirm && summary.makePlacementModal) &&
                                            <span className={css.edit} onClick={editClick.bind(this, "showMakePlacement")}><img src="m2u/static/icons/edit.svg"/></span>
                                        }
                                        {(!confirm && summary.uplift) &&
                                            <span className={css.edit} onClick={editClick.bind(this, "uplift")}><img src="m2u/static/icons/edit.svg"/></span>
                                        }
                                        {(!confirm && summary.manage) &&
                                            <span className={css.edit} onClick={editClick.bind(this, "manage")}><img src="m2u/static/icons/edit.svg"/></span>
                                        }
                                        {(!confirm && summary.redrawModal) &&
                                            <span className={css.edit} onClick={editClick.bind(this, "showRedraw")}><img src="m2u/static/icons/edit.svg"/></span>
                                        }
                                    </span>
                                </div>
                            </Panel>
                            {
                                summary.certificateInfo &&
                                    certificateInfo()
                                    ||
                                    redrawInfo()
                            }
                            { summary.makePlacementModal &&
                            <Panel>
                                <div className={css.row}>
                                    <span>{formatMessage({id: "app.details.principalAmount"})}</span>
                                    <span className={css.currency}>
                                        <span className={css.principalAmount}>
                                            {summary.currency}
                                            {formatNumber(Math.abs(summary.principalAmount), decimalDigits)}
                                        </span>
                                    </span>
                                </div>
                            </Panel>
                            }
                            { summary.uplift &&
                            <Panel>
                                <div className={css.row}>
                                    <span>{formatMessage({id: "app.details.closingAmount"})}</span>
                                    <span className={css.currency}>
                                        <span className={css.closingAmount}>
                                            {summary.currency}
                                            {formatNumber(Math.abs(summary.closingAmount), decimalDigits)}
                                        </span>
                                    </span>
                                </div>
                            </Panel>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-2" />
            </div>
   );
};
AccountTransactionSummary.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(AccountTransactionSummary);