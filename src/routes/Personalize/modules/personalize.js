import update from "react/lib/update";
import request from "../../../util/request";
import services from "../../../services";
import { push } from "react-router-redux";
import constants from "./actionConstants";
import validations from "../../../util/validations";
import React from "react";
import { FormattedMessage } from "react-intl";
const {
    UPDATE_IMAGE,
    TOGGLE_MODAL,
    UPDATE_CROPPED_IMAGE,
    UPDATE_THEME,
    UPDATE_BACKDROP,
    UPDATE_SECRET_QUESTION,
    UPDATE_PERSONALIZATION_DETAILS,
    UPDATE_PERSONALIZATION_SUCCESS,
    SHOW_SAFETY_TIPS,
    REMOVE_NOTIFICATION,
    UPDATE_ERROR,
    ADD_NOTIFICATION,
    RESET_STORE
} = constants;
export function resetStore() {
    return {
        type: RESET_STORE
    };
}
export function resetError(payload) {
    return {
        type: UPDATE_ERROR
    };
}
export function removeNotifications(payload) {
  return {
      type: REMOVE_NOTIFICATION
    };
}
export function triggerNotification(payload) {
  return (dispatch, store) => {
  const notificationOpts = {
    uid: Math.random(),
    title: payload.title,
    message: payload.message,
    position: "bc",
    autoDismiss: 3,
    level: "error",
    onRemove: dispatch.bind(this,removeNotifications())
  };
    return dispatch({
        type: ADD_NOTIFICATION,
        payload: {
          notification: notificationOpts
        }
    });
  };
}
export function toggleModal(payload) {
    return {
        type: TOGGLE_MODAL,
        payload
    };
}

export function updateImage(payload) {
    return {
        type: UPDATE_IMAGE,
        payload
    };
}

export function updateCroppedImage(payload) {
    return (dispatch, store) => {
        const {state} = validations.checkImageSize(payload.img);
        if (state){
            dispatch({
                type: UPDATE_ERROR
            });
            dispatch({
                type: REMOVE_NOTIFICATION
            });
            dispatch({
                type: UPDATE_CROPPED_IMAGE,
                payload
            });
        }
        else {
            dispatch({
                type: UPDATE_ERROR,
                payload: "imageError"
            });
            dispatch(triggerNotification({
                title: <FormattedMessage id = "app.personalize.invalidImage"/>,
                message: <FormattedMessage id = "app.personalize.invalidImageMessage"/>
            }));
        }

    };
}

export function updateTheme(payload) {
    return {
        type: UPDATE_THEME,
        payload
    };
}

export function updateBackdrop(payload) {
    return {
        type: UPDATE_BACKDROP,
        payload
    };
}

export function updateSecretQuestions(payload) {
    return {
        type: UPDATE_SECRET_QUESTION,
        payload
    };
}

export function backToHome(payload) {
    let locationArray = window.location.pathname.split(/(\/)/);
    let locationToChange = locationArray.length - 3;
    if (!window.location.pathname.match(/[\/]$/)) {
        locationToChange = locationArray.length - 1;
    }
    locationArray[locationToChange] = "login";
    return push(locationArray.join(""));
}

export function showSafetyTips() {
    return {
        type: SHOW_SAFETY_TIPS
    };
}

