import React from "react";
import * as css from "./FavoriteSummary.scss";
import { Panel } from "react-bootstrap";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    registerBill: {
        id: "app.details.registerBill",
        defaultMessage: "Register Bill",
    },
    addNewFavorite: {
        id: "app.details.addNewFavorite",
        defaultMessage: "Add New Favourite",
    }
});
export const FavoriteSummary = ({intl, data, toggleFavoriteModal, confirm, editClick,toggleFavoriteSummary}) => {
    const { formatMessage } = intl;
    const amountClass = classnames({
            [css.amount]: !confirm
    });
    function getFavoriteDetails(){
        return (
            <Panel className={css.details}>
                { data.favInfo.favoriteDetails.map((obj,index)=>{
                    return (<div key={index}>
                                <div className={css.row}>
                                    <span className="col-xs-6">{obj.label}</span>
                                    <span className="col-xs-6">{obj.value}</span>
                                </div>
                            </div>);
                    })
                }
            </Panel>
        );
    }
    function getRegBillDetails(){
        return (
            <Panel className={css.details}>
                { data.regBillInfo.regBillDetails.map((obj,index)=>{
                    return (<div key={index}>
                                <div className={css.row}>
                                    <span className="col-xs-6">{obj.label}</span>
                                    <span className="col-xs-6">{obj.value}</span>
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
                            <Panel className={amountClass}>
                                <div className={css.row}>
                                    <span className={css.currency}>
                                        {formatMessage(defaultMessages.addNewFavorite)}
                                        <span className={css.accountType}>{data.favInfo.name}</span>
                                    </span>
                                </div>
                                {getFavoriteDetails()}
                            </Panel>

                            <Panel className={amountClass}>
                                <div className={css.row}>
                                    <span className={css.currency}>
                                        {formatMessage(defaultMessages.registerBill)}
                                        <span className={css.accountType}>{data.regBillInfo.name}</span>
                                    </span>
                                </div>
                                {getRegBillDetails()}
                            </Panel>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-2" />
            </div>
   );
};
FavoriteSummary.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(FavoriteSummary);