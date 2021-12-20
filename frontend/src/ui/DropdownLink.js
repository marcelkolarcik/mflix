import {NavLink} from "react-router-dom";
import React from "react";

export default function DropdownLink(props) {
    function closeDrop() {
        document.querySelector('.show').classList.remove('show')


    }

    return (
        <NavLink

            onClick={closeDrop}
            className={props.class}
            to={`/search/${props.field}/${props.searchTerm}`}>
            {props.text}
        </NavLink>
    );
}