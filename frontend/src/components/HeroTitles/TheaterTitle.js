import React from "react";
import TheaterInfo from "../theatres/TheaterInfo";

export default function TheaterTitle(props) {

    return (
        <TheaterInfo theater={props.theater}/>
    );
}