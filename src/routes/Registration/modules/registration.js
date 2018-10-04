import request from "../../../util/request";
import update from "react/lib/update";
import services from "../../../services";
import { push } from "react-router-redux";
import constants from "./actionConstants";
import validations from "../../../util/validations";
import React from "react";
import { FormattedMessage } from "react-intl";
const {
    GET_TOKENS,
    UPDATE_REGISTRATION_DETAILS,
    UPDATE_CARD_DETAILS,
    UPDATE_USER_DETAILS,
    PIN_AUTHENTICATE_SUCCESS,
    OTP_REQUESTED,
    REMOVE_NOTIFICATION,
    UPDATE_ERROR,
    ADD_NOTIFICATION,
    UPDATE_PDF_PAGES,
    TOGGLE_PDF_VIEW,
    RESET_REGISTRATION,
    TOGGLE_PDF_SCALE,
    UPDATE_PERSONALIZATION_DETAILS
} = constants;
export function resetRegistration() {
    return {
        type: RESET_REGISTRATION
    };
}
export function resetError(payload) {
    return {
        type: UPDATE_ERROR
    };
}
export function togglePdfScale(payload) {
    return {
        type: TOGGLE_PDF_SCALE,
        payload
    };
}
export function updatePDFpages(payload) {
    return {
        type: UPDATE_PDF_PAGES,
        payload
    };
}
export function handlePDFUrl(payload){
    return {
        type: TOGGLE_PDF_VIEW,
        payload
    };
}
export function getAsyncTokens () {
  return (dispatch, store) => {
    request.get(services.getTokens).finish((error, res) => {
        dispatch({
            type: GET_TOKENS,
            payload: res.body
        });
    });
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
export function updateCardDetails(payload) {
    return {
        type: UPDATE_CARD_DETAILS,
        payload
    };
}

export function updateUserDetails(payload) {
    return {
        type: UPDATE_USER_DETAILS,
        payload
    };
}

export function getAsyncPageDetails() {
    return (dispatch, store) => {
        const payload = {
            "screen":"Activate",
            "id":7887889000072875,
            "action":"Activate",
            "accntType":"STP",
            "accessNumber":7887889000072785,
            "pageId":"mbbPortalAccess"
        };
      request.post(services.getRegistrationDetails)
        .send(payload)
        .finish((error, res) => {
           dispatch({
            type: UPDATE_REGISTRATION_DETAILS,
            payload: {
            registrationDetails: res.body
          }
          });
       });
  };
}


export function asyncAuthenticatePin() {
    return (dispatch, store) => {
        const {cardNo, pin, agreeConditions} = store().registration.cardDetails;
        const {state, failed} = validations.checkCardAndPinWithTerms(cardNo,pin,agreeConditions);
        if (state){
            dispatch({
                type: UPDATE_ERROR
            });
            dispatch({
                type: REMOVE_NOTIFICATION
            });
            const payload = {
                "pin":pin,
                "terms":agreeConditions,
                "screen":"Activate",
                "id":cardNo,
                "cardNoHsm":788900007287,
                "hsmLmkTpk":"C52745FF1EA1FE462E3E9E92321C7BF6",
                "action":"Activate",
                "encryptedPin":"dsfds",
                "g-recaptcha-response":"dfgdfgdfgdfgdfg5654v564gg546g54654g5654gerty5465rgerg567yrtgh5ry56herg54g5",
                "pageId":"mbbActivate"
            };
            request.post(services.asyncAuthenticatePin)
                .send(payload)
                    .finish((error, res) => {
                        dispatch({
                            type: PIN_AUTHENTICATE_SUCCESS,
                            payload: {
                                pinAuthenticateResponse: res.body
                            }
                        });
                        dispatch({
                            type: OTP_REQUESTED,
                            payload:true
                        });
                    });
            } else {
                const failInfoMap = {
                    card: {
                        error: "cardNoError",
                        notification:{
                              title: <FormattedMessage id = "app.login.invalidCardno"/>,
                              message: <FormattedMessage id = "app.login.invalidCardnoMessage"/>
                        }
                    },
                    pin: {
                        error: "pinError",
                        notification:{
                              title: <FormattedMessage id = "app.login.invalidPin"/>,
                              message: <FormattedMessage id = "app.login.invalidPinMessage"/>
                        }
                    },
                    terms: {
                        error: "termsError",
                        notification: {
                            title: <FormattedMessage id = "app.registration.agreeConditions"/>
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
export function asyncCheckOTP() {
    return (dispatch, store) => {
        const {userName, password, confirmPassword, email, otp} = store().registration.userDetails;
        const {state, failed} = validations.checkUsernamePasswordEmail(userName, password, confirmPassword, email, otp);
        if (state){
            const payload = {
                "screen": "",
                "username": userName,
                "password": password,
                "action": "",
                "confirmPwd": confirmPassword,
                "otp": otp,
                "do": "",
                "email": email,
                "pageId": "",
                "encryptedPwd": ""
            };
            request.post(services.getPersonalizationDetails)
            .send(payload)
            .finish((error, res) => {
                let locationArray = window.location.pathname.split(/(\/)/);
                let locationToChange = locationArray.length - 3;
                if (!window.location.pathname.match(/[\/]$/)) {
                    locationToChange = locationArray.length - 1;
                }
                locationArray[locationToChange] = "personalize";
                dispatch({
                    type: UPDATE_ERROR
                });
                dispatch({
                    type: REMOVE_NOTIFICATION
                });
                dispatch(push(locationArray.join("")));
                dispatch({
                    type: UPDATE_PERSONALIZATION_DETAILS,
                    payload: {
                        personalizationDetails: res.body
                    }
                });
            });
        }
        else {
            const failInfoMap = {
                username: {
                    error: "userNameError",
                    notification:{
                        title: <FormattedMessage id = "app.login.invalidUsername"/>,
                        message: <FormattedMessage id = "app.login.invalidUsernameMessage"/>
                    }
                },
                pass: {
                    error: "passwordError",
                    notification:{
                        title: <FormattedMessage id = "app.login.invalidPassword"/>,
                        message: <FormattedMessage id = "app.login.invalidPasswordMessage"/>
                    }
                },
                confirmPass: {
                    error: "confirmPasswordError",
                    notification:{
                        title: <FormattedMessage id = "app.login.passwordMismatch"/>,
                        message: <FormattedMessage id = "app.login.passwordMismatchMessage"/>
                    }
                },
                emailAddress: {
                    error: "emailError",
                    notification:{
                        title: <FormattedMessage id = "app.registration.invalidEmail"/>,
                        message: <FormattedMessage id = "app.registration.invalidEmailMessage"/>
                    }
                },
                oneTimePassword: {
                    error: "otpError",
                    notification:{
                        title: <FormattedMessage id = "app.registration.otpError"/>,
                        message: <FormattedMessage id = "app.registration.otpCannotBeEmpty"/>
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

export function handleUpdateRegistrationDetails(state, action) {
    return update(state,{
        registrationDetails: {
          $set: action.payload.registrationDetails
        }
    });
}

export function handlePinAuthenticateSuccess(state, action) {
    return update(state,{
        pinAuthenticateResponse: {
          $set: action.payload.pinAuthenticateResponse
        },
        userDetails: {
            $set: {
                userName: action.payload.pinAuthenticateResponse.username || "",
                email: action.payload.pinAuthenticateResponse.email || ""
            }
        }
    });
}

export function handleUpdateCardDetails(state, action) {
    if (action.payload.key === "cardNo" || action.payload.key === "pin") {
        if (!validations.checkNumber(action.payload.value)){
          return state;
        }
    }
    return update(state,{
        cardDetails: {
            [[action.payload.key]]: {
                $set: action.payload.value
            }
        }
    });
}

export function handleUpdateUserDetails(state, action) {
    return update(state,{
        userDetails: {
            [[action.payload.key]]: {
                $set: action.payload.value
            }
        }
    });
}

export function handleOTPRequested(state, action) {
    return update(state,{
        showOneTime: {
            $set: action.payload
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
function handleUpdatePDFPages(state, action) {
    return update(state, {
        pdfPages: {
            $set: action.payload
        }
    });
}
function handlePdfView(state, action){
    return update(state, {
        receiptUrl: {
            $set: action.payload
        }
    });
}
function handlePDFScale(state, action) {
    let currentScale = state.pdfScale || 1;
    return update(state, {
        pdfScale: {
            $set: action.payload ? currentScale + 0.2 : currentScale - 0.2
        }
    });
}
function updatePersonalizationDetails(state, action) {
    return update( state, {
        personalizationDetails: {
            $set: action.payload.personalizationDetails
        }
    });
}
function handleResetRegistration() {
    return initialState;
}
const ACTION_HANDLERS = {
    GET_TOKENS : (state, action) => {
        let newState = Object.assign({},state);
        newState.tokens = action.payload;
        return newState;
    },
    OTP_REQUESTED: handleOTPRequested,
    UPDATE_REGISTRATION_DETAILS: handleUpdateRegistrationDetails,
    UPDATE_CARD_DETAILS: handleUpdateCardDetails,
    UPDATE_USER_DETAILS: handleUpdateUserDetails,
    PIN_AUTHENTICATE_SUCCESS: handlePinAuthenticateSuccess,
    UPDATE_PDF_PAGES: handleUpdatePDFPages,
    TOGGLE_PDF_SCALE: handlePDFScale,
    TOGGLE_PDF_VIEW:handlePdfView,
    UPDATE_ERROR:handleError,
    UPDATE_PERSONALIZATION_DETAILS: updatePersonalizationDetails,
    RESET_REGISTRATION: handleResetRegistration
};

const initialState = {cardDetails: {}, userDetails: {}};
export default function registrationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
