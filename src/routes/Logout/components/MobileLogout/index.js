import React from "react";
import * as css from "./MobileLogout.scss";
import { injectIntl, defineMessages, intlShape } from "react-intl";
import { Table } from "reactabular";
const defaultMessages = defineMessages({
    details:{
        id: "app.logout.details",
        defaultMessage: "DETAILS"
    },
    status: {
        id: "app.logout.status",
        defaultMessage: "STATUS"
    }
});

export const MobileLogout = ({intl, data}) => {
    const { formatMessage, formatNumber } = intl;
    let cols = [
      {
        property: "activityDetails",
        header: {
          label: formatMessage(defaultMessages.details),
            props:{
            className: css.firstCol
          }
        }
      },
      {
        property: "statusAndRef",
        header: {
          label: formatMessage(defaultMessages.status),
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
                    <div className={`col-md-12 ${css.statusAndRef}`}>
                    { statusContent.success === true &&
                        <p className={css.success}>{statusContent.successMessage}</p>
                    }
                    { statusContent.success === false &&
                        <p className={css.failure}>{statusContent.successMessage}</p>
                    }
                        <p>{statusContent.referenceNumber}</p>
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
                                    <p className={css.muted}>{formatMessage({id: "app.logout.transferFrom"})} </p>
                                    <p>{activityDetails.from.accountName} </p>
                                    <p className={css.muted}>{activityDetails.from.accountNumber}</p>
                                </div>
                                <div className={css.to}>
                                    <p className={css.muted}>{formatMessage({id: "app.logout.transferTo"})} </p>
                                    <p>{activityDetails.to.accountName} </p>
                                    <p className={css.muted}>{activityDetails.to.accountNumber}</p>
                                </div>
                            </div>
                    }
                    {
                        activityDetails.addFavorite &&
                        <div className={css.to}>
                            <p className={css.muted}>{formatMessage({id: "app.logout.addNewFavorite"})} </p>
                            <p>{activityDetails.addFavorite.accountName} </p>
                            <p className={css.muted}>{activityDetails.addFavorite.accountNumber} </p>
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
                activityDetails: getDetailsCell(row.details),
                statusAndRef: <div>
                                {getStatusCell(row.status)}
                                {getDateCell(row)}
                                {`${row.currency} ${formatNumber(row.amount, decimalDigits)}`}
                              </div>
            };
        });
    }

    const rowContent = getRowContent();
    return (
        <div className={` ${css.noPrint} hidden-md hidden-lg ${css.container}`}>
            <div className={css.prompt}>
                <div className="row">
                    <div className="col-md-12">
                        <div className={css.lock}>
                            <img
                                src="m2u/static/icons/logout_circled.svg"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {formatMessage({id: "app.logout.prompt"})}
                    </div>
                </div>
            </div>
            <div className={css.table}>
            <Table.Provider className="table" columns={cols}>
                <Table.Header className={css.tableHead}/>
                <Table.Body rows={rowContent} rowKey="key" className={css.tableBody} />
            </Table.Provider>
            </div>
        </div>
        );
};
MobileLogout.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(MobileLogout);
