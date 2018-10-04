import { connect } from "react-redux";
import {updateIntl} from "react-intl-redux";
import Registration from "../components/Registration";
import {
    getAsyncTokens,
    getAsyncPageDetails,
    updateCardDetails,
    updateUserDetails,
    asyncAuthenticatePin,
    asyncCheckOTP,
    getAsyncOTP,
    triggerNotification,
    removeNotifications,
    togglePdfScale,
    handlePDFUrl,
    updatePDFpages,
    resetError,
    resetRegistration
} from "../modules/registration";

function updateMessages(locale) {
    return (dispatch, state)=> {
        dispatch(updateIntl({
            locale,
            messages: state().messages[locale]
        }));
    };
}

const mapStateToProps = (state) => ({
    locale: state.intl.locale,
    messages: state.intl.messages,
    tokens: state.registration.tokens || [],
    pinAuthenticateResponse: state.registration.pinAuthenticateResponse,
    agreeConditions: !!state.registration.cardDetails.agreeConditions,
    showOneTime: state.registration.showOneTime,
    cardDetails: state.registration.cardDetails || {},
    errorName: state.registration.errorName || "",
    receiptUrl: state.registration.receiptUrl,
    pdfScale: state.registration.pdfScale || 1,
    pdfPages: state.registration.pdfPages,
    userDetails: state.registration.userDetails,
    notification: state.notification,
    registrationDetails: state.registration.registrationDetails || {}
});

const mapDispatchToProps = {
    getAsyncTokens,
    updateMessages,
    updateCardDetails,
    updateUserDetails,
    getAsyncPageDetails,
    getAsyncOTP,
    asyncAuthenticatePin,
    asyncCheckOTP,
    triggerNotification,
    removeNotifications,
    togglePdfScale,
    handlePDFUrl,
    updatePDFpages,
    resetError,
    resetRegistration
};


export default connect(mapStateToProps, mapDispatchToProps)(Registration);