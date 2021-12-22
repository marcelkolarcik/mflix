import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../auth/firebase";
import {Link} from 'react-router-dom';

export default function LandingTitle() {
    const [user] = useAuthState(auth);


    return (
        <>
            <h1 className={'fw-light'}>Find Movies & TV Shows. <br/>
            Explore Theatres Near You. <br/>
            Book The Tickets Online.</h1>

            {!user && <Link
                className='login_btn btn btn-outline-info mx-2 nav_link_color small mb-2 mb-sm-0'
                to={'/login?next=/'}>
                Sign In to comment
            </Link>}
        </>
    );
}