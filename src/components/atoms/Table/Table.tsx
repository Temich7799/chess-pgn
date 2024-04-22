'use client'

import React from 'react';
import { Column, TableOptions, useTable } from 'react-table';
import styles from './table.module.scss';

interface TableProps<Data extends object> {
    columns: Column<Data>[];
    data: Data[];
}

const Table = <Data extends object>({ columns, data }: TableProps<Data>) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable<Data>(
        {
            columns,
            data
        } as TableOptions<Data>
    );

    return (
        <table {...getTableProps()} className={styles.table}>
            <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map(column => (
                            <th{...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell, index) => (
                                <td {...cell.getCellProps()} key={index} >{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
