import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";
import React from "react";

export default function BookingInProcess() {
    return (
        <>
            <p>
                Booking in process...

            </p>
            <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} size={'xc'} bg={'info'}/>
            </Placeholder>
        </>
    );
}