import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemText, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

const PartsModal = (props) => {
    const { onClose, pickList, onPickListUpdate } = props
    const [checked, setChecked] = useState([]);
    const { parts } = pickList;
    const handleToggle = (obj) => {
        const partIndex = checked.findIndex((item) => item.part === obj.part);
        const newChecked = [...checked];
        if(partIndex===-1){
            newChecked.push(obj)
        }else{
            newChecked.splice(partIndex, 1);
        }
    

        setChecked(newChecked);
    };
    return (
        <Dialog open={true} onClose={onClose} fullScreen={true} style={{ margin: 100 }}>
            <DialogTitle>Select Parts</DialogTitle>
            <DialogContent style={{ padding: 0, width: '100%' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={20}> </TableCell>

                            <TableCell>Part </TableCell>
                            <TableCell>Location </TableCell>
                            <TableCell>Quantity </TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {parts.map((partItem) => {
                            const { part, location,quantity }=partItem;
                            return (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    key={part} style={{ cursor: 'pointer' }}
                                    onClick={()=>handleToggle(partItem)}
                                >
                                    <TableCell>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            checked={!!checked.find((i)=>i.part===part)}
                                        />
                                    </TableCell>
                                    <TableCell component="td" scope="row">
                                        {part}
                                    </TableCell>
                                    <TableCell component="td" scope="row">
                                        {location}
                                    </TableCell>
                                    <TableCell component="td" scope="row">
                                    {quantity}
                                    </TableCell>

                                </TableRow>
                            )
                        })}
                    </TableBody>



                </Table>
                {/* <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                    {parts.map(({ part,location }) =>
                    (<ListItem kaye={part}>

                        <ListItemButton role={undefined} dense onClick={()=>handleToggle(part)}>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                checked={checked.indexOf(part) !== -1}
                            />
                            <ListItemText id={part} primary={part} />
                            <ListItemText id={location} primary={location} />

                        </ListItemButton>

                    </ListItem>)
                    )}
                </List> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button color="primary" onClick={() => onPickListUpdate(checked)}>UPdate</Button>
            </DialogActions>

        </Dialog>
    )

}

export default PartsModal