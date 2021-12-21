import {Popup} from "react-leaflet";
import React, {useState} from "react";
import TheaterInfo from "./TheaterInfo";

export default function TheaterPopup(props) {
    const theater = props.theater
    const [isLoading, setIsLoading] = useState(false)

    function onClickHandler(e) {
        setIsLoading(true)
        props.onclick()
        props.setTheaterId(e.target.dataset.id)

    }

    /*reverse the text on the button back to On-the-air from Loading...*/
    window.addEventListener('scroll', () => setIsLoading(false))

    return (
        <Popup>

            <div className={'lighter_bg p-2 rounded-3 text-light'}>
                <TheaterInfo theater={theater}/>
                <button className={'mt-auto btn btn-sm btn-info p-0 m-0 w-100 mb-2 text-dark'}
                        data-id={theater._id}
                        onClick={onClickHandler}>
                    {isLoading ? 'Loading...' : ' On-the-air'}
                </button>
            </div>
        </Popup>
    );
}