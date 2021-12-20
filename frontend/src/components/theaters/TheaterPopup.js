import {Popup} from "react-leaflet";
import React from "react";

export default function TheaterPopup(props) {
    const theater = props.theater

    return (
        <Popup>

            <div className={'lighter_bg p-2 rounded-3 text-light'}>
                <p className="lead pb-0 mb-0">{theater.location.address.city}</p>
                <p className="small p-0 m-0">{theater.location.address.state}</p>
                <p className="small p-0 m-0">{theater.location.address.street1}</p>
                <p className="small p-0 m-0">{theater.location.address.zipcode}</p>
                <p className="small p-0 m-0">
                    {'Lat ' + theater.location.geo.coordinates[1] +
                    ', Lng ' + theater.location.geo.coordinates[0]}</p>
                <button className={'mt-auto btn btn-sm btn-info p-0 m-0 w-100 mb-2 text-dark'}
                        onClick={props.onclick}>
                    On-the-air
                </button>
            </div>
        </Popup>
    );
}