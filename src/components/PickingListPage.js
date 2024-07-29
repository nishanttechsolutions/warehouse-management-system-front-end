import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import PartsModal from './PartsModal';
import { AuthContext } from '../context/AuthContext';


const PickingListPage = (props) => {
    const [pickings, setPickings] = useState([])
    const [selectedPicklist, setSelectedPicklist] = useState(null);
    const { authToken } = useContext(AuthContext);

    const fetchPickings = async () => {
        try {
            const pickingsRes = await axios('http://localhost:5000/api/picklist', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setPickings(pickingsRes.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchPickings();
    }, [])


    const onRowSelect = (picklist) => {
        setSelectedPicklist(picklist)
    }


    const onPickListUpdate = async (parts) => {
        try {
            const isComplete = selectedPicklist.parts.length === parts.length
            const res = await axios.put(`http://localhost:5000/api/picklist/${selectedPicklist._id}`, { parts, isComplete }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            setSelectedPicklist(null)
            fetchPickings();
        } catch (error) {

        }
    }

    return <Paper style={{ padding: 16 }}>
        {selectedPicklist && <PartsModal
            onPickListUpdate={onPickListUpdate}
            onClose={() => setSelectedPicklist(null)} pickList={selectedPicklist} />}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Name </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {pickings.map((row) => (
                    <TableRow
                        style={{ cursor: 'pointer' }}
                        onClick={() => onRowSelect(row)}
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>

                    </TableRow>

                ))}
            </TableBody>
        </Table>
    </Paper>

}


export default PickingListPage