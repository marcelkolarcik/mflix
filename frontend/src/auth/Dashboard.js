import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";
import "./Dashboard.module.css";
import {auth, logout} from "./firebase";

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
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
                <h4 className='text-center'>Your Dashboard</h4>
                Logged in as
                <div>{user?.name || name} </div>
                <div>{user?.email || email} </div>
                <button className="btn btn-outline-danger" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );

}

export default Dashboard;