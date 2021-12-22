import {NavLink} from "react-router-dom";
import React from "react";

export function closeDrop() {

    /*on large screen there is no dropdown for some links,
    * so it would create an error and page reload on click
    *
    * there might be another solution with media queries...*/
    try {
        document.querySelector('.show.dropdown-menu').classList.remove('show');
    } catch (e) {

    }
    try {
        document.querySelector('.show').classList.remove('show');
    } catch (e) {

    }


}

export default function DropdownLink(props) {

    return (
        <NavLink

            onClick={closeDrop}
            className={props.class + ' ps-2'}
            to={`/search/${props.field}/${props.searchTerm}`}>
            {props.text}
        </NavLink>
    );
}