import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {auth, sendPasswordResetEmail} from "./firebase";
import "./Reset.module.css";

function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading, error, navigate]);
    return (
        <div className="container">
            <h4 className='text-center my-5'>Reset password</h4>
            <div className='row row-cols-1'>
                <div className="col-md-6 mx-auto">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control auth"
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail Address"
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => sendPasswordResetEmail(email)}
                    >
                        Send password reset email
                    </button>
                    <div>
                        Don't have an account? <Link to="/register">Register</Link> now.
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Reset;