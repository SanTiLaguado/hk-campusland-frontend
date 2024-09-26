import React from 'react';
import { Calendar } from 'antd';
import './Calendar.css';

const CalendarComp = () => {
    const onSelect = (date) => {
        console.log(date.format('YYYY-MM-DD'));
    };

    return (
        <section className="main" id="calendar">
            <h1>Calendario</h1>
            <div className="calendar-container">
                <Calendar onSelect={onSelect} fullscreen={true} />
            </div>
        </section>
    );
};

export default CalendarComp;
