import React from "react";
import TheaterInfo from "../theaters/TheaterInfo";

export default function MyBookings(props) {
    const bookings = props.bookings;

    return (


        bookings.map((booking, idx) =>
            (
                <div className={'col-12 small border shadow mb-3 p-2'} key={idx}>
                    <div className="row">
                        <div className="col-2 "><img className={'img-thumbnail'} src={booking.poster} alt=""/></div>
                        <div className="col">
                            <div className="row">
                                <div className="col-md-7">
                                   <p className="p-0 m-0 fw-bold fst-italic">Title: {booking.title}</p>
                                     <p className="p-0 m-0 fw-bold fst-italic">{booking.day} at {booking.time}</p>
                                    <hr/>
                                     <p className="p-0 m-0 ">Booked by: {booking.bookingName} | {booking.bookingEmail}</p>
                                     <p className="p-0 m-0 ">Adults: {booking.adults}</p>
                                     <p className="p-0 m-0 ">Children: {booking.children}</p>

                                     <p className="p-0 m-0 ">Price: ${booking.totalPrice}</p>
                                </div>
                                <div className="col-md-5 ">
                                   <p>Address</p>
                                    <TheaterInfo theater={booking.theater}/>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            ))


    );
}