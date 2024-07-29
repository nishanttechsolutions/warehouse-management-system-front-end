import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"

const DataTable = (props) => {
    const { columns, rows } = props;

    return <Table>
        <TableHead>
            <TableRow>
                {columns.map((col) => {
                    const { title } = col;
                    return <TableCell>{title}</TableCell>
                })}
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((item) => {
                const tableKeys = Object.keys(item);
                return (
                    <TableRow>
                        {tableKeys.map((key, index) => {
                            return <TableCell>{item[columns[index].valueId]}</TableCell>
                        })}
                    </TableRow>
                )
            })}
        </TableBody>
    </Table>
}

export default DataTable