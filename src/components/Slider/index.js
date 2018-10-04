import React from "react";
import * as css from "./Slider.scss";
import { Panel} from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    youHave: {
        id: "app.dashboard.youHave",
        defaultMessage: "You have",
    },
    inSavings: {
        id: "app.dashboard.inSavings",
        defaultMessage: " in your savings.",
    },
    viewInvestments: {
        id: "app.dashboard.viewInvestments",
        defaultMessage: "View the investments opportunities below when you invest",
    }
});
export const Slider = ({intl}) => {
    const {formatMessage} = intl;
    return (
        <div className={`row ${css.sliderContainer}`}>
            <div className="col-sm-1"/>
            <div className={`col-sm-10 ${css.contentPadding}`}>
                 <center>
                        <div className={css.headerText}>{formatMessage(defaultMessages.youHave)} RM <span className={css.positiveAmount}>22,715.85</span> {formatMessage(defaultMessages.inSavings)}</div>
                        <div className={css.subHeaderText}>{formatMessage(defaultMessages.viewInvestments)} <span> <b> RM 20,000 </b> </span> </div>
                    </center>
                    <Panel>
                        <div className={css.panelBody}>
                            <input
                                type="range"
                                name="slider"
                                id="slider"
                                onChange={(ev)=>console.log(ev.target.value)}
                                min="0"
                                max="5000"
                                step="0.01"
                            />
                        </div>

                        <section className={css.fourDiv}>
                          <div>RM 1,000</div>
                          <div> <b> RM 10,000 - 20,000 </b> </div>
                          <div className={css.lastCol}>RM 20,000 - 30,000 </div>
                          <div className={css.lastCol}>RM 50,000+</div>
                        </section>
                    </Panel>
            </div>
            <div className="col-sm-1"/>
        </div>
   );
};
Slider.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(Slider);