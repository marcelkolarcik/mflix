import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";
import React, {useState} from "react";

export default function BookingInProcess() {

    const [changeText1, setChangeText1] = useState(false);
    const [changeText2, setChangeText2] = useState(false);

    function setChangeTextHandler1() {
        setChangeText1(true);

    }
    function setChangeTextHandler2() {
        setChangeText2(true);

    }

    setTimeout(setChangeTextHandler1, 2000)
    setTimeout(setChangeTextHandler2, 4000)
    return (
        <>
            <p>
                {!changeText1 ? 'Booking in process...' : !changeText2 ? 'Checking availability...' : 'Almost there...'}

            </p>
            <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} size={'xc'} bg={'warning'}/>
            </Placeholder>
        </>
    );
}