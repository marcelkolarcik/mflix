import {createContext, useState} from "react";

const BookingContext = createContext({
    numOfBookings: 0,
    bookings: [],
    addBooking: (booking) => {
    },
})

export function BookingContextProvider(props) {

    const [bookings, setBooking] = useState([]);

    function addBookingHandler(booking) {

        setBooking((prevBookings) => {
            return prevBookings.concat(booking);
        })

    }

    const context = {
        numOfBookings: bookings.length,
        bookings: bookings,
        addBooking: addBookingHandler
    }

    return (
        <BookingContext.Provider value={context}>
            {props.children}
        </BookingContext.Provider>
    );

}

export default BookingContext;