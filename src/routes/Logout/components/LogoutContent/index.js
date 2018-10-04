import React from "react";
import * as css from "./LogoutContent.scss";
import { Button } from "react-bootstrap";
import { injectIntl, defineMessages, intlShape } from "react-intl";
import { Table } from "reactabular";
const defaultMessages = defineMessages({
    logoutPrompt: {
        id: "app.logout.prompt",
        defaultMessage: "You are now logged out! Thank you for using Maybank2u."
    },
    date:{
        id: "app.login.date",
        defaultMessage: "DATE"
    },
    activityDetails:{
        id: "app.logout.activityDetails",
        defaultMessage: "ACTIVITY DETAILS"
    },
    amount:{
        id: "app.logout.amount",
        defaultMessage: "AMOUNT"
    },
    statusAndRef: {
        id: "app.logout.statusAndRef",
        defaultMessage: "STATUS & REFERENCE"
    },
    transferFrom: {
        id: "app.logout.transferFrom",
        defaultMessage: "Transfer from"
    },
    transferTo: {
        id: "app.logout.transferTo",
        defaultMessage: "Transfer to"
    },
    addNewFavorite: {
        id: "app.logout.addNewFavorite",
        defaultMessage: "Add New Favorite"
    },
    print: {
        id: "app.logout.print",
        defaultMessage: "Print"
    }
});

export const LogoutContent = ({intl, data}) => {
    const { formatMessage, formatNumber } = intl;
    let cols = [
      {
        property: "date",
        header: {
          label: formatMessage(defaultMessages.date),
          props:{
            className: css.firstCol
          }
        }
      },
      {
        property: "activityDetails",
        header: {
          label: formatMessage(defaultMessages.activityDetails),
        }
      },
      {
        property: "amount",
        header: {
          label: formatMessage(defaultMessages.amount),
        }
      },
      {
        property: "statusAndRef",
        header: {
          label: formatMessage(defaultMessages.statusAndRef),
          props:{
            className: css.lastCol
          }
        }
      }
    ];

    function getDateCell(dateContent) {
        return (<div className={css.date}>
                    <p>{dateContent.date}</p>
                    <p className={css.time}>{dateContent.time}</p>
                </div>);
    }
    function getStatusCell(statusContent) {
        return (<div className="row">
                    <div className="col-md-2">
                    { statusContent.success === true  &&
                        <div className={css.tick}>
                            <img className="img-responsive"
                                src="m2u/static/icons/success_green.svg"
                            />
                        </div>
                    }
                    { statusContent.success === false &&
                        <div className={css.cross}>
                            <img className="img-responsive"
                                src="m2u/static/icons/close_red.svg"
                            />
                        </div>
                    }
                    </div>
                    <div className="col-md-10">
                    { statusContent.success === true &&
                        <p className={css.success}>{statusContent.successMessage}</p>
                    }
                    { statusContent.success === false &&
                        <p className={css.failure}>{statusContent.successMessage}</p>
                    }
                        <p className={css.reference}>{statusContent.referenceNumber}</p>
                    </div>
                </div>);
    }
    const decimalDigits = {minimumFractionDigits:2,maximumFractionDigits:2};
    function getDetailsCell(activityDetails) {
        return (<div className={css.activityDetails}>
                    {
                        activityDetails.from &&
                            <div>
                                <div className={css.from}>
                                    <span className={css.muted}>{formatMessage(defaultMessages.transferFrom)} </span>
                                    <span>{activityDetails.from.accountName} </span>
                                    <span className={css.muted}>{activityDetails.from.accountNumber}</span>
                                </div>
                                <div className={css.to}>
                                    <span className={css.muted}>{formatMessage(defaultMessages.transferTo)} </span>
                                    <span>{activityDetails.to.accountName} </span>
                                    <span className={css.muted}>{activityDetails.to.accountNumber}</span>
                                </div>
                            </div>
                    }
                    {
                        activityDetails.addFavorite &&
                        <div className={css.to}>
                            <span className={css.muted}>{formatMessage(defaultMessages.addNewFavorite)} </span>
                            <span>{activityDetails.addFavorite.accountName} </span>
                            <span className={css.muted}>{activityDetails.addFavorite.accountNumber} </span>
                        </div>
                    }
                    {
                        activityDetails.timeStamp &&
                        <div>
                            <span>{activityDetails.timeStamp.details} </span>
                            <span>{activityDetails.timeStamp.dateTime} </span>
                        </div>
                    }
                </div>);
    }

    function getRowContent() {
        return data.map((row,index)=>{
            return {
                key: index,
                date: getDateCell(row),
                activityDetails: getDetailsCell(row.details),
                amount: `${row.currency} ${formatNumber(row.amount, decimalDigits)}`,
                statusAndRef: getStatusCell(row.status)
            };
        });
    }

    const rowContent = getRowContent();
    return (
        <div className={` ${css.printView} hidden-sm hidden-xs ${css.container}`}>
            <div className={css.prompt}>
                <div className="row">
                    <div className="col-md-2">
                        <div className={css.lock}>
                            <img
                                src="m2u/static/icons/logout_circled.svg"
                            />
                        </div>
                    </div>
                    <div className={`col-md-10 ${css.summaryText}`}>
                        <span>{formatMessage(defaultMessages.logoutPrompt)}</span>
                    </div>
                </div>
            </div>
            <div className={css.table}>
                <Table.Provider className="table" columns={cols}>
                    <Table.Header className={css.tableHead}/>
                    <Table.Body rows={rowContent} rowKey="key" className={css.tableBody} />
                </Table.Provider>
                <div className={`${css.buttonRow} ${css.noPrint}`}>
                    <Button className="printButton" onClick={window.print}>{formatMessage(defaultMessages.print)}<span><img src="m2u/static/icons/download.svg"/></span></Button>
                </div>
            </div>
        </div>
        );
};
LogoutContent.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(LogoutContent);
