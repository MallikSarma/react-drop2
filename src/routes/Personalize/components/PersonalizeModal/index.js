import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import AvatarEditor from "react-avatar-editor";
import * as css from "./PersonalizeModal.scss";
import * as avatarCss from "./AvatarCss.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";

const defaultMessages = defineMessages({
    cancel: {
        id: "app.personalize.cancel",
        defaultMessage: "CANCEL",
    }

});
class PersonalizeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 2
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleScale = this.handleScale.bind(this);
        this.handleBorderRadius = this.handleBorderRadius.bind(this);
    }

    handleScale() {
        var scale = parseFloat(this.refs.scale.value);
        this.setState({scale: scale});
    }

    handleBorderRadius() {
        var borderRadius = parseInt(this.refs.borderRadius.value);
        this.setState({borderRadius: borderRadius});
    }

    logCallback(e) {
        console.log("callback", e);
    }

    handleSave(data) {
        var img = this.refs.avatar.getImage().toDataURL();
        this.props.updateCroppedImage({
            img,
            nextModal: "PickTheme"
        });
    }

    render(){
        const {formatMessage} = this.props.intl;
        return (
            <div>
                <Modal show className={css.container}>
                    <Modal.Header>
                    <h6>Profile Picture</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={`${avatarCss.avatar_wrapper} `}>
                            <AvatarEditor
                                ref="avatar"
                                scale={this.state.scale}
                                height={50}
                                color={[255,255,255,0.6]}
                                width={50}
                                border={30}
                                borderRadius={250}
                                onLoadFailed={this.logCallback.bind(this, "onLoadFailed")}
                                onUpload={this.logCallback.bind(this, "onUpload")}
                                onImageLoad={this.logCallback.bind(this, "onImageLoad")}
                                image={this.props.image}
                            />
                            <div className="row">
                                <div className="col-lg-12">
                                    <h2>Move & Scale to Fit</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2">
                                    <img className={`img-responsive ${avatarCss["small-icon"]}`} src="m2u/static/icons/avatar_zoom_small.svg" />
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                    <input
                                        className="hidden-xs"
                                        name="scale"
                                        type="range"
                                        ref="scale"
                                        onChange={this.handleScale}
                                        min="2"
                                        max="6"
                                        step="0.01"
                                        defaultValue="2"
                                    />
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2">
                                    <img
                                        className={`img-responsive hidden-xs ${avatarCss["big-icon"]}`}
                                        src="m2u/static/icons/avatar_zoom_big.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="row">
                            <div
                                className={`col-lg-6 col-md-6 col-sm-6 col-xs-12 ${css[ "left-btn-container"]} `}
                            >
                                <Button className={`${css.cancelButton} btn btn-default`} onClick={this.props.reselectImage}>{formatMessage(defaultMessages.cancel)}</Button>
                            </div>
                            <div className={`col-lg-6 col-md-6 col-sm-6 col-xs-12 ${css[ "right-btn-container"]} `}>
                                <Button className="btn btn-success" onClick={this.handleSave}>{formatMessage({ id: "app.personalize.next" })}</Button>
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

PersonalizeModal.propTypes = {
    intl : intlShape.isRequired
};
export default injectIntl(PersonalizeModal);