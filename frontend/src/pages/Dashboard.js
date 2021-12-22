import React, {useContext, useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import "./Dashboard.module.css";
import {auth, logout} from "../auth/firebase";
import BookingContext from "../store/booking-context";
import MyBookings from "../components/dashboard/MyBookings";
import {Link} from 'react-router-dom';

function Dashboard() {
    const bookingCtx = useContext(BookingContext);

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        fetch('/api/user/get/' + user?.uid + '/')
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            }).then(data => {
            setName(data.name)
            setEmail(data.email)

        }).catch(error => {
            alert('error: ' + error)
        })


    }, [user, loading, error, navigate]);

    return (
        <div className="dashboard">
            <div className="container">
                <h4 className='text-center'>Your Bookings</h4>

                <p className={'fst-italic small'}>Logged in as {user?.name || name} | {user?.email || email}
                    <span className="pointer float-end text-primary" onClick={logout}>
                        Logout
                    </span>
                </p>
                <div className="row">
                    {bookingCtx.numOfBookings > 0 ?
                        <MyBookings bookings={bookingCtx.bookings}/> :
                        <p className="lead text-center">No bookings yet!
                        <br/> <Link className={'text-decoration-none'} to={'/theaters'}>Visit theaters page</Link> to find theaters near you.</p>}
                </div>
            </div>
        </div>
    );

}

export default Dashboard;