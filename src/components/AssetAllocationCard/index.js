import React from "react";
import { Panel} from "react-bootstrap";
import * as css from "./AssetAllocationCard.scss";
import { injectIntl, intlShape } from "react-intl";
export const AssetAllocationCard = ({ intl, data, goToWealthDetails, path }) => {
    let borderStyle = {
      borderColor: data.color,
    };
    const openDetails = function () {
        goToWealthDetails(path);
    };
    return (
        <div className={css.container} onClick={openDetails.bind(this, path)}>
            <Panel>
                <div className="container-fluid">
                    <div className={`row ${css.wrapper}`}>
                        <div className={`col-xs-3 ${css.percentageWrapper}`}>
                            <div style={borderStyle} className={css.percentage}>
                                <span>{data.percent && <span>{data.percent}%</span> }</span>
                            </div>
                        </div>
                        <div className={`col-xs-7 ${css.middleContent}`}>
                            <div className="row">
                                <div className="col-xs-12">
                                    <h6>{data.label}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <span className={css.amount}>{data.currency} {data.value}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`col-xs-2 ${css.more}`}>
                            <div/>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
};
AssetAllocationCard.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(AssetAllocationCard);
