import { TFunction } from "i18next";
// import { useMemo } from "react";

export default function useTableColumns(columns: object | any, t: TFunction<any, any>) {
    return [
        { Header: t('email'), accessor: 'email' },
        { Header: t('name'), accessor: 'name' },
        { Header: t('birthday'), accessor: 'birthday' },
        { Header: t('city'), accessor: 'city' },
        { Header: t('language'), accessor: 'native_lang' },
        { Header: t('foreign'), accessor: 'foreign_lang' },
        { Header: t('another_foreign'), accessor: 'second_foreign_lang' },
    ];
}