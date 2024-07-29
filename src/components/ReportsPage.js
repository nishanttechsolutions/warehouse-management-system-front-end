import { Container, FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material"
import axios from "axios"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import DataTable from "./DataTable";

const reportOptions = [
    { api: 'inward-items', text: 'Inward', id: 1 },
    { api: 'parts', text: 'Parts', id: 2 },
    { api: 'locations', text: 'Locations', id: 3 },
    { api: 'putaway', text: 'Putaway', id: 4 },
    { api: 'picklist', text: 'Picklist', id: 5 }
]


const ReportsPage = () => {

    const { authToken } = useContext(AuthContext);
    const [reportsData, setReportsData] = useState({});
    const onReportOptionSelected = (e) => {
        const option = JSON.parse(e.target.value)
        fetchReportData(option)
    }


    const fetchReportData = async (reportOption) => {
        try {
            const res = await axios(`http://localhost:5000/api/${reportOption.api}/reports`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            setReportsData({ ...res.data })
        } catch (error) {

        }
    }

    const { columns, rows } = reportsData
    return (
        <Paper style={{ padding: 10 }}>
            <FormControl fullWidth margin="normal">

                <InputLabel>Select Report</InputLabel>
                <Select onChange={onReportOptionSelected}>
                    {reportOptions.map((reportOption) => {
                        const { id, text } = reportOption;
                        return <MenuItem key={id} value={JSON.stringify(reportOption)}>
                            {text}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>

            <DataTable
                columns={columns || []}
                rows={rows || []}

            />
        </Paper>

    )

}

export default ReportsPage