import { connect } from "react-redux";
import {updateIntl} from "react-intl-redux";
import Personalize from "../components/Personalize";
import {
	updateTheme,
	showSafetyTips,
	backToHome,
	toggleModal,
	asyncPersonalizeSubmit,
	updateSecretQuestions,
	updateBackdrop,
	updateImage,
	updateCroppedImage,
	triggerNotification,
	removeNotifications,
	resetError,
	resetStore
} from "../modules/personalize";
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
  image: state.personalize.image,
  visibleModal: state.personalize.visibleModal || "UploadNow",
  croppedImage: state.personalize.croppedImage,
  theme: state.personalize.theme,
  backdrop: state.personalize.backdrop || "",
  questionsList: state.registration.personalizationDetails.adaptQuestionsBean || {},
  secretQuestionDetails: state.personalize.secretQuestionDetails || {},
  errorName: state.personalize.errorName || "",
  notification: state.notification,
  adaptImagesBean: state.registration.personalizationDetails.adaptImagesBean || [],
  personalizationDetails: state.registration.personalizationDetails
});

const mapDispatchToProps = {
	updateMessages,
	updateCroppedImage,
	updateImage,
	toggleModal,
	updateTheme,
	updateBackdrop,
	updateSecretQuestions,
	asyncPersonalizeSubmit,
	showSafetyTips,
	backToHome,
    triggerNotification,
    removeNotifications,
    resetError,
    resetStore
};


export default connect(mapStateToProps, mapDispatchToProps)(Personalize);