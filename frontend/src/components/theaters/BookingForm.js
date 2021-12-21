import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from './BookingForm.module.css';
import Days from "./BookingForm/Days";
import Times from "./BookingForm/Times";
import BookingConfirmed from "./BookingForm/BookingConfirmed";
import BookingInProcess from "./BookingForm/BookingInProcess";
import FormError, {requiredFields} from "./BookingForm/FormError";

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
    const [bookingName, setBookingName] = useState('');
    const [bookingEmail, setBookingEmail] = useState('');
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
        bookingName: bookingName,
        bookingEmail: bookingEmail
    }


    function bookNow() {
        let _error = false;
        requiredFields.map(field => {
            if(!booking[field])
            {
                _error = true;

            }
        })

        if (_error) {
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
                    <p className={'text-center small fw-bold fst-italic'}>Adults : ({pricePerAdult}$/person), Children (under 12):
                        ({pricePerChild}$/child)</p>
                    {bookingError && <FormError booking={booking}/>}

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
                    <div className={'px-2'}>
                        <div className="form-floating">
                            <input type="text" className={'form-control booking'} name={'bookingName'}
                                   id={'bookingName'}
                                   onChange={(e) => setBookingName(e.target.value)}/>
                            <label htmlFor="bookingName">Full name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className={'form-control booking'} name={'bookingEmail'}
                                   id={'bookingEmail'}
                                   onChange={(e) => e.target.value.includes('@') ? setBookingEmail(e.target.value) : null}/>
                            <label htmlFor="bookingEmail">Email</label>
                        </div>
                    </div>

                <p className="x-small text-center fw-bold fst-italic">This is a demo app. You can enter any name or email containing "@".</p>
                </>}
                {isBooking && <BookingInProcess/>}
                {(isBooked) && <BookingConfirmed booking={booking}/>}

            </Modal.Body>
            <Modal.Footer>
                {!isBooking ? <Button variant="secondary"
                                      className={'ms-3 px-3 btn bg-transparent border-0 text-dark py-1 m-0 mb-2 pointer rounded-0'}
                                      onClick={handleClose}>
                    Close
                </Button> : ''}

                {!isBooked && !isBooking ? <Button variant="warning" className={btnClass} onClick={bookNow}>
                    Book Now
                </Button> : ''}

            </Modal.Footer>

        </Modal>
    </>);
}