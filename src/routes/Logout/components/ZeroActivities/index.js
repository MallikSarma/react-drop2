import React from "react";
import * as css from "./ZeroActivities.scss";
import { injectIntl, intlShape } from "react-intl";
import SwipeableViews from "react-swipeable-views";
import Pagination from "../../../Login/components/Pagination/Pagination";

export const ZeroActivities = ({intl, data, handleNextIndex, zeroActivityIndex}) => {
    const { formatMessage } = intl;
        function handleIndexOnOptions(newIndex) {
               handleNextIndex(newIndex);
       }
    function getApplyOptionsMobile(){
        if (!data) {
            return;
        }
        return (<div>

                <SwipeableViews index={zeroActivityIndex} onChangeIndex={handleIndexOnOptions}>
                {
                    data.map((el, index)=>{
                        return (<div key={index}>
                                    <div className="col-md-4">
                                        <div className={css.blurb}>
                                            <a href={el.redirectUrl}>
                                                <img src={el.mobileImageUrl}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>);
                    })
                }
                </SwipeableViews>
            </div>);
    }
    function getApplyOptionsDesktop(){
        if (!data) {
            return;
        }
        return (<div>
                {
                    data.map((el, index)=>{
                        return (<div key={index}>
                                    <div className="col-md-4">
                                        <div className={css.blurb}>
                                            <a href={el.redirectUrl}><img src={el.imageUrl}/></a>
                                        </div>
                                    </div>
                                </div>);
                    })
                }
            </div>);
    }
    return (
        <div className="row">
            <div className="col-lg-2 col-md-1 col-sm-2 col-xs-2" />
            <div className={` col-lg-8 col-md-10 col-sm-8 col-xs-8 ${css.zero_activities_container}`}>
                <div className={css.prompt}>
                    <div className="row">
                        <div className="col-lg-2 col-md-1 col-sm-12 col-xs-12">
                            <div className={css.lock}>
                                <img
                                    src="m2u/static/icons/logout_circled.svg"
                                />
                            </div>
                        </div>
                        <div className={`col-lg-10 col-md-10 col-sm-12 col-xs-12 ${css.summaryText}`}>
                            <span>{formatMessage({id: "app.logout.prompt"})}</span>
                        </div>
                    </div>
                </div>
                <div className="row hidden-sm hidden-xs">
                    {getApplyOptionsDesktop()}
                </div>
                <div className="row hidden-lg hidden-md">
                    {getApplyOptionsMobile()}
                </div>
                <div className={` hidden-lg hidden-md ${css[ "slide-pagination"]}`}>
                    <Pagination
                        dots={data.length}
                        index={zeroActivityIndex}
                        onChangeIndex={()=>{}}
                    />
                </div>
            </div>
            <div className="col-md-2" />
        </div>
        );
};
ZeroActivities.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(ZeroActivities);
