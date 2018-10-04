import React from "react";
import {ListGroup, ListGroupItem , Panel, Well} from "react-bootstrap";
import * as css from "./MessagesContainer.scss";
import { injectIntl, intlShape ,defineMessages} from "react-intl";
import MessageBox from "../MessageBox";

const defaultMessages = defineMessages({
    "newMessages":{
        id: "app.inbox.newMessages",
        defaultMessage: "New Messages",
    },
    "myInbox": {
        id: "app.inbox.myInbox",
        defaultMessage: "My Inbox"
    }
});

export const MessagesContainer = ({intl, inboxData,readCurrentMessage ,currentInboxId, toggleViewBillPdf}) => {

    const { formatMessage } = intl;
    const messageLists = inboxData.inboxContent ? inboxData.inboxContent.inbox :  [];
    const defaultMessage = messageLists.length > 0 ? messageLists[0] : {type:"",subject:"",message:"",date:""};
    const currentMessage = currentInboxId > 0 ? messageLists.find(obj=>obj.id === currentInboxId) : defaultMessage;
    function getMessages(){
        return (<ListGroup>
            {
                messageLists.map((obj,index)=>
                {
                    const isActive = currentInboxId === 0 ? index === 0 : obj.id === currentInboxId;
                    return (<ListGroupItem key={obj.id} onClick={readCurrentMessage.bind(this,obj.id)} active={isActive}>
                        <div>
                            <div className={`${css.messageSubject}`}>
                                <span>{obj.type}</span>
                                <span>{obj.date}</span>
                            </div>
                            <div className={`${css.messageTitle}`}>
                                {obj.subject}
                            </div>
                            <div className={`${css.messageText}`}>
                                <p>{obj.message}</p>
                            </div>
                        </div>
                    </ListGroupItem>);
                })
            }
       </ListGroup>);
    }
    function getMobileMessages(){
        return (<ListGroup>
            {
                messageLists.map((obj,index)=>
                {
                    const isActive = obj.id === currentInboxId;
                    return (<ListGroupItem key={obj.id} onClick={readCurrentMessage.bind(this,obj.id)} active={isActive}>
                        <div>
                            <div className={`${css.messageSubject}`}>
                                <span>{obj.type}</span>
                                <span>{obj.date}</span>
                            </div>
                            <div className={`${css.messageTitle}`}>
                                {obj.subject}
                            </div>
                            <div className={`${css.messageText}`}>
                                <p>{obj.message}</p>
                            </div>
                        </div>
                    </ListGroupItem>);
                })
            }
       </ListGroup>);
    }
    return (
        <div className={css.container}>
            <div className="container-fluid">
                <div className="row">
                    <div className={`${css.heading} col-xs-12`}>
                        <img src="m2u/static/icons/inbox_big.svg"/>
                        <span className={css.myInbox}>{formatMessage(defaultMessages.myInbox)}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 col-xs-12" />
                    <div className="col-xs-12">
                        <div className={`hidden-xs col-sm-5 col-xs-12 ${css.leftPanel}`}>
                            <Panel>
                                <Well>
                                    <div className={css.wellClass}>
                                        <div className={css.messageHeader}>
                                            <div className={`col-xs-2 ${css.messages_count_circle}`}>
                                                <span>{messageLists.length}</span>
                                            </div>
                                            <div className="col-xs-10">
                                                <span>{formatMessage(defaultMessages.newMessages)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Well>
                                <div className={`${css.messageBody}`}>
                                    {getMessages()}
                                </div>
                            </Panel>
                        </div>
                        <div className={`col-sm-7 hidden-xs ${css.rightPanel}`}>
                            <MessageBox currentMessage={currentMessage} readCurrentMessage={readCurrentMessage} toggleViewBillPdf={toggleViewBillPdf} />
                        </div>
                    </div>
                    {
                        !currentInboxId &&
                        <div className={`hidden-sm hidden-md hidden-lg col-sm-4 col-xs-12 ${css.leftPanel}`}>
                            <Panel>
                                <Well>
                                    <div className={css.wellClass}>
                                        <div className={css.messageHeader}>
                                            <div className={`col-xs-2 ${css.messages_count_circle}`}>
                                                <span>{messageLists.length}</span>
                                            </div>
                                            <div className="col-xs-10">
                                                <span>{formatMessage(defaultMessages.newMessages)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Well>
                                <div className={`${css.messageBody}`}>
                                    {getMobileMessages()}
                                </div>
                            </Panel>
                        </div>
                    }
                    {
                        !!currentInboxId &&
                        <div className={`hidden-sm hidden-md hidden-lg ${css.rightPanel}`}>
                            <MessageBox toggleViewBillPdf={toggleViewBillPdf} currentMessage={currentMessage} readCurrentMessage={readCurrentMessage}/>
                        </div>
                    }
                    <div className="col-sm-1 col-xs-12" />
                </div>
            </div>
        </div>
    );
};
MessagesContainer.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(MessagesContainer);
