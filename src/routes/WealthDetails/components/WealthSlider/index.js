import React from "react";
import * as css from "./WealthSlider.scss";
import { Popover} from "react-bootstrap";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    conservative: {
        id: "app.dashboard.conservative",
        defaultMessage: "CONSERVATIVE",
    },
    moderate: {
        id: "app.dashboard.moderate",
        defaultMessage: " MODERATE",
    },
    aggressive: {
        id: "app.dashboard.aggressive",
        defaultMessage: "AGGRESSIVE",
    }
});
export const WealthSlider = ({intl, getSliderPosition, sliderPosition}) => {
    const {formatMessage} = intl;
    function getMessage(){
        return (
          <Popover id={css.popover}>
            <div> Loren Ipsum</div>
          </Popover>
        );
    }
    return (
        <div className={css.sliderContainer}>
            <input
                type="range"
                name="slider"
                id="slider"
                onChange={(ev)=>getSliderPosition(ev.target.value)}
                min="0"
                max="100"
                step="0.01"
            />
            <section className={css.inputSubText}>
              <div> {formatMessage(defaultMessages.conservative)} </div>
              <div> {formatMessage(defaultMessages.moderate)} </div>
              <div> {formatMessage(defaultMessages.aggressive)} </div>
            </section>
        </div>
   );
};
WealthSlider.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(WealthSlider);