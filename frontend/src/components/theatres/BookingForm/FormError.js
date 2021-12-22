import React from "react";

export const requiredFields = ['totalPrice', 'day', 'time', 'adults', 'bookingName', 'bookingEmail']
export const messages = {
    'totalPrice': 'Select at least one adult.',
    'day': 'Select the day.',
    'time': 'Select the time.',
    'adults': 'Select least one adult.',
    'bookingName': 'Please, provide your name.',
    'bookingEmail': 'Please provide your email.'
}
export default function FormError(props) {
    const booking = props.booking;

    const errors = requiredFields.map((field, idx) =>
        (
            !booking[field] ? <p key={idx} className={'text-danger p-0 m-0 x-small'}>{messages[field]}</p> : ''
        ))
    return (errors);
}