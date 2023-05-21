import React from 'react'
import {List, ListItem, ListItemText, ListItemIcon, Typography, Switch} from '@material-ui/core'
import { AccessAlarm } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete'

import {Button} from 'reactstrap';

const Appointments = ({appointmentList, deleteAppointment, setView}) => {

    const sortedDate = Object.keys(appointmentList).sort();

    Object.keys(appointmentList)
    return (
        <div>
            {Object.keys(appointmentList).length === 0 ?
                <div className="appointment mt-2">
                    <h3 className='d-flex justify-content-center pt-5'>אין תורים</h3>
                    <div className="d-block justify-content-center pb-1">
                        <Button color="primary" onClick={() => setView(3)}>הזמן תור</Button>
                    </div>
                </div>
                :
                <List>
                    {Object.keys(appointmentList).sort().map((date) => {
                        let appPerDay = appointmentList[date].sort((a,b) => a.time.localeCompare(b.time));
                        return (
                            <div className="appointment mt-2" key={date}>
                                <h5 className='d-flex justify-content-center'>{date}</h5>
                                {appPerDay.map(item =>
                                    <ListItem key={item.time} >
                                        <ListItemIcon >
                                            <AccessAlarm />
                                        </ListItemIcon >
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    component="div"
                                                    className='listItem'
                                                    variant="body"
                                                    color="black"
                                                >
                                                    {item.time + ' ' + item.type}
                                                </Typography >
                                            }
                                        />
                                        <ListItemIcon >
                                            <DeleteIcon onClick={() => deleteAppointment(item)} />
                                        </ListItemIcon >
                                    </ListItem >
                                )}
                           </div>
                        );
                    })}
                </List>
            }
        </div>
    );
}

export default Appointments;
