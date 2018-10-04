import React from "react";
import * as css from "./LoanInfo.scss";
import { Panel } from "react-bootstrap";
import { injectIntl, intlShape } from "react-intl";

export const LoanInfo = ({intl, loanInfo}) => {
    return (
            <div className={`${css.container}`}>
                <Panel>
                {
                    loanInfo.map((row,index)=>
                        <div className={css.row} key={index}>
                            <span className={css.category}>{row.label}</span>
                            <span className={css.align}>{row.currency} {row.value}</span>
                            <span className={css.secvalalign}></span>
                        </div>
                    )
                }
                </Panel>
            </div>
   );
};
LoanInfo.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(LoanInfo);