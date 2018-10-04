import React from "react";
import Header from "./Header";
import ForgotPasswordSuggestion from "./ForgotPasswordSuggestion";
import Footer from "./Footer";
import * as css from "./login.scss";
import { IntlProvider, defineMessages, addLocaleData } from "react-intl";
import msLocaleData from "react-intl/locale-data/ms";
import VerifyAccessNumberPin from "./VerifyAccessNumberPin";
import FoundAccount from "./FoundAccount";
import ResetPassword from "./ResetPassword";
import SafetyTipsModal from "./SafetyTipsModal";
import AccountInactive from "./AccountInactive";
import Notifications from "react-notification-system";
import _ from "lodash";
addLocaleData(msLocaleData);
const defaultMessages = defineMessages({
    wrongPassPrompt1: {
        id: "app.login.wrongPassPrompt1",
        defaultMessage: "Oops! Wrong username/password"
    },
    wrongPassPrompt2:{
        id: "app.login.wrongPassPrompt2",
        defaultMessage: "You have only {attemptsLeft} attempts to login into your account."
    },
    wrongPassPrompt3: {
        id: "app.login.wrongPassPrompt3",
        defaultMessage: "Sorry, wrong username/password"
    },
    wrongPassPrompt4:{
        id: "app.login.wrongPassPrompt4",
        defaultMessage: "This is your last attempt, or you can click on Forgot Password."
    },
    yourPasswordHasBeenUpdated:{
        id: "app.login.yourPasswordHasBeenUpdated",
        defaultMessage: "Your Password Has Been Updated!"
    },
    youMayLogin:{
        id: "app.login.youMayLogin",
        defaultMessage: "You may proceed to login"
    },
    invalidPasswordTitle: {
        id: "app.login.invalidPassword",
        defaultMessage:"Invalid Password"
    },
    invalidPasswordMessage: {
        id: "app.login.invalidPasswordMessage",
        defaultMessage: "Input Password between 8 and 12 alphanumeric characters."
    },
    passwordMismatch: {
        id: "app.login.passwordMismatch",
        defaultMessage: "Password Mismatch"
    },
    passwordMismatchMessage: {
        id: "app.login.passwordMismatchMessage",
        defaultMessage: "Your Password and Confirm Password do not match."
    },
    invalidUsername: {
        id: "app.login.invalidUsername",
        defaultMessage: "Invalid Username"
    },
    invalidUsernameMessage: {
        id : "app.login.invalidUsernameMessage",
        defaultMessage: "Input Username between 6 and 16 characters."
    },
    invalidCardno: {
        id: "app.login.invalidCardno",
        defaultMessage: "Invalid Card Access Number"
    },
    invalidCardnoMessage: {
        id: "app.login.invalidCardnoMessage",
        defaultMessage: "Card Access Number must be in 16 digits format."
    },
    invalidPin: {
        id: "app.login.invalidPin",
        defaultMessage: "Invalid PIN Number"
    },
    invalidPinMessage: {
        id: "app.login.invalidPinMessage",
        defaultMessage: "Input Your 6-digits PIN."
    },
    activatedPromptTitle: {
        id: "app.login.activatedPromptTitle",
        defaultMessage: "Your Account Has Been Activated!",
    },
    activatedPromptMessage: {
        id: "app.login.activatedPromptMessage",
        defaultMessage: "You may proceed to login",
    }
});
class LoginView extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.getAsyncTokens();
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    componentWillReceiveProps(props){
        if (Object.keys(props.notification).length && (!this.refs.notificationSystem.state.notifications.length || this.refs.notificationSystem.state.notifications.find(not=>not.uid !== props.notification.uid))){
            this.refs.notificationSystem.state.notifications.filter(not=>not.uid !== props.notification.uid).forEach((notification)=>{
                this._notificationSystem.removeNotification(notification);
            });
            this._notificationSystem.addNotification(props.notification);
        } else if (!props.errorName.length){
            this.refs.notificationSystem.state.notifications.forEach((notification)=>{
                this._notificationSystem.removeNotification(notification);
            });
        }
    }

    componentDidUpdate(){
        if (document.getElementsByClassName("reset_modal_tabIndex").length) {
            _.forEach(document.getElementsByClassName("reset_modal_tabIndex"),(el=>el.removeAttribute("tabindex")));
        }
    }

    render () {
    const { messages, locale } = this.props;
    const style = {
        Containers: {
            DefaultStyle: {
                position: "fixed",
                padding:"0",
                minWidth:"100%",
                marginLeft: 0
            }
        },
        NotificationItem:{
            DefaultStyle: {
                position: "fixed",
                bottom: 0,
                right:0
            },
            success: {
                padding: "2.4rem",
                backgroundColor: "#389A6E"
            },
            error: {
                padding: "2.4rem",
                borderTop: "none",
                backgroundColor: "#DA4747"
            }
        },
        Title: {
            DefaultStyle: {
                fontSize: "1.6rem",
                color: "#fff"
            }
        },
        Dismiss: {
            DefaultStyle: {
                backgroundColor: "transparent",
                fontSize: "2.6rem",
                fontFamily: "Lato"
            }
        }
    };
    return (
        <IntlProvider locale={locale} defaultLocale={'en-US'} messages={messages}>
            <div className={`${css.loginContainer} row`}>
                <Header
                    resetError={this.props.resetError}
                    accountInactive={!!this.props.accountInactiveModal}
                    gotoRegister={this.props.gotoRegister}
                    confirmUser={this.props.confirmUser}
                    checkUser={()=>{this.props.asyncCheckUser();}}
                    updateUser={this.props.updateUser}
                    userDetails={this.props.userDetails}
                    errorName={this.props.errorName}
                    userConfirmed={this.props.userConfirmed}
                    password={this.props.password}
                    updatePassword={this.props.updatePassword}
                    asyncAuthenticateUser={this.props.asyncAuthenticateUser}
                    incorrectPassword={this.props.incorrectPassword}
                    userName={this.props.userName}
                    forgotCredentialsFlowState={this.props.forgotCredentialsFlowState}
                    forgotPasswordSuggestion={this.props.forgotPasswordSuggestion}
                />
                {
                    this.props.forgotPasswordSuggestion  &&
                    <ForgotPasswordSuggestion onResetPassword={this.props.forgotCredentialsFlowState.bind(this, "VerifyAccessNumberPin")} onClose={this.props.closeSuggestionModal} userDetails={this.props.userDetails}/>
                }
                <Footer/>
                {
                    ((this.props.forgotCredentialModal === "VerifyAccessNumberPin") || (this.props.accountInactiveModal === "VerifyAccessNumberPin")) &&
                    <VerifyAccessNumberPin
                        forgotCredentialData={this.props.forgotCredentialData}
                        onClose={this.props.forgotCredentialsFlowState.bind(this, null)}
                        updateDetails={this.props.updateForgotDetails}
                        asyncAuthenticatePin={this.props.asyncAuthenticatePin}
                        accountInactive={!!this.props.accountInactiveModal}
                        asyncRequestToActivate={this.props.asyncRequestToActivate}
                        errorName={this.props.errorName}
                        resetError={this.props.resetError}
                    />
                }
                {
                    this.props.accountInactiveModal === "AccountInactive" &&
                    <AccountInactive asyncRequestTAC={this.props.asyncRequestTAC} tacRequest={this.props.tacRequest} asyncTACConfirm={this.props.asyncTACConfirm} onClose={this.props.forgotCredentialsFlowState.bind(this, null)}/>
                }
                {
                    this.props.forgotCredentialModal === "FoundAccount" &&
                    <FoundAccount
                        openLoginModal={this.props.openLoginModal}
                        onClose={this.props.forgotCredentialsFlowState.bind(this, null)}
                        userName={this.props.forgotCredentialData.pinSuccessData.username}
                        resetPassword={this.props.forgotCredentialsFlowState.bind(this, "ResetPassword")}
                    />
                }
                {   this.props.forgotCredentialModal === "ResetPassword" &&
                    <ResetPassword
                        forgotCredentialData={this.props.forgotCredentialData}
                        onClose={this.props.forgotCredentialsFlowState.bind(this, null)}
                        requestOTP={this.props.asyncRequestOTP}
                        OTPRequest={this.props.OTPRequest}
                        updatePassword={this.props.updateForgotDetails}
                        asyncCheckOTP={this.props.asyncCheckOTP}
                        errorName={this.props.errorName}
                        resetError={this.props.resetError}
                    />
                }
                {
                    this.props.showSafetyTips && this.props.currentSafetyStepIndex &&
                    <SafetyTipsModal
                        currentSafetyStepIndex={this.props.currentSafetyStepIndex}
                        updateSafetyStep={this.props.updateSafetyStep}
                    />
                }
                <Notifications style={style} ref="notificationSystem"/>
            </div>
        </IntlProvider>
    );
  }
}

export default LoginView;
