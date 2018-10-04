import { connect } from "react-redux";
import {
  getAsyncTokens,
  gotoRegister,
  asyncAuthenticateUser,
  updateUser,
  updatePassword,
  asyncCheckUser,
  updateForgotDetails,
  confirmUser,
  resetPassword,
  forgotCredentialsFlowState,
  asyncAuthenticatePin,
  asyncRequestOTP,
  asyncCheckOTP,
  openLoginModal,
  closeSuggestionModal,
  updateSafetyStep,
  asyncRequestToActivate,
  asyncRequestTAC,
  asyncTACConfirm,
  triggerNotification,
  removeNotifications,
  resetError

} from "../modules/login";
import Login from "../components/Login";
import {updateIntl} from "react-intl-redux";

function updateMessages(locale) {
  return (dispatch, state)=> {
    dispatch(updateIntl({
      locale,
      messages: state().messages[locale]
    }));
  };
}

const mapStateToProps = (state) => ({
  tokens: state.login.tokens || [],
  userDetails: state.login.userDetails,
  password: state.login.password || "",
  userConfirmed: state.login.userConfirmed || false,
  locale: state.intl.locale,
  messages: state.intl.messages,
  incorrectPassword: state.login.incorrectPassword,
  attemptsLeft: state.login.attemptsLeft || 0,
  forgotPasswordSuggestion: state.login.forgotPasswordSuggestion,
  forgotCredentialModal: state.login.forgotCredentialModal,
  forgotCredentialData: state.login.forgotCredentialData || {},
  OTPRequest: state.login.forgotCredentialData && state.login.forgotCredentialData.OTPRequest  || false,
  OTPSuccess: state.login.OTPSuccess,
  userName: state.login.userName,
  currentSafetyStepIndex: state.login.currentSafetyStepIndex,
  showSafetyTips: state.personalize ? state.personalize.showSafetyTips : false,
  accountInactiveModal: state.login.accountInactiveModal,
  tacRequest: state.login.tacRequest,
  accountActivated: state.login.accountActivated,
  errorName: state.login.errorName || "",
  notification: state.notification
});

const mapDispatchToProps = {
  getAsyncTokens,
  asyncAuthenticateUser,
  asyncAuthenticatePin,
  asyncCheckUser,
  updateUser,
  updatePassword,
  confirmUser,
  updateForgotDetails,
  gotoRegister,
  updateMessages,
  resetPassword,
  forgotCredentialsFlowState,
  asyncRequestOTP,
  openLoginModal,
  closeSuggestionModal,
  asyncCheckOTP,
  updateSafetyStep,
  asyncRequestToActivate,
  asyncRequestTAC,
  asyncTACConfirm,
  triggerNotification,
  removeNotifications,
  resetError
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
