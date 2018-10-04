import React from "react";
import Sidebar from "react-sidebar";
import SidebarContent from "../SideBarLeft";
import { injectIntl, intlShape,  } from "react-intl";
export const LeftSideBarContainer = ({show, lastLogin, sidebarPosition, onClose, currentPage, handleNavigation, toggleSearchModal, leftMenuButtonClick}) => {

    return (
        <div className="hidden-lg">
            <Sidebar sidebar={<SidebarContent lastLogin={lastLogin} mobile leftMenuButtonClick={leftMenuButtonClick} toggleSearchModal={toggleSearchModal} currentPage={currentPage} handleNavigation={handleNavigation}/>}
                    open={show}
                    pullLeft
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

LeftSideBarContainer.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(LeftSideBarContainer);