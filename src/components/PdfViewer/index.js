import React from "react";
import PDF from "react-pdf-js";
import { Button } from "react-bootstrap";
import * as css from "./PdfViewer.scss";
import RenderDesktopDropdown from "../RenderDesktopDropdown";
import RenderMobileDropdown from "../RenderMobileDropdown";
import classnames from "classnames";
import Modal from "../GeneralModal";
export const PdfViewer = ({intl, receiptUrl, accountTransactions, scaleValue, toggleScale, updatePDFpages, pdfPages,handlePDFUrl, viewStatementPdf, accountDetails, toggleViewStatementPdf}) => {
    function togglePDFScale(zoomIn) {
        if (scaleValue === 1 && !zoomIn){
            return;
        }
        toggleScale(zoomIn);
    }
    function getStatementDetails(){
        const list = accountTransactions.statementDetails.map((range,index)=>{
          return {
                   "display":<div className={css.selectedItem}>
                                <span>{range.label}</span>
                            </div>,
                   "mobileDisplay": range.label,
                   "valueToPass": range
                };
        });
        const currentTitle = viewStatementPdf.statementDetails.label;
        return {
            id: "statement_details_dropdown",
            title:  <div className={css.selectedItem}>
                        <span>{currentTitle}</span>
                    </div>,
            action: (range)=>{toggleViewStatementPdf(range);},
            list
        };
    }
    const modalBodyClasses = classnames({
        [css.pdfModalBody]: true,
        [css.initialScale]: scaleValue <= 1
    });
    return (
        <div className={css.container}>
            <Modal show className={css.modalContent}>
                <Modal.Body className={modalBodyClasses}>
                    <PDF
                        file={receiptUrl}
                        scale={scaleValue}
                        onDocumentComplete={updatePDFpages}
                        onPageComplete={()=>{}}
                        page={1}
                        loading={(<span>Loading ...</span>)}
                    />
                    {
                        pdfPages &&
                        Array.apply(null, Array(pdfPages - 1))
                        .map((v, i)=>
                            <PDF key={i}
                                page={i + 2}
                                file={receiptUrl}
                                scale={scaleValue}
                                onDocumentComplete={()=>{}}
                                onPageComplete={()=>{}}
                                loading={(<span>Loading ...</span>)}
                            />
                        )
                    }
                </Modal.Body>
            </Modal>
            <div className={`navbar navbar-inverse navbar-fixed-top ${css.pdfViewerHeader}`}>
                <div className={`col-lg-8 col-md-8 col-sm-7 col-xs-4  ${css.pdfViewerHeaderLeft}`}>
                    <a href={receiptUrl} target="_blank" download="statement.pdf"><img src="m2u/static/icons/download_pdf.svg"/></a>
                    <a onClick={togglePDFScale.bind(this, true)} ><img src="m2/static/icons/zoom_in.svg"/></a>
                    <a onClick={togglePDFScale.bind(this, false)} ><img src="m2u/static/icons/zoom_out.svg"/></a>
                </div>
                {
                    viewStatementPdf &&
                    <div className={`col-lg-3 col-md-3 col-sm-4 col-xs-6 ${css.headerPullRight}`}>
                        <span className="hidden-md hidden-lg hidden-sm">
                            <RenderMobileDropdown data={getStatementDetails()} containerClass={css.containerClass}/>
                        </span>
                        <span className={`hidden-xs ${css.selectWrapper}`}>
                            <RenderDesktopDropdown data={getStatementDetails()} containerClass={css.containerClass}/>
                        </span>
                    </div>
                    ||
                     <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6"/>
                }
                <div className="col-xs-1 col-lg-1 col-md-1">
                    <a onClick={handlePDFUrl.bind(this,null)} className={css.closeBtn}><img src="m2u/static/icons/close_white.svg"/></a>
                </div>
            </div>
        </div>);
};
export default PdfViewer;