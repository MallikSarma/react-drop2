import React from "react";
import * as css from "./Registration.scss";
import Navigation from "./Navigation";
import CardForm from "./CardForm";
import UsernamePassword from "./UsernamePassword";
import { IntlProvider, addLocaleData, FormattedMessage, defineMessages } from "react-intl";
import OneTimePassword from "../../../components/OneTimePassword";
import msLocaleData from "react-intl/locale-data/ms";
import Notifications from "react-notification-system";
import PdfViewer from "../../../components/PdfViewer";

addLocaleData(msLocaleData);

const defaultMessages = defineMessages({
    joinMaybank: {
        id: "app.registration.joinMaybank",
        defaultMessage: "Join us and become a Maybank2u user today."
    },
    invalidEmail: {
        id: "app.registration.invalidEmail",
        defaultMessage: "Invalid Email"
    },
    invalidEmailMessage: {
        id: "app.registration.invalidEmailMessage",
        defaultMessage: "Your email address is invalid."
    },
    agreeConditions: {
        id : "app.registration.agreeConditions",
        defaultMessage: "Please agree with the Terms & Conditions to proceed."
    },
    otpCannotBeEmpty: {
        id : "app.registration.otpCannotBeEmpty",
        defaultMessage: "OTP is required"
    },
    otpError: {
        id : "app.registration.otpError",
        defaultMessage: "OTP Error"
    }
});
const style = {
    Containers: {
        DefaultStyle: {
            position: "fixed",
            padding:"0",
            width:"100%"
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
            backgroundColor: "green"
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
class Registration extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getAsyncTokens();
        this.props.getAsyncPageDetails();
        this.props.resetRegistration();
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

    openTermsPdf() {
        this.props.handlePDFUrl(this.props.registrationDetails.termConditionURL);
    }

    render() {
        const { messages, locale } = this.props;
        return (
            <IntlProvider locale={locale} defaultLocale={'en-US'} messages={messages}>
                <div className={`${css.container} container-fluid row`}>
                    <div className="col-md-12">
                        <Navigation/>
                        <div className={` row ${css[ "reg-wrapper"]}`}>
                            <div className={` col-lg-5 col-md-5 col-sm-5 col-xs-12 ${css[ "left-panel"]}`}>
                                <div className={`${css[ "left-panel-content"]}`}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h1><FormattedMessage
                                                id="app.registration.joinMaybank"
                                                {...defaultMessages.joinMaybank}
                                                /></h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={` col-lg-7 col-md-7 col-sm-7 col-xs-12 ${css[ "right-panel"]}`}>
                                {   !this.props.pinAuthenticateResponse &&
                                    <CardForm
                                        openPdf={()=>this.openTermsPdf()}
                                        cardDetails={this.props.cardDetails}
                                        asyncAuthenticatePin={this.props.asyncAuthenticatePin}
                                        updateCardDetails={this.props.updateCardDetails}
                                        agreeConditions={this.props.agreeConditions}
                                        errorName={this.props.errorName}
                                        resetError={this.props.resetError}
                                    />
                                }
                                {   this.props.pinAuthenticateResponse &&
                                    <UsernamePassword
                                        userDetails={this.props.userDetails}
                                        pinAuthenticateResponse={this.props.pinAuthenticateResponse}
                                        showOneTime={this.props.showOneTime}
                                        getAsyncOTP={this.props.getAsyncOTP}
                                        updateUserDetails={this.props.updateUserDetails}
                                        errorName={this.props.errorName}
                                        resetError={this.props.resetError}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    {   this.props.showOneTime &&
                        <OneTimePassword asyncCheckOTP={this.props.asyncCheckOTP} updateUserDetails={this.props.updateUserDetails} errorName={this.props.errorName} mobileDisplay={this.props.pinAuthenticateResponse.mobileDisplay}/>
                    }
                    {
                        this.props.receiptUrl &&
                        <PdfViewer
                            receiptUrl={this.props.receiptUrl}
                            downloadPdf={null}
                            scaleValue={this.props.pdfScale}
                            toggleScale={this.props.togglePdfScale}
                            handlePDFUrl={this.props.handlePDFUrl}
                            updatePDFpages={this.props.updatePDFpages}
                            pdfPages={this.props.pdfPages}
                        />
                    }
                    <Notifications style={style} ref="notificationSystem"/>
                </div>
            </IntlProvider>
        );
    }
}

export default Registration;
