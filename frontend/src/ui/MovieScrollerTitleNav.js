import React from "react";
import ScrollerNav from "./ScrollerNav";

export default function MovieScrollerTitleNav(props) {


    return (
        <>
            <h3 className={'bg-transparent text-light ps-3 mb-5 pointer'}>
                {props.title} <span className={'display-6 mt-3'}>&rsaquo;</span>
                <span className={'float-end'}><ScrollerNav parent_id={props.parent_id}/></span>
            </h3>
        </>
    );
}