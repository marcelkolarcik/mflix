import TheaterInfo from "../TheaterInfo";
import React from "react";

export default function BookingConfirmed(props) {
    const booking = props.booking;
    return (
        <div>
            <div className={' text-center bg-warning p-2 mb-0'}>
                <p className="lead fw-bold">Booking Confirmed!</p>
                <p className={'small'}>
                    Thank you, {booking.bookingName}. <br/>
                    You would receive a confirmation email to: <br/> {booking.bookingEmail}
                </p>

            </div>
            <div className={'dark_bg text-light p-2 text-end border border-warning mt-0'}>
                <TheaterInfo theater={booking.theater}/>
            </div>

            <p className="small p-2 lighter_bg text-light border border-warning">


                Title: {booking.title} <br/>
                Adults: {booking.adults} <br/>
                Children: {booking.children} <br/>
                Total: ${booking.totalPrice} <br/>
                Day: {booking.day} <br/>
                Time: {booking.time}
            </p>
        </div>
    );
}