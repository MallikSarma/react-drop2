import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { DropdownButton  } from "react-bootstrap";
import { MenuItem } from "react-bootstrap";
import * as css from "./SecurityPhraseAndQuestions.scss";
import _ from "lodash";
import classnames from "classnames";
import { injectIntl, intlShape, defineMessages } from "react-intl";
import Tooltip from "../../../../components/Tooltip";
import RenderDesktopDropdown from "../../../../components/RenderDesktopDropdown";
import RenderMobileDropdown from "../../../../components/RenderMobileDropdown";

const defaultMessages = defineMessages({
    almost: {
        id: "app.personalize.almost",
        defaultMessage: "Almost there,",
    },
    securityPhrase: {
        id: "app.personalize.securityPhraseQuestion",
        defaultMessage: "Security Phrase",
    },
    challengeQuestion1: {
        id: "app.personalize.challengeQuestion1",
        defaultMessage: "Challenge Question 1",
    },
    challengeQuestion2: {
        id: "app.personalize.challengeQuestion2",
        defaultMessage: "Challenge Question 2",
    },
    challengeQuestion3: {
        id: "app.personalize.challengeQuestion3",
        defaultMessage: "Challenge Question 3",
    },
    answer1: {
        id: "app.personalize.answer1",
        defaultMessage: "Answer 1",
    },
    answer2: {
        id: "app.personalize.answer2",
        defaultMessage: "Answer 2",
    },
    answer3: {
        id: "app.personalize.answer3",
        defaultMessage: "Answer 3",
    },
     submit: {
        id: "app.personalize.submit",
        defaultMessage: "SUBMIT",
    },
    egHappy: {
        id: "app.personalize.egHappy",
        defaultMessage: "Eg. happylife ",
    },
    selectQuestion: {
        id: "app.personalize.selectQuestion",
        defaultMessage: "Select Question",
    }

});

export const SecurityPhraseAndQuestions = ({ intl, backdrop, handleSubmit, croppedImage, questionsList, updateSecretQuestions, secretQuestionDetails, errorName, resetError, theme}) => {
    var divBg = {
      backgroundImage: backdrop ?  `url(${backdrop})` : `url(${theme.path})`,
    };
    const { formatMessage } = intl;
    const securityPhraseClasses = classnames({
        [css["pair-input"]]: true,
        [css.error]: errorName === "securityPhraseError"
    });
    function getQuestionData(dropDownTitle, questionsMap, index){
        const list = _.map(questionsMap, (question, questionId)=>{
                return {
                       "display":<div className={css.selectedItem}>
                                    <span>{question}</span>
                                </div>,
                       "mobileDisplay": question,
                       "valueToPass": {questionId, index}
                    };
        });
        const currentTitle = dropDownTitle;
        return {
            id: "question_dropdown",
            title: <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (payload)=>{updateAdaptQustion("adaptQustion" + (payload.index + 1), payload.questionId);},
            list
        };
    }
    function getQuestionAnswers() {
        let objectKeys = Object.keys(questionsList).sort();
        let questionsListOrdered = objectKeys.map((key)=>{
            return questionsList[key];
        });
        return _.map(questionsListOrdered, (questionsMap, index)=>{
            const questionPrompt = formatMessage(defaultMessages["challengeQuestion" + (index + 1)]);
            const answerPrompt = formatMessage(defaultMessages["answer" + (index + 1)]);
            let dropDownTitle = formatMessage(defaultMessages.selectQuestion);
            if (secretQuestionDetails["adaptQustion" + (index + 1)]) {
                dropDownTitle = questionsList["adaptQuestionOptionsMap" + (index + 1)][secretQuestionDetails["adaptQustion" + (index + 1)]];
            }
            const questionClasses = classnames({
                [css["button-error"]]: errorName === "adaptQustion" + (index + 1)
            });
            const answerClasses = classnames({
                [css["pair-input"]]: true,
                [css.error]: errorName === "adaptAnswer" + (index + 1)
            });
            return (
                    <div key={index}>
                        <div className={`row ${css.question}`}>
                            <div className="col-md-4">
                                <label>{questionPrompt}</label>
                            </div>
                            <div className={`hidden-xs col-md-8 ${css.selectWrapper}`}>
                                <RenderDesktopDropdown data={getQuestionData(dropDownTitle,questionsMap, index)} containerClass={questionClasses}/>
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm col-md-8">
                                <RenderMobileDropdown data={getQuestionData(dropDownTitle,questionsMap, index)} containerClass={questionClasses} />
                            </div>
                        </div>
                        <div className={`row ${css.answer}`}>
                            <div className="col-md-4">
                                <label>{answerPrompt}</label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" onChange={(ev)=>{updateAdaptQustion("adaptAnswer" + (index + 1), ev.target.value);}} className={answerClasses} onFocus={resetError} />
                            </div>
                        </div>
                    </div>
            );});
    }

    function updateDetails(key, ev) {
        updateSecretQuestions({
            key,
            value: ev.target.value
        });
    }

    function updateAdaptQustion(key, value) {
        updateSecretQuestions({
            key,
            value
        });
    }
    return (
        <Modal show className={css.container}>
            <Modal.Header style={divBg}>
                <div className={css.logo_top}>
                    <a className="" href="#page-top"><img className={`img-responsive ${css.logo}`} src="m2u/static/img/maybank2ulogo.png" /> </a>
                </div>
                <div className={css.avatar_wrapper}>
                    <img
                        src={croppedImage}
                        className="img-responsive img-circle"
                        alt="profile picture"
                    />
                </div>
            </Modal.Header>
        <Modal.Body>
            <h1>{formatMessage(defaultMessages.almost)} Vina!</h1>
            <div className="row">
                <div className={`col-md-4 ${css.securtyText}`}>
                    <label>{formatMessage(defaultMessages.securityPhrase)}</label>
                    <Tooltip/>
                </div>
                <div className="col-md-8">
                    <div>
                        <input
                            type="text"
                            className={securityPhraseClasses}
                            onChange={updateDetails.bind(this, "securityPhrase")}
                            placeholder={formatMessage(defaultMessages.egHappy)}
                            onFocus={resetError}
                        />
                    </div>
                </div>
            </div>
            {getQuestionAnswers()}
        </Modal.Body>
        <Modal.Footer>
            <div className="row">
                <div className="col-md-12">
                    <Button className="btn btn-success" onClick={handleSubmit}>{formatMessage(defaultMessages.submit)}</Button>
                </div>
            </div>
        </Modal.Footer>
        </Modal>
       );
};

SecurityPhraseAndQuestions.propTypes = {
    intl   : intlShape.isRequired
};
export default injectIntl(SecurityPhraseAndQuestions);
