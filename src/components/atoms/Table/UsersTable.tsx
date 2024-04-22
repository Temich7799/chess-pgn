import useTableColumns from "@/hooks/useTableColumns";
import Table from "./Table"
import { TFunction } from "i18next";

type UsersTableProps = {
    data: any[];
    t: TFunction<any, any>;
}

const UsersTable = ({ data, t }: UsersTableProps) => {

    const filteredData = data.map((user: any, index) => {
        const data = user;
        data.id = index;
        data.email = undefined;
        const birthday = undefined;
        return data;
    }) //todo

    const columns = useTableColumns(filteredData, t);

    return (
        <Table columns={columns} data={data} />
    )
}

export default UsersTable;