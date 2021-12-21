import React from "react";
import TheaterInfo from "../theaters/TheaterInfo";

export default function TheaterTitle(props) {

    return (
        <TheaterInfo theater={props.theater}/>
    );
}