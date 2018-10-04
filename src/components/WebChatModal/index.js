import React from "react";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./WebChatModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import classnames from "classnames";
const defaultMessages = defineMessages({
    liveSupportChat: {
        id: "app.dashboard.liveSupportChat",
        defaultMessage: "Live Support Chat",
    },
    saySomething: {
        id: "app.dashboard.saySomething",
        defaultMessage: "Say something",
    },
    saveChat: {
        id: "app.dashboard.saveChat",
        defaultMessage: "Save Chat",
    },
    sendChatEmail: {
        id: "app.dashboard.sendChatEmail",
        defaultMessage: "Send Chat to Email",
    },
    askRemoteAssist: {
        id: "app.dashboard.askRemoteAssist",
        defaultMessage: "Ask for Remote Assistance",
    }
});
export const WebChatModal = ({ intl, toggleSearchChat}) => {
    const { formatMessage } = intl;
    function getTooltip() {
        return (<Popover id={css.popover}>
                    <ul>
                        <li>{formatMessage(defaultMessages.saveChat)}</li>
                        <li>{formatMessage(defaultMessages.sendChatEmail)}</li>
                        <li>{formatMessage(defaultMessages.askRemoteAssist)}</li>
                    </ul>
                </Popover>);
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header>
                <div className="row">
                    <div className="col-xs-10">
                        <h6>{formatMessage(defaultMessages.liveSupportChat)}</h6>
                    </div>
                    <div className="col-xs-2">
                        <div className="chatpopupicons">
                        <a className={css.customBtn}>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={getTooltip()} rootClose>
                            <img src="m2u/static/icons/settings_black.svg" />
                        </OverlayTrigger>
                        </a>
                        <a className={css.customBtn} onClick={()=>toggleSearchChat()}><img src="m2u/static/icons/close.svg" /></a>
                        </div>
                    </div>
                </div>
            </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className={` row ${css.textSection}`}>
                    <div className={`col-xs-12 ${css.chatBox}`}>
                        <div className={css.leftMessage}>
                            <div className={css.avatar}>
                                <img src="m2u/static/img/profile_pic.svg" />
                            </div>
                            <Popover
                              id="popover-basic"
                              placement="right"
                            >
                                Hey there!!
                            </Popover>
                        </div>
                        <div className={css.rightMessage}>
                            <Popover
                              id="popover-basic"
                              placement="left"
                            >
                                How can we help you?
                            </Popover>
                            <div className={css.avatar}>
                                <img src="m2u/static/img/profile_pic.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="chatinput">
                    <div className="container-fluid">
                        <div className={`row ${css.chatinput}`}>
                            <div className="col-xs-12">
                                <input
                                    className={`${css[ "pair-input"]}`}
                                    placeholder={formatMessage(defaultMessages.saySomething)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className={`row ${css.chaticons}`}>
                        <div className="col-xs-12">
                        <ul>
                            <li><img src="m2u/static/icons/chat-emojies.svg" /></li>
                            <li><img src="m2u/static/icons/chat-attachment.svg" /></li>
                            <li><img src="m2u/static/icons/chat-microphone.svg" /></li>
                            <li><img src="m2u/static/icons/chat-video.svg" /></li>
                            <li><img src="m2u/static/icons/chat-photos.svg" /></li>
                        </ul>
                        </div>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
       );
};

WebChatModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(WebChatModal);
