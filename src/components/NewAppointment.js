import React, {useState, useRef, useEffect} from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {v4 as uuid} from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'

import {Button, Form, FormGroup} from 'reactstrap';
const times = ['08:00', '08:30', '09:00','09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];

const NewAppointment = ({appointmentList, addAppointment}) => {
    const [type, setType] = useState('kids');
    const [date, setDate] = useState('');
    const [time, setTime] = useState(null);
    const [error, setError] = useState('');
    const [times2, setTimes2] = useState(times.slice());
    useEffect(() => {
        const now = new Date();
        let times2 = times.slice();
        if (date) {
            let timeRes = times.slice();
            if (parseDate(now) === parseDate(date)) {
                timeRes = times.filter(t => parseInt(t.substr(0, 2)) > now.getHours());
            }
            const occupied = appointmentList[parseDate(date)] || [];
            setTimes2(timeRes);
        } else {
            setTimes2(times.slice());
        }
    }, [date]);

    useEffect(() => {
        if (error && type && date && time) {
            setError('');
        }
    }, [type, date, time]);

    const parseDate = (dateToParse) => {
        return `${dateToParse.getDate()}/${dateToParse.getMonth() + 1}/${dateToParse.getFullYear()}`;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!type || !date || !time) {
            setError('נא לבחור את כל השדות');
            return;
        }
        setError('');
        const newAppointment = {
            type,
            date: parseDate(date),
            time
        }
        addAppointment(newAppointment);
    }
    return (
        <div className='appointment mt-2'>
            <div>
                <div className="row" >
                    <div className="col-sm  pb-3 pt-3 fs-3  font-size: 1rem;" >
                        הזמנת תור חדש
                    </div >
                </div >
            </div >
            <Form className="mt-1">
                <FormGroup>
                    <div className="" >
                        <div className="row" >
                            <div className="col-sm text-end" >
                                <select id="appointmentType" name="סוג תור"
                                        onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="kids">תספורת ילדים</option>
                                    <option value="women">תספורת נשים</option>
                                    <option value="men">תספורת גברים</option>
                                </select>
                            </div >
                            <div className="col-sm text-start" >
                                :סוג תור
                            </div >
                        </div >
                    </div >
                </FormGroup>
                <FormGroup>
                    <div>
                        <div className="row" >
                            <div className="col-sm text-end" >
                                <DatePicker
                                    minDate={new Date()}
                                    onChange={setDate}
                                    value={date}
                                    format="dd/MM/y"
                                />
                            </div >
                            <div className="col-sm text-start" >
                                :תאריך
                            </div >
                        </div >
                    </div >
                </FormGroup>
                <FormGroup>
                    <div>
                        <div className="row" >
                            <div className="col-sm text-end" >
                                <div className="col-sm text-end" >
                                    <select id="time" name="time"
                                            onChange={(e) => setTime(e.target.value)}
                                    >
                                        <option value={null}>{date ? 'בחר שעה' : 'יש לבחור תאריך'}</option>
                                        {date && times2.map((time) => {
                                            return <option value={time} key={time}>{time}</option>;
                                        })}
                                    </select>
                                </div >
                            </div >
                            <div className="col-sm text-start" >
                                :שעה
                            </div >
                        </div >
                    </div >
                </FormGroup>
                <div className="d-block justify-content-center pb-5">
                    <Button color="primary" type="submit" onClick={event => onSubmit(event)} >אישור</Button>
                    <div className="text-danger">{error}</div>
                </div>
            </Form>
        </div>
    )
}

export default NewAppointment;

