import React from "react";
import ScrollerNav from "./ScrollerNav";
import {NavLink} from "react-router-dom";

export default function MovieScrollerTitleNav(props) {


    return (
        <>
            <h3 className={'bg-transparent text-light ps-3 mb-5 pointer scroller_title'}>
                 <NavLink className={'text-light text-decoration-none'}
                            to={props.link}>
                            {props.title}  <span className={'display-6 mt-3'}>&rsaquo;</span>
                </NavLink>
                <span className={'float-end'}><ScrollerNav parent_id={props.parent_id}/></span>
            </h3>
        </>
    );
}