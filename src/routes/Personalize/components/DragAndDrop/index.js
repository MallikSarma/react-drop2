import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./DragAndDrop.scss";
import Dropzone from "react-dropzone";
import { Circle } from "rc-progress";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    profileImage: {
        id: "app.personalize.profileImage",
        defaultMessage: "Profile Image",
    },
    drag: {
        id: "app.personalize.drag",
        defaultMessage: "Drag/Upload your photo here",
    },
   elseYouCan: {
        id: "app.personalize.elseYouCan",
        defaultMessage: "Or choose one of these images.",
    },
    browse: {
        id: "app.personalize.browse",
        defaultMessage: "browse",
    },
    next: {
        id: "app.personalize.next",
        defaultMessage: "NEXT",
    }

});

function getPreviewImages(updateImage, imageSelected, adaptImagesBean) {
    return (
        <div className={'row'}>
            { adaptImagesBean.map((image)=>{
                const imgClass = classnames({
                    [css["default-image"]]: true,
                    [css["image-clicked"]]: imageSelected === image
                });
                return (<div className="col-md-3 col-sm-3 col-xs-6" key={image.path} onClick={updateImage.bind(this, {image, systemImage: true})}>
                        <div className={imgClass}>
                            <img src={image.path} alt={image.altText}/>
                        </div>
                        </div>
                );})
            }
        </div>
        );
}
function onDragEnter(ev) {
    ev.currentTarget.style.border = "0.5rem solid #40b07e";
}
export const DragAndDrop = ({ intl, updateImage, image, toggleCropper, croppedImage, adaptImagesBean }) => {
    const { formatMessage } = intl;
    const displayImage = !croppedImage && image ? "m2u/static/img/tick.svg" : "m2u/static/img/profile_image.svg";
        return (
        <Modal show className={css.container}>
                <Modal.Header>
                    <h6>{formatMessage(defaultMessages.profileImage)}</h6>
                </Modal.Header>
                <Modal.Body>
                <Dropzone activeStyle={{ borderStyle: "solid", backgroundColor: "#eee" }} onDrop={(file)=>{
                    updateImage({image: file[0].preview});
                    }} multiple={false} className={css.dropzoneContainer} onDragEnter={onDragEnter}
                >
                    <div className="row hidden-xs">
                        <div className="col-md-12">
                            <img src={displayImage} />
                                <Circle
                                    className={` ${css[ "circle-progress"]}`}
                                    percent={!croppedImage && image ? 100 : 0}
                                    strokeWidth="2"
                                    strokeColor="black"
                                />
                        </div>
                    </div>
                        <div className="row hidden-lg hidden-md hidden-sm">
                            <Button>PICK FROM MY IMAGE LIBRARY</Button>
                        </div>
                        <div className="row hidden-xs">
                            <div className="col-md-12">
                                <p>{formatMessage(defaultMessages.drag)}</p>
                            </div>
                        </div>
                </Dropzone>
            </Modal.Body>
            <Modal.Footer>
                <div className={css[ "image-choices-wrapper"]}>
                    <div className="col-md-12">
                        <p>{formatMessage(defaultMessages.elseYouCan)}</p>
                            {getPreviewImages(updateImage, image, adaptImagesBean)}
                    </div>
                </div>
                <div className="row">
                    <div className="row">
                    <div className="col-md-12">
                        <Button className="btn btn-success" disabled={!image} onClick={toggleCropper}>
                                {formatMessage(defaultMessages.next)}
                            </Button>
                        </div>
                    </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
};

DragAndDrop.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(DragAndDrop);
