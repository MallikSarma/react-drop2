import React from "react";
import * as css from "./Personalize.scss";
import Navigation from "./Navigation";
import UploadNow from "./UploadNow";
import DragAndDrop from "./DragAndDrop";
import PickTheme from "./PickTheme";
import PickBackDrop from "./PickBackDrop";
import PersonalizeModal from "./PersonalizeModal";
import SecurityPhraseAndQuestions from "./SecurityPhraseAndQuestions";
import Completed from "./Completed";
import { IntlProvider, addLocaleData, FormattedMessage, defineMessages } from "react-intl";
import msLocaleData from "react-intl/locale-data/ms";
import Notifications from "react-notification-system";
addLocaleData(msLocaleData);

const defaultMessages = defineMessages({
    letsPersonalize: {
        id: "app.personalize.letsPersonalize",
        defaultMessage: "Let’s personalize your Maybank2u."
    },
    securityPhraseError: {
        id: "app.personalize.securityPhraseError",
        defaultMessage: "Please Create Security Phrase"
    },
    securityPhraseErrorMessage: {
        id: "app.personalize.securityPhraseErrorMessage",
        defaultMessage: "Input Security Phrase between 5 and 40 characters."
    },
    questionAnswerError: {
        id: "app.personalize.questionAnswerError",
        defaultMessage: "Challenge Questions Required"
    },
    questionAnswerErrorMessage: {
        id: "app.personalize.questionAnswerErrorMessage",
        defaultMessage: "You must input and answer to all 3 Challenge Questions."
    },
    invalidImage: {
        id: "app.personalize.invalidImage",
        defaultMessage: "Invalid Image"
    },
    invalidImageMessage: {
        id: "app.personalize.invalidImageMessage",
        defaultMessage: "The photo has exceeded the size limit, please upload a smaller file."
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

class Personalize extends React.Component {

    constructor(props){
        super(props);
    }
    componentWillMount() {
        this.props.resetStore();
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

    repickTheme() {
        this.props.updateTheme({theme: null});
        this.props.updateBackdrop({backdrop: ""});
        this.props.toggleModal("PickTheme");
    }

    reselectImage() {
        this.props.toggleModal("DragAndDrop");
        this.props.updateImage();
    }

    render(){
        const {
            locale,
            messages,
            toggleModal,
            visibleModal,
            updateImage,
            image,
            updateCroppedImage,
            croppedImage,
            updateTheme,
            theme,
            updateBackdrop,
            backdrop
        } = this.props;
        return (
            <IntlProvider locale={locale} defaultLocale={'en-US'} messages={messages}>
                <div className={`${css.container}`}>
                    <Navigation/>
                    <div className={` row ${css[ "pes-wrapper"]}`}>
                        <div className={` col-md-12 ${css[ "top-panel"]}`}>
                            <div className={`${css[ "top-panel-content"]}`}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h1><FormattedMessage
                                            id="app.personalize.letsPersonalize"
                                            {...defaultMessages.letsPersonalize}
                                            /></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {  visibleModal === "UploadNow" &&
                       <UploadNow toggleDragAndDrop={toggleModal.bind(this,"DragAndDrop")}/>
                    }
                    {
                        visibleModal === "DragAndDrop" &&
                        <DragAndDrop image={image} croppedImage={croppedImage} toggleCropper={toggleModal.bind(this,"PersonalizeModal")} updateImage={updateImage} adaptImagesBean={this.props.adaptImagesBean}/>
                    }
                    {
                        visibleModal === "PersonalizeModal" &&
                        <PersonalizeModal image={image} updateCroppedImage={updateCroppedImage} reselectImage={()=>this.reselectImage()}/>
                    }
                    {
                        visibleModal === "PickTheme" &&
                        <PickTheme
                            updateTheme={updateTheme}
                            theme={theme}
                            openBackDropModal={toggleModal.bind(this, "PickBackDrop")}
                            personalizationDetails={this.props.personalizationDetails}
                        />
                    }
                    {
                        visibleModal === "PickBackDrop" &&
                        <PickBackDrop
                            updateBackdrop={updateBackdrop}
                            backdrop={backdrop}
                            openSecurityPhrase={toggleModal.bind(this, "SecurityPhraseAndQuestions")}
                            repickTheme={()=>{this.repickTheme();}}
                            theme={this.props.theme}
                        />
                    }
                    {
                        visibleModal === "SecurityPhraseAndQuestions" &&
                        <SecurityPhraseAndQuestions
                            updateSecretQuestions={this.props.updateSecretQuestions}
                            croppedImage={croppedImage} questionsList={this.props.questionsList}
                            secretQuestionDetails={this.props.secretQuestionDetails}
                            handleSubmit={this.props.asyncPersonalizeSubmit}
                            errorName={this.props.errorName}
                            backdrop={backdrop}
                            resetError={this.props.resetError}
                            theme={theme}
                        />
                    }
                    {
                        visibleModal === "Completed" &&
                        <Completed
                            secretQuestionDetails={this.props.secretQuestionDetails}
                            croppedImage={croppedImage}
                            showSafetyTips={this.props.showSafetyTips}
                            backToHome={this.props.backToHome}
                        />
                    }
                    <Notifications style={style} ref="notificationSystem"/>
                </div>
            </IntlProvider>
        );
    }
}

export default Personalize;
