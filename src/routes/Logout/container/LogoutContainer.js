import { connect } from "react-redux";
import Logout from "../components/Logout";
import {updateIntl} from "react-intl-redux";
import { getAsyncLogoutData, handleNextIndex, navigateToDifferentPages } from "../modules/logout";
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
  logoutData: state.logout.logoutData,
  zeroActivityIndex: state.logout.zeroActivityIndex || 0
});

const mapDispatchToProps = {
	updateMessages,
	getAsyncLogoutData,
	handleNextIndex,
	navigateToDifferentPages
};


export default connect(mapStateToProps, mapDispatchToProps)(Logout);