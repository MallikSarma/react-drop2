import React from "react";
import { IntlProvider } from "react-intl";
import {addLocaleData} from "react-intl";
import msLocaleData from "react-intl/locale-data/ms";
import Header from "./Header";
import LogoutContent from "./LogoutContent";
import * as css from "./Logout.scss";
import MobileLogout from "./MobileLogout";
import ZeroActivities from "./ZeroActivities";
import Loader from "../../../components/LoaderNew";
addLocaleData(msLocaleData);

class Logout extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.getAsyncLogoutData();
    }

    render(){
        const {activities} = this.props.logoutData || {};
        const {zeroActivityDetails} = this.props.logoutData || {};
        return (
                <IntlProvider locale={this.props.locale} defaultLocale={'en-US'} messages={this.props.messages}>
                    <div className={`${css.container} row`}>
                        <div className="col-md-12">
                            <Header navigateToDifferentPages={this.props.navigateToDifferentPages}/>
                            <Loader loaded={!!this.props.logoutData}>
                           {    activities &&
                                <div>
                                    <LogoutContent data={activities || []}/>
                                    <MobileLogout data={activities || []}/>
                                </div>
                                ||
                                <ZeroActivities
                                    data={zeroActivityDetails || []}
                                    zeroActivityIndex={this.props.zeroActivityIndex}
                                    handleNextIndex={this.props.handleNextIndex}
                                />
                            }
                            </Loader>
                        </div>
                    </div>
                </IntlProvider>
            );
    }
}

export default Logout;
