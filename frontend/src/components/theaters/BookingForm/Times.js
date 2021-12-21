import React from "react";

export default function Times(props) {
    const time = props.time;
    return (<select name="time" id="time"
                    className={'form-select mx-2'}
                    onChange={(e) => props.setTime(e.target.value)}>

        <option defaultValue="select">{time ? time : 'Select time'}</option>
        {Array.from({length: 24}).map((_, idx) =>
            (
                (idx % 2 === 0 && idx !== 0) ?

                    <option key={idx}
                            value={(idx + '.00') + (idx > 12 ? ' pm' : ' am')}>
                        {idx}.00 {idx > 12 ? ' pm' : ' am'}
                    </option>
                    : ''

            )
        )
        }
    </select>);
}