import React from "react";
import * as css from "./GeneralModal.scss";

const GeneralModal = ({className, children}) => {
    return (
        <div className={css.container}>
            <div className={`${css.modal} ${className}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
GeneralModal.Header = ({children, closeButton, onHide}) => {
    return (
            <div className="modal-header">
            {   closeButton &&
                <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={onHide}
                ><span aria-hidden="true">×</span>
                </button>
            }
                {children}
            </div>
    );
};
GeneralModal.Body = ({children, className}) => {
    return (
            <div className={`${className} modal-body`}>
                {children}
            </div>
    );
};
GeneralModal.Footer = ({children}) => {
    return (
            <div className="modal-footer">
                {children}
            </div>
    );
};
export default GeneralModal;