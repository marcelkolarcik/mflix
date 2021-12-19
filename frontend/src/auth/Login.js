import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth, signInWithEmailAndPassword, signInWithGoogle} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    let redirectTo = (new URLSearchParams(window.location.search)).get("next")

    useEffect(() => {

        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate(redirectTo || '/dashboard');
    }, [user, loading, error, navigate, redirectTo]);
    return (
        <div className="container">
            <h4 className='text-cLoginenter my-5'>Login</h4>
            <div className='row row-cols-1'>
                <div className="col-md-6 mx-auto">
                    <div className="form-floating">
                        <input
                            type="text"
                            className='form-control auth'
                            value={email}
                            id='email'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail Address"
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating my-3">
                        <input
                            type="password"
                            className='form-control auth'
                            value={password}
                            id='password'
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button
                        className='btn btn-outline-dark w-100 mb-3'
                        onClick={() => signInWithEmailAndPassword(email, password)}
                    >
                        Login
                    </button>
                    <button className='btn btn-primary w-100 mb-3' onClick={signInWithGoogle}>
                        Login with Google
                    </button>
                    <div>
                        <Link to="/reset">Forgot Password</Link>
                    </div>
                    <div>
                        Don't have an account? <Link to="/register">Register</Link> now.
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;