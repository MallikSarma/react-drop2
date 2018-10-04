import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./PickTheme.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";

const defaultMessages = defineMessages({
    themeImage: {
        id: "app.personalize.themeImage",
        defaultMessage: "Theme Image",
    },
    pickYourTheme: {
        id: "app.personalize.pickYourTheme",
        defaultMessage: "Pick Your Theme",
    },
   thisBackDropWillChange: {
        id: "app.personalize.thisBackDropWillChange",
        defaultMessage: "This backdrop will change according to the time of the day.",

    }
});

export const PickTheme = ({ intl, updateTheme, theme, openBackDropModal, personalizationDetails }) => {
    const { formatMessage } = intl;
    function showBackdropModal() {
        if (theme.length === 0){
            return;
        }
        openBackDropModal();
    }
    function getThemeImages() {
        const previewArray = personalizationDetails.themes;
        return (
            <div className="row">
                { previewArray.map((image)=>{
                    const imgClass = classnames({
                        "img-responsive": true,
                        [css["image-clicked"]]: theme === image
                    });
                    return  (<div className="row" key={image.path}>
                                <div className="col-md-12">
                                    <div className={`${css["image-wrapper"]}`} onClick={()=>updateTheme({theme: image})}>
                                        <img className={imgClass} src={image.path} />
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
                <h6>{formatMessage(defaultMessages.themeImage)}</h6>
            </Modal.Header>
        <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                       <h1>{formatMessage(defaultMessages.pickYourTheme)}</h1>
                    </div>
                </div>
                    {getThemeImages(updateTheme, theme)}
                    { theme && !theme.backdrops &&
                    <div className={`row ${css[ "image-choices-wrapper"]}`}>
                        <div className="col-md-12">
                            <p>{formatMessage(defaultMessages.thisBackDropWillChange)}</p>
                        </div>
                    </div>
                    }
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                    <div className="col-md-12">
                        <Button className="btn btn-success" onClick={showBackdropModal}>{formatMessage({ id: "app.personalize.next" })} </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};

PickTheme.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(PickTheme);
