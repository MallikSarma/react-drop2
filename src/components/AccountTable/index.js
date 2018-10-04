import React from "react";
import * as css from "./AccountTable.scss";
import classnames from "classnames";
import { injectIntl, intlShape } from "react-intl";
import { Table } from "reactabular";

export const AccountTable = ({intl,loans,data,getRender,tableHeader,tableFooter,cols, tableContainerClass}) => {
    function getRowContent() {
        return data.map((row,index)=>{
            return {
                key: index,
                ...getRender(row, index),
            };
        });
    }
    const containerClass = classnames({
        [css.container] : true,
        [css.loans]: loans
    });
    const rowContent = getRowContent();
    return (
        <div className={containerClass}>
            {tableHeader}
            <div className={`${css.table} ${tableContainerClass}`}>
            <Table.Provider className="table" columns={cols}>
                <Table.Header className={css.tableHead}/>
                <Table.Body rows={rowContent} rowKey="key" className={css.tableBody} />
            </Table.Provider>
            </div>
            {tableFooter}
        </div>
        );
};
AccountTable.propTypes = {
    intl   : intlShape.isRequired
};

export default injectIntl(AccountTable);
