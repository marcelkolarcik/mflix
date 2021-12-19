import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../auth/firebase";
import {Link} from 'react-router-dom';

export default function HeroTitle() {
    const [user] = useAuthState(auth);


    return (
        <>
            <h1 className={'fw-light'}>Find Movies & TV Shows</h1>
            <h4 className="text-light">
                Browse and Read all about your favorite movies & series for free!
            </h4>
            {!user && <Link
                className='login_btn btn btn-outline-info mx-2 nav_link_color small mb-2 mb-sm-0'
                to={'/login?next=/'}>
                Sign In to comment
            </Link>}
        </>
    );
}