export function asyncPersonalizeSubmit() {
    return (dispatch, store) =>{
        const {
            securityPhrase,
            adaptQustion1,
            adaptQustion2,
            adaptQustion3,
            adaptAnswer1,
            adaptAnswer2,
            adaptAnswer3
            } = store().personalize.secretQuestionDetails;
        const {state, failed} = validations.checkSecurityQuestions(
            securityPhrase,
            adaptQustion1,
            adaptQustion2,
            adaptQustion3,
            adaptAnswer1,
            adaptAnswer2,
            adaptAnswer3
            );
            if (state) {
            dispatch({
                type: UPDATE_ERROR
            });
            dispatch({
                type: REMOVE_NOTIFICATION
            });
            const payload = {
                selectedImageCaption: securityPhrase,
                adaptQustion1,
                adaptQustion2,
                adaptQustion3,
                adaptAnswer1,
                adaptAnswer2,
                adaptAnswer3,
                backdropPath: store().personalize.backdrop,
                selectedImage: {
                    path: store().personalize.croppedImage,
                    altText: (typeof store().personalize.image === "object") ? store().personalize.image.altText : null
                }
            };
            request.post(services.updatePersonalizationDetails)
            .send(payload)
            .finish((error, res) => {
                dispatch({
                    type: UPDATE_PERSONALIZATION_SUCCESS,
                    payload: {
                        personalizationDetails: res.body
                    }
                });
            });
            dispatch({
                type: UPDATE_PERSONALIZATION_SUCCESS
            });
        }  else {
            const failInfoMap = {
                phrase: {
                    error: "securityPhraseError",
                    notification:{
                        title: <FormattedMessage id = "app.personalize.securityPhraseError"/>,
                        message: <FormattedMessage id = "app.personalize.securityPhraseErrorMessage"/>
                    }
                },
                question1: {
                    error: "adaptQustion1",
                    notification:{
                        title: <FormattedMessage id = "app.personalize.questionAnswerError"/>,
                        message: <FormattedMessage id = "app.personalize.questionAnswerErrorMessage"/>
                    }
                },
                answer1: {
                    error: "adaptAnswer1",
                    notification:{
                        title: <FormattedMessage id = "app.personalize.questionAnswerError"/>,
                        message: <FormattedMessage id = "app.personalize.questionAnswerErrorMessage"/>
                    }
                },
                question2: {
                    error: "adaptQustion2",
                    notification:{
                        title: <FormattedMessage id = "app.personalize.questionAnswerError"/>,
                        message: <FormattedMessage id = "app.personalize.questionAnswerErrorMessage"/>
                    }
                },
                answer2: {
                    error: "adaptAnswer2",
                    notification:{
                        title: <FormattedMessage id = "app.personalize.questionAnswerError"/>,
                        message: <FormattedMessage id = "app.personalize.questionAnswerErrorMessage"/>
                    }
                },
                question3: {
                    error: "adaptQustion3",
                    notification:{
                        title: <FormattedMessage id = "app.personalize.questionAnswerError"/>,
                        message: <FormattedMessage id = "app.personalize.questionAnswerErrorMessage"/>
                    }
                },
                answer3: {
                    error: "adaptAnswer3",
                    notification:{
                        title: <FormattedMessage id = "app.personalize.questionAnswerError"/>,
                        message: <FormattedMessage id = "app.personalize.questionAnswerErrorMessage"/>
                    }
                }
            };
            dispatch({
                type: UPDATE_ERROR,
                payload: failInfoMap[failed].error
            });
                dispatch(triggerNotification(failInfoMap[failed].notification));
        }
    };
}

function handleToggleModal(state, action) {
    let nextModal = action.payload;
    if (nextModal === "PersonalizeModal" && state.croppedImage) {
        nextModal = "PickTheme";
    }
    if (nextModal === "PickBackDrop" && !state.theme.backdrops) {
        nextModal = "SecurityPhraseAndQuestions";
    }
    return update(state, {
        visibleModal:{
            $set: nextModal
        }
    });
}

function handleUpdateImage(state, action) {
    let change = {
        croppedImage: {
            $set: null
        }
    };
    if (action.payload){
        change = {
            image: {
                $set: action.payload.image
            },
            croppedImage: {
                $set: action.payload.systemImage ? action.payload.image.path : null
            }
        };
    }
    return update(state, change);
}

function handleUpdateCroppedImage(state, action) {
    return update(state, {
        croppedImage:{
            $set: action.payload.img
        },
        visibleModal: {
            $set: action.payload.nextModal
        }
    });
}

function handleUpdateTheme(state, action) {
    return update(state, {
        theme:{
            $set: action.payload.theme
        }
    });
}

function handleUpdateBackdrop(state, action) {
    return update(state, {
        backdrop: {
            $set: action.payload.backdrop
        }
    });
}

function handleUpdateSecretQuestion(state, action) {
    return update(state, {
        secretQuestionDetails: {
            [action.payload.key]: {
                $set: action.payload.value
            }
        }
    });
}

function handlePersonalizationSuccess(state) {
    return update(state, {
        visibleModal: {
            $set: "Completed"
        }
    });
}

function handleShowSafetyTips(state) {
    return update(state, {
        showSafetyTips: {
            $set: true
        }
    });
}
function handleError(state, action){
  return update(state, {
    errorName: {
      $set: action.payload
    }
  });

}
function handleResetStore(state) {
    return initialState;
}
const ACTION_HANDLERS = {
    RESET_STORE: handleResetStore,
    UPDATE_IMAGE: handleUpdateImage,
    TOGGLE_MODAL: handleToggleModal,
    UPDATE_CROPPED_IMAGE: handleUpdateCroppedImage,
    UPDATE_THEME: handleUpdateTheme,
    UPDATE_BACKDROP: handleUpdateBackdrop,
    UPDATE_SECRET_QUESTION: handleUpdateSecretQuestion,
    UPDATE_PERSONALIZATION_SUCCESS: handlePersonalizationSuccess,
    SHOW_SAFETY_TIPS: handleShowSafetyTips,
    UPDATE_ERROR:handleError
};

const initialState = {
    personalizationDetails: {},
    secretQuestionDetails: {}
};
export default function personalizeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
