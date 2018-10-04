import request from "../../../util/request";
import validations from "../../../util/validations";
import update from "react/lib/update";
import services from "../../../services";
import { push } from "react-router-redux";
import constants from "./actionConstants";
import React from "react";
import { FormattedMessage } from "react-intl";
const {
  GET_TOKENS,
  USER_EXIST,
  UPDATE_USER,
  CONFIRM_USER,
  UPDATE_PASSWORD,
  WRONG_PASSWORD,
  FORGOT_CREDENTIALS,
  FORGOT_PIN_SUCCESS,
  UPDATE_FORGOT_DETAILS,
  REQUEST_OTP,
  OPEN_LOGIN_MODAL,
  OTP_SUCCESS,
  CLOSE_SUGGESTION_MODAL,
  UPDATE_SAFETY_STEP,
  INACTIVE_ACCOUNT,
  REQUEST_TAC,
  REQUEST_TAC_SUCCESS,
  TAC_CONFIRMED,
  UPDATE_ERROR,
  REMOVE_NOTIFICATION,
  ADD_NOTIFICATION,
  RESET_LOGIN_STORE
} = constants;
export function resetError(payload) {
  return {
    type: UPDATE_ERROR
  };
}
export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload
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
    level: payload.level || "error",
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

export function closeSuggestionModal() {
  return {
    type: CLOSE_SUGGESTION_MODAL
  };
}

export function updatePassword(payload) {
  return {
    type: UPDATE_PASSWORD,
    payload
  };
}

export function forgotCredentialsFlowState(payload) {
  return {
    type: FORGOT_CREDENTIALS,
    payload
  };
}

export function openLoginModal() {
    return {
        type: OPEN_LOGIN_MODAL
    };
}

export function updateForgotDetails(payload) {
  return {
    type: UPDATE_FORGOT_DETAILS,
    payload
  };
}

export function gotoRegister() {
    let locationArray = window.location.pathname.split(/(\/)/);
    let locationToChange = locationArray.length - 3;
    if (!window.location.pathname.match(/[\/]$/)) {
        locationToChange = locationArray.length - 1;
    }
    locationArray[locationToChange] = "registration";
    return push(locationArray.join(""));
}

