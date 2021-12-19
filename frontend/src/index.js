import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "./ui/ScrollToTop";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <ScrollToTop/>
            <App/>
        </React.StrictMode>
    </BrowserRouter>

    ,
    document.getElementById('root')
);



