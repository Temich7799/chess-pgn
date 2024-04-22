import useTableColumns from "@/hooks/useTableColumns";
import Table from "./Table"
import { TFunction } from "i18next";

type UsersTableProps = {
    data: any[];
    t: TFunction<any, any>;
}

const UsersTable = ({ data, t }: UsersTableProps) => {

    const columns = useTableColumns(data, t);

    return (
        <Table columns={columns} data={data} />
    )
}

export default UsersTable;