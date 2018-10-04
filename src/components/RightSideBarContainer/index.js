import React from "react";
import Sidebar from "react-sidebar";
import SidebarContent from "../SideBar";
import { injectIntl, intlShape,  } from "react-intl";

export const RightSideBarContainer = ({show, toggleSearchModal, currentPage, personalMessage, quickPayOptions, userProfile, wealthDetails, sidebarPosition, navigateToDifferentPages, onClose, sideBarDetails, casaLite, readMessage,getAsyncQuickPayDetails, currentIndex, quickPaySummary}) => {
    return (
      <div>
        {
            show && currentPage !==  "pay&Transfer" &&
            <div className="searchButton" style={{zIndex: 999999999}}>
                <span onClick={()=>{toggleSearchModal(); onClose();}}>
                    <img src="m2u/static/icons/search.svg" />
                </span>
            </div>
        }
        <Sidebar sidebar={
                        <SidebarContent
                            wealthDetails={wealthDetails}
                            navigateToDifferentPages={navigateToDifferentPages}
                            mobile
                            casaLite={casaLite}
                            sideBarDetails={sideBarDetails}
                            currentIndex={currentIndex}
                            readMessage={readMessage}
                            getAsyncQuickPayDetails={getAsyncQuickPayDetails}
                            quickPaySummary={quickPaySummary}
                            userProfile={userProfile}
                            personalMessage={personalMessage}
                            quickPayOptions={quickPayOptions}
                        />}
                open={show}
                pullRight
                touch={false}
                transitions={false}
                onSetOpen={onClose}
                styles={{root:{
                    position: "initial",
                    height:"100%",
                },
                overlay: {
                    zIndex: 9999999,
                    position: "fixed",
                },
                sidebar:{
                    zIndex: 99999999,
                    position: sidebarPosition || "absolute",
                    height:"100%",
                    overflowY: "initial",
                },
                content: {
                    height: "100%",
                    overflowY: "initial",
                  }}}
        ><div/>
        </Sidebar>
      </div>
    );
};

RightSideBarContainer.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(RightSideBarContainer);