export function confirmUser(payload) {
    return {
      type: CONFIRM_USER,
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

export function updateSafetyStep(payload) {
  return {
    type: UPDATE_SAFETY_STEP,
    payload
  };
}
export function asyncCheckOTP() {
    return (dispatch, store) => {
        const { password, confirmPassword, otp } = store().login.forgotCredentialData;
        if (otp && otp.trim()){
            const payload = {
                "screen": "",
                "username": store().login.forgotCredentialData.pinSuccessData.username,
                "password": password,
                "action": "",
                "confirmPwd": confirmPassword,
                "otp": otp.trim(),
                "do": "",
                "email": "",
                "pageId": "",
                "encryptedPwd": ""
            };
            request.post(services.getPersonalizationDetails)
            .send(payload)
            .finish((error, res) => {
                dispatch({
                    type: UPDATE_ERROR
                });
                dispatch({
                    type: OTP_SUCCESS
                });
                dispatch(triggerNotification({
                  title: <FormattedMessage id = "app.login.yourPasswordHasBeenUpdated"/>,
                  message: <FormattedMessage id = "app.login.youMayLogin"/>,
                  level: "success"
              }));
            });
        }
        else {
            const oneTimePassword = {
                error: "otpError",
                notification:{
                    title: <FormattedMessage id = "app.registration.otpError"/>,
                    message: <FormattedMessage id = "app.registration.otpCannotBeEmpty"/>
                }
            };
            dispatch({
                type: UPDATE_ERROR,
                payload: oneTimePassword.error
            });
            dispatch(triggerNotification(oneTimePassword.notification));
        }
    };
}

export function asyncRequestOTP() {
  return (dispatch, store) => {
    const { password, confirmPassword } = store().login.forgotCredentialData;
    const {state, failed} = validations.checkOTP(password, confirmPassword);
    if (state) {
        dispatch({
            type: UPDATE_ERROR
        });
        dispatch({
            type: REMOVE_NOTIFICATION
        });
      request.get(services.getOTC).finish((error, res) => {
          dispatch({
              type: REQUEST_OTP,
              payload: {
                ...res.body, OTPRequest: true
              }
            });
      });
    } else {
            const failInfoMap = {
                password: {
                    error: "passwordError",
                    notification:{
                          title: <FormattedMessage id = "app.login.invalidPassword"/>,
                          message: <FormattedMessage id = "app.login.invalidPasswordMessage"/>
                    }
                },
                confirmPassword: {
                    error: "confirmPasswordError",
                    notification:{
                          title: <FormattedMessage id = "app.login.passwordMismatch"/>,
                          message: <FormattedMessage id = "app.login.passwordMismatchMessage"/>
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

export function asyncTACConfirm() {
  return (dispatch, store) => {
    dispatch({
      type: TAC_CONFIRMED
    });
    dispatch(triggerNotification({
      title: <FormattedMessage id = "app.login.activatedPromptTitle"/>,
      message: <FormattedMessage id = "app.login.activatedPromptMessage"/>,
      level: "success"
    }));
  };
}

export function asyncCheckUser () {
  return (dispatch, store) => {
    const userName = store().login.userName;
    const {state} = validations.checkUser(userName);
    if (state) {
        dispatch({
          type: UPDATE_ERROR
        });
        dispatch({
          type: REMOVE_NOTIFICATION
        });
        const payload = {
            "pm_fp":"",
            "username":store().login.userName,
            "password":"",
            "action":"Login",
            "domElementsString":"",
            "jsEventsString":"",
            "pageId":"mbbPortalAccess",
            "theFormAction":"Yes"
        };

        dispatch({
          type: UPDATE_ERROR
        });
        request.post(services.checkUser)
          .send(payload)
          .finish((error, res) => {
            dispatch({
              type: USER_EXIST,
              payload: {
              userDetails: res.body
            }
            });
         });
      } else {
        dispatch({
          type: UPDATE_ERROR,
          payload: "userNameError"
        });
        dispatch(triggerNotification({
          title: <FormattedMessage id = "app.login.invalidUsername"/>,
          message: <FormattedMessage id = "app.login.invalidUsernameMessage"/>
        }));
      }
    };
}

export function asyncAuthenticatePin() {
    return (dispatch, store) => {
        const {cardNo, pin} = store().login.forgotCredentialData;
        const {state, failed} = validations.checkCardAndPin(cardNo,pin);
        if (state){
            dispatch({
                type: UPDATE_ERROR
            });
            dispatch({
                type: REMOVE_NOTIFICATION
            });
            const payload = {
                "pin":pin,
                "terms":true,
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
                            type: FORGOT_PIN_SUCCESS,
                            payload: {
                                key: "pinSuccessData",
                                value: res.body
                            }
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

export function asyncRequestToActivate() {
  return (dispatch, store) => {
    const {cardNo, pin} = store().login.forgotCredentialData;
    const {state, failed} = validations.checkCardAndPin(cardNo,pin);
    if (state){
        dispatch({
            type: UPDATE_ERROR
        });
        dispatch({
            type: REMOVE_NOTIFICATION
        });
        dispatch({
          type: REQUEST_TAC
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

export function asyncRequestTAC() {
  return (dispatch, store)=> {
        dispatch({
          type: REQUEST_TAC_SUCCESS
        });
  };
}
export function asyncAuthenticateUser () {
  return (dispatch, store) => {
    const {userName, password} = store().login;
    const {state} = validations.checkPassword(password);
    if (state) {
        dispatch({
            type: UPDATE_ERROR
        });
        dispatch({
            type: REMOVE_NOTIFICATION
        });
    const payload = {
        "pm_fp":"",
        "username":userName,
        "password":password,
        "action":"Login",
        "domElementsString":"",
        "jsEventsString":"",
        "pageId":"",
        "theFormAction":"Yes"
    };
      request.post(services.authenticate)
        .send(payload)
        .finish((error, res) => {
          if (res.body.accountInactive) {
            dispatch({
              type: INACTIVE_ACCOUNT
            });
          }
          else if (res.body.authenticate){
              let locationArray = window.location.pathname.split(/(\/)/);
              let locationToChange = locationArray.length - 3;
              if (!window.location.pathname.match(/[\/]$/)) {
                  locationToChange = locationArray.length - 1;
              }
              locationArray[locationToChange] = "dashboard/casa";
              dispatch({
                type: "SET_USER_PROFILE",
                payload: res.body
              });
              dispatch(push(locationArray.join("")));
          }
          else {
              dispatch({
                type: WRONG_PASSWORD
            });
              let wrongPassPrompts = {
                  primary: store().login.attemptsLeft > 1 ? "app.login.wrongPassPrompt1" : "app.login.wrongPassPrompt3",
                  secondary: store().login.attemptsLeft > 1 ? "app.login.wrongPassPrompt2" : "app.login.wrongPassPrompt4"
              };
              dispatch(triggerNotification({
                  title: <FormattedMessage id = {wrongPassPrompts.primary}/>,
                  message: <FormattedMessage id = {wrongPassPrompts.secondary} values={{attemptsLeft: store().login.attemptsLeft}}/>
              }));
          }
       });
    }
    else {
        dispatch({
          type: UPDATE_ERROR,
          payload: "passwordError"
        });
        dispatch(triggerNotification({
          title: <FormattedMessage id = "app.login.invalidPassword"/>,
          message: <FormattedMessage id = "app.login.invalidPasswordMessage"/>
        }));
    }
  };
}


function handleUpdateUser(state, action) {
  return update(state,{
      userName: {
        $set: action.payload.userName
      }
  });
}

function handleUpdatePassword(state, action) {
  return update(state,{
    password: {
      $set: action.payload.password
    }
  });
}

function handleConfirmUser(state, action) {
  let change = {};
  if (!action.payload) {
    change = {
      userConfirmed: {
        $set: false
      },
      userDetails: {
        $set: null
      },
      userName: {
        $set: ""
      },
      password: {
        $set: ""
      }
    };
  } else {
    change = {
      userConfirmed: {
        $set: true
      }
    };
  }
  return update(state, change);
}

function handleWrongPassword(state, action) {
    if (state.attemptsLeft === 1){
        return update(state, {incorrectPassword:{
            $set: false
            },
            attemptsLeft: {
                $set: 0
            },
            forgotPasswordSuggestion:{
                $set: true
            },
            userConfirmed: {
                $set: false
            }

        });
    }
    const attemptsLeft = state.attemptsLeft ? state.attemptsLeft - 1 : 3;
    return update(state, {incorrectPassword:{
                $set: true
            },
            attemptsLeft: {
                $set: attemptsLeft
            }
    });
}

function handleForgotCredentials(state, action) {
    let data = state.forgotCredentialData && action.payload ? state.forgotCredentialData : {};
    return update(state, {
        forgotCredentialModal: {
            $set: action.payload
        },
        forgotCredentialData: {
            $set: data
        },
        accountInactiveModal:{
            $set: null
        },
        forgotPasswordSuggestion: {
            $set: null
        },
        userDetails: {
            $set: null
        },
        userName: {
            $set: null
        },
        userConfirmed: {
            $set: false
        },
        incorrectPassword: {
            $set: false
        },
        attemptsLeft: {
            $set: 0
        },
        password: {
            $set: ""
        }
    });
}

function handleUpdateForgotDetails(state, action) {
    if (action.payload.key === "cardNo" || action.payload.key === "pin") {
        if (!validations.checkNumber(action.payload.value)){
          return state;
        }
    }
    return update(state, {
        forgotCredentialData: {
            [action.payload.key]: {
                $set: action.payload.value
            }
        }
    });
}

function handleForgotPinSuccess(state, action) {
    return update( state, {
        forgotCredentialData: {
            [action.payload.key]: {
                $set: action.payload.value
            }
        },
        forgotCredentialModal: {
          $set: "FoundAccount"
        }
    });
}

function handleRequestOTP(state, action) {
    const updatedData = {...state.forgotCredentialData, ...action.payload};
    return update( state, {
        forgotCredentialData: {
            $set: updatedData
        }
    });
}

function handleOTPSuccess(state) {
    return update( state,{
        forgotCredentialData:{
            $set: {}
        },
        forgotCredentialModal: {
            $set: null
        },
        OTPSuccess: {
            $set: true
        }
    });
}

function handleOpenLoginModal(state) {
    const userData = state.forgotCredentialData.pinSuccessData;
    return update(state, {
        userDetails: {
            $set: userData
        },
        userName: {
            $set: userData.username
        },
        userConfirmed: {
            $set: true
        },
        forgotCredentialData:{
            $set: {}
        },
        forgotCredentialModal: {
            $set: null
        },
        OTPSuccess: {
            $set: false
        },
    });
}

function handleCloseSuggestionModal(state) {
  return update(state, {
    forgotPasswordSuggestion: {
        $set: false
    },
    userDetails: {
        $set: null
    },
    password: {
        $set: null
    },
    userName: {
        $set: null
    }
    });
}

function handleUpdateSafetyStep(state, action) {
    let change = {
        currentSafetyStepIndex: {
            $set: action.payload
        }
    };
    return update(state, change);
}

function handleInactiveAccount(state) {
    return update(state, {
        accountInactiveModal: {
            $set: "VerifyAccessNumberPin"
        }
    });
}

function handleRequestTAC(state) {
  return update(state, {
    accountInactiveModal: {
      $set: "AccountInactive"
    }
  });
}

function handleTACRequestSuccess(state) {
  return update(state, {
    tacRequest: {
      $set: true
    }
  });
}

function handleTacConfirmed(state) {
  return update( state, {
    accountInactiveModal: {
      $set: null
    },
    tacRequest: {
      $set: false
    },
    accountActivated: {
      $set: true
    },
    password: {
      $set: ""
    },
    userDetails: {
      $set: null
    },
    userName: {
      $set: ""
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

function handleUserProfile(state, action){
  return update(state, {
    userProfile: {
      $set: action.payload
    }
  });
}
function handleResetLoginStore() {
  return initialState;
}
const ACTION_HANDLERS = {
    GET_TOKENS : (state, action) => {
      let newState = Object.assign({},state);
      newState.tokens = action.payload;
      return newState;
    },
    USER_EXIST: (state, action) => {
      let newState = Object.assign({},state);
      newState.userDetails = action.payload.userDetails;
      return newState;
    },
    UPDATE_USER: handleUpdateUser,
    CONFIRM_USER: handleConfirmUser,
    UPDATE_PASSWORD: handleUpdatePassword,
    FORGOT_CREDENTIALS: handleForgotCredentials,
    WRONG_PASSWORD: handleWrongPassword,
    FORGOT_PIN_SUCCESS: handleForgotPinSuccess,
    UPDATE_FORGOT_DETAILS: handleUpdateForgotDetails,
    REQUEST_OTP: handleRequestOTP,
    OTP_SUCCESS: handleOTPSuccess,
    OPEN_LOGIN_MODAL: handleOpenLoginModal,
    UPDATE_SAFETY_STEP: handleUpdateSafetyStep,
    CLOSE_SUGGESTION_MODAL: handleCloseSuggestionModal,
    INACTIVE_ACCOUNT: handleInactiveAccount,
    REQUEST_TAC: handleRequestTAC,
    REQUEST_TAC_SUCCESS: handleTACRequestSuccess,
    TAC_CONFIRMED: handleTacConfirmed,
    UPDATE_ERROR:handleError,
    RESET_LOGIN_STORE: handleResetLoginStore,
    SET_USER_PROFILE: handleUserProfile
};


const initialState = {
    forgotCredentialData: {},
    currentSafetyStepIndex: 1
};
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
