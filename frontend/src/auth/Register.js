import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link, useNavigate} from "react-router-dom";
import {auth, registerWithEmailAndPassword, signInWithGoogle,} from "./firebase";
import "./Register.module.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        if (!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading, error, navigate]);
    return (
         <div className="container">
            <h4 className='text-center my-5'>Register</h4>
            <div className='row row-cols-1'>
                <div className="col-md-6 mx-auto">
                    <div className="form-floating mb-3">
                         <input
                    type="text"
                    id='name'
                    className="form-control auth"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
                        <label htmlFor="name">Name</label>
                    </div>
                <div className="form-floating mb-3">
                    <input
                    type="text"
                    className="form-control auth"
                    id={'email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                    type="password"
                    className="form-control auth"
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                    <label htmlFor="password">Password</label>
                </div>

                <button className="btn btn-outline-dark w-100 mb-3" onClick={register}>
                    Register
                </button>
                <button
                    className="btn btn-primary w-100 mb-3"
                    onClick={signInWithGoogle}
                >
                    Register with Google
                </button>
                <div>
                    Already have an account? <Link to="/login">Login</Link> now.
                </div>
                </div>

            </div>
        </div>
    );
}

export default Register;