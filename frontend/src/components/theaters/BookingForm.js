import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from './BookingForm.module.css';
import Days from "./BookingForm/Days";
import Times from "./BookingForm/Times";
import BookingConfirmed from "./BookingForm/BookingConfirmed";
import BookingInProcess from "./BookingForm/BookingInProcess";

export default function BookingForm(props) {

    const movie = props.movie;
    const [show, setShow] = useState(false);
    const [time, setTime] = useState('')
    const [day, setDay] = useState('')
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [adultPrice, setAdultPrice] = useState(0);
    const [childrenPrice, setChildrenPrice] = useState(0);
    const [isBooking, setIsBooking] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [bookingError, setBookingError] = useState(false);
    const pricePerAdult = 15;
    const pricePerChild = 10;
    const booking = {
        totalPrice: adultPrice + childrenPrice,
        day: day,
        time: time,
        adults: adults,
        children: children,
        title: movie.title,
        movieId: movie.id,
        poster: movie.poster,
        theater: props.theater,
    }


    function bookNow() {

        if (booking.totalPrice === 0 || booking.day === '' || booking.time === '') {
            setBookingError(true);
        } else {
            setBookingError(false)
            setIsBooking(true)

            function setIsBookedHandler() {
                setIsBooked(true);
                setIsBooking(false);
            }

            setTimeout(setIsBookedHandler, 5000)
        }


    }

    function setAdultPriceHandler(e) {

        setAdults((prev) => (
            prev + parseInt(e.target.dataset.action) < 0 ? 0 : prev + parseInt(e.target.dataset.action)
        ))
        setAdultPrice((prev) => (
            prev + parseInt(e.target.dataset.action) * pricePerAdult < 0 ? 0 : prev + parseInt(e.target.dataset.action) * pricePerAdult
        ))


    }

    function setChildrenPriceHandler(e) {
        setChildren((prev) => (
            prev + parseInt(e.target.dataset.action) < 0 ? 0 : prev + parseInt(e.target.dataset.action)
        ))
        setChildrenPrice((prev) => (
            prev + parseInt(e.target.dataset.action) * pricePerChild < 0 ? 0 : prev + parseInt(e.target.dataset.action) * pricePerChild
        ))


    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const btnClass = 'ms-3 px-3 btn btn-warning text-dark p-0 m-0 mb-2 pointer rounded-0'

    return (<>
        <Button className={btnClass}
                variant="warning" onClick={handleShow}>
            Book Now
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{movie.title} </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                {(!isBooking && !isBooked) &&
                <>
                    <p className={'text-center small'}>Adults : ({pricePerAdult}$/person), Children:
                        ({pricePerChild}$/child)</p>
                    {bookingError && <p className={'text-danger small text-center'}>Please select all fields</p>}

                    <div className={' d-flex justify-content-around align-items-center mb-2'}>
                        <Days day={day} setDay={setDay}/>
                        <Times time={time} setTime={setTime}/>

                    </div>

                    <div className={' d-flex justify-content-around align-items-center'}>
                        <div className={'mx-2 text-center form-control'}>
                            <p>Adults {adults}</p>
                            <div>
                                <button className={'btn btn-sm me-3 ' + classes.add_btn}
                                        onClick={setAdultPriceHandler}
                                        data-action={-1}
                                >-
                                </button>
                                <button onClick={setAdultPriceHandler}
                                        data-action={1}
                                        className={'btn btn-sm me-3 ' + classes.add_btn}>+
                                </button>
                                <span className={'float-end'}>${adultPrice}</span>
                            </div>
                        </div>
                        <div className={'mx-2 text-center form-control'}>
                            <p>Children {children}</p>
                            <div>
                                <button className={'btn btn-sm me-3 ' + classes.add_btn}
                                        onClick={setChildrenPriceHandler}
                                        data-action={-1}
                                >-
                                </button>
                                <button className={'btn btn-sm me-3 ' + classes.add_btn}
                                        onClick={setChildrenPriceHandler}
                                        data-action={1}>+
                                </button>
                                <span className={'float-end'}>${childrenPrice}</span>
                            </div>
                        </div>
                    </div>

                    <p className={'text-end'}>Total: <span>${adultPrice + childrenPrice} </span></p>
                </>}
                {isBooking && <BookingInProcess/>}
                {(isBooked) && <BookingConfirmed booking={booking}/>}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                        className={'ms-3 px-3 btn bg-transparent border-0 text-dark py-1 m-0 mb-2 pointer rounded-0'}
                        onClick={handleClose}>
                    Close
                </Button>
                {!isBooked ? <Button variant="warning" className={btnClass} onClick={bookNow}>
                    Book Now
                </Button> : ''}

            </Modal.Footer>

        </Modal>
    </>);
}