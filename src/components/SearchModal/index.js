import React from "react";
import { Button, FormGroup, InputGroup ,FormControl, ListGroup, ListGroupItem} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import * as css from "./SearchModal.scss";
import { injectIntl, intlShape, defineMessages } from "react-intl";
const defaultMessages = defineMessages({
    needHelp: {
        id: "app.dashboard.needHelp",
        defaultMessage: "Need Help?",
    },
    startLiveChat: {
        id: "app.dashboard.startLiveChat",
        defaultMessage: "Start Live Chat",
    },
    enterKeyword:  {
        id: "app.dashboard.enterKeyword",
        defaultMessage: "Enter Keyword ...",
    }
});
export const SearchModal = ({ intl, toggleSearchChat, searchFilterActions, searchText}) => {
    const { formatMessage } = intl;
    return (
        <Modal show className={css.container}>
            <Modal.Header>
                <div className="row">
                    <div className="col-xs-8">
                        <h6>{formatMessage(defaultMessages.needHelp)}</h6>
                    </div>
                    <div className={`col-xs-4 ${css.btnContainer}`} >
                        <a className={css.customBtn} onClick={toggleSearchChat.bind(this,"showSearchModal")}><img src="m2u/static/icons/close.svg" /></a>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                        <FormGroup>
                          <InputGroup>
                            <InputGroup.Addon><img src="m2u/static/icons/keyword_search.svg" /></InputGroup.Addon>
                            <FormControl type="text" onChange={(ev)=>searchFilterActions(ev.target.value)} placeholder={formatMessage(defaultMessages.enterKeyword)}/>
                          </InputGroup>
                        </FormGroup>
                        {
                            !!searchText &&
                            <div className="row">
                                <ListGroup>
                                    <ListGroupItem>Item 1 <span>></span></ListGroupItem>
                                    <ListGroupItem>Item 2 <span>></span></ListGroupItem>
                                    <ListGroupItem>... <span>></span></ListGroupItem>
                                    <ListGroupItem><div><Button>SHOW ALL RESULTS</Button></div></ListGroupItem>
                                </ListGroup>
                            </div>
                        }
                </div>
            </Modal.Body>
                {
                    !searchText &&
                    <Modal.Footer>
                        <div className="container-fluid">
                            <div className="row ">
                                <div className={`col-xs-12 ${css.rightFooter}`}>
                                    <Button className="btn btn-success" onClick={toggleSearchChat.bind(this, "webchat")}>{formatMessage(defaultMessages.startLiveChat)}<img src="m2u/static/icons/webchat_icon.svg" /></Button>
                                </div>
                            </div>
                        </div>
                    </Modal.Footer>
                }
        </Modal>
       );
};

SearchModal.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(SearchModal);
