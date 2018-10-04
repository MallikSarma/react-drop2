import React from "react";
import { Modal } from "react-bootstrap";
import * as css from "./SecurityPhrase.scss";
import PasswordComponent from "./PasswordComponent";
import UserCheck from "./UserCheck";

export const SecurityPhrase = ({
    userDetails,
    confirmUser,
    password,
    updatePassword,
    incorrectPassword,
    userConfirmed,
    asyncAuthenticateUser,
    forgotCredentialsFlowState,
    accountInactive,
    resetError,
    errorName
}) => (
	<div>
    {
        userDetails &&
            <Modal show={!!userDetails} className={css.container}>
                <Modal.Header>
                    <div className={css.avatar_wrapper}>
                        <img src="m2u/static/img/profile_pic.svg" className="img-responsive img-circle" alt="profile picture" />
                        <span className={css.close} onClick={()=>{confirmUser(false);}} />
                    </div>
                </Modal.Header>
                { !userConfirmed &&
                    <UserCheck userDetails={userDetails} confirmUser={confirmUser}/>
                }
                { userConfirmed &&  !accountInactive &&
                    <PasswordComponent
                        incorrectPassword={incorrectPassword}
                        userDetails={userDetails}
                        password={password}
                        asyncAuthenticateUser={asyncAuthenticateUser}
                        updatePassword={updatePassword}
                        forgotCredentialsFlowState={forgotCredentialsFlowState}
                        errorName={errorName}
                        resetError={resetError}
                    />
                }
            </Modal>
    }
    </div>
);
export default SecurityPhrase;
