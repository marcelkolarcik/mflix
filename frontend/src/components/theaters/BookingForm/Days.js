import React from "react";

export default function Days(props) {
    const day = props.day;

    return (
        <select className={'form-select mx-2'} name="days" id="days"
                onChange={(e) => props.setDay(e.target.value)}>
            <option defaultValue="select time">{day ? day : 'Select day'}</option>
            {Array.from({length: 30}).map((_, idx) => {
                let dt = new Date();
                dt.setTime(dt.getTime() + ((idx + 1) * 24 * 60 * 60 * 1000));
                dt.setHours(0, 0, 0, 0);

                let _day = dt.toDateString().split('00:00:00')[0]
                return <option key={idx} value={_day}>{_day}</option>

            })}
        </select>
    );
}