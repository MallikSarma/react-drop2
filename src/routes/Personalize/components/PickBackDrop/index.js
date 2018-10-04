import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./PickBackDrop.scss";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    pickACity: {
        id: "app.personalize.pickACity",
        defaultMessage: "Pick A City Backdrop",
    },
   rePick: {
        id: "app.personalize.rePick",
        defaultMessage: "RE-PICK",

    }
});
export const PickBackDrop = ({ intl, updateBackdrop, backdrop, openSecurityPhrase, repickTheme, theme }) => {
    const { formatMessage } = intl;
    function showSecurityPhrase() {
        if (backdrop.length === 0){
            return;
        }
        openSecurityPhrase();
    }
    function getBackDropImages() {
        const previewArray = theme.backdrops;
        return (
            <div className="row">
                { previewArray.map((image)=>{
                    const imgClass = classnames({
                        "img-responsive": true,
                        [css["image-clicked"]]: backdrop === image
                    });
                    return  (<div className="row" key={image}>
                                <div className="col-md-12">
                                    <div className={`${css["image-wrapper"]}`} onClick={()=>updateBackdrop({backdrop: image})}>
                                        <img className={imgClass} src={image} />
                                    </div>
                                </div>
                            </div>);
                })}
            </div>
        );
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header>
                <h6>{formatMessage({ id: "app.personalize.themeImage" })}</h6>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                       <h1>{formatMessage(defaultMessages.pickACity)}</h1>

                    </div>
                </div>
                {getBackDropImages(updateBackdrop, backdrop)}
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                        <Button className="btn btn-default" onClick={repickTheme}>{formatMessage(defaultMessages.rePick)} </Button>
                    </div>
                <div className="col-lg-6 -md-6 col-sm-6">
                        <Button className="btn btn-success" onClick={showSecurityPhrase}>{formatMessage({ id: "app.personalize.next" })} </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};
PickBackDrop.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(PickBackDrop);
