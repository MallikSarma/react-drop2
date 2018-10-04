import React from "react";
import * as css from "./RecipientContainer.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import Recipient from "../Recipient";
import { Button } from "react-bootstrap";
const defaultMessages = defineMessages({
    myFavorites: {
        id: "app.transactions.myFavorites",
        defaultMessage: "My Favorites",
    },
    addNewFavorite: {
        id: "app.transactions.addNewFavorite",
        defaultMessage: "Add New Favorite",
    }
});

export const RecipientContainer = ({
    intl,
    togglePaymentModal,
    toggleFavoriteModal,
    recipients,
    toggleFavoritePopup,
    favoritePopup,
    pagination,
    updateFavoriteList,
    currentTab
}) => {
    const { formatMessage } = intl;
        function toggleFavoriteList(nextRecords) {
        if (nextRecords){
            updateFavoriteList(pagination.currentPageNo * 10 + 10);
        } else {
            updateFavoriteList(pagination.currentPageNo * 10 - 10);
        }
    }
    function getFooter(){
        return  (
                    <div className={`row ${css.favoriteFooter}`}>
                        <div className="hidden-xs col-sm-2"/>
                        <div className={`col-xs-1 ${css.pullHeaderLeft}`}>
                            {
                                pagination.previousPage &&
                                <a className={css.back_arrow} onClick={toggleFavoriteList.bind(this, false)}><img src="m2u/static/icons/next.svg"/></a>
                            }
                        </div>
                        <div className="col-sm-8 col-xs-10"/>
                        <div className={`col-xs-1 ${css.pullHeaderRight}`}>
                            {
                                pagination.nextPage &&
                                <a className={css.next_arrow} onClick={toggleFavoriteList.bind(this, true)}><img src="m2u/static/icons/next.svg"/></a>
                            }
                        </div>
                    </div>
                );
    }
    return (
        <div className={`row ${css.favoriteContainer}`}>
            <div className={css.fixContainer}>
                <div className="col-xs-12 col-sm-2" />
                <div className="col-xs-12 col-sm-8">
                    <div className="row">
                        <div className={`col-sm-2 col-xs-12 ${css.title}`}>
                            {formatMessage(defaultMessages.myFavorites)}
                        </div>
                        <div className={`col-sm-10 col-xs-12 ${css.favHolder}`}>
                            <div className="row">
                            {
                                recipients &&
                                recipients.map((obj,index)=>
                                    <Recipient
                                        key={index}
                                        favoriteInfo = {obj}
                                        toggleFavoritePopup = {toggleFavoritePopup}
                                        favoritePopup = {favoritePopup}
                                        index={obj.id}
                                        togglePaymentModal = {togglePaymentModal}
                                        toggleFavoriteModal = {toggleFavoriteModal}
                                        currentTab = {currentTab}
                                    />
                                )
                            }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="hidden-xs col-sm-2"/>
                        <div className={`hidden-xs-12 col-sm-10 ${css.favButton}`}>
                            <Button onClick={toggleFavoriteModal.bind(this,null)} ><span><img src="m2u/static/icons/add.svg"/></span>{formatMessage(defaultMessages.addNewFavorite)}</Button>
                        </div>
                    </div>
                    <div className="row">
                        {getFooter()}
                    </div>
                </div>
                <div className="col-xs-12 col-sm-2" />
            </div>
        </div>
    );
};

RecipientContainer.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(RecipientContainer);