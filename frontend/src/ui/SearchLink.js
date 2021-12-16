import {NavLink} from "react-router-dom";
import React from "react";

export default function SearchLink(props) {
    const field = props.field;
    const array = props.array;

    return (
        <>

            {array.map((item , idx) => (
                <span key={idx}>
                <NavLink

                    className={'text-info'}
                    to={`/search/${field}/${item}`}>
                    {item}
                </NavLink>
                    {idx+1 === array.length ? '' : ', '}    </span>
            ))}
        </>
    );

}