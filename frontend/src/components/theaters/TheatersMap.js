import Hero from "../Hero";
import TheatersTitle from "../HeroTitles/TheatersTitle";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import React from "react";
import TheaterPopup from "./TheaterPopup";

export default function TheatersMap(props) {

    const markers = props.markers

    return (
        <>
            <Hero title={<TheatersTitle/>}/>
            <div className={'lighter_bg'}>


                <div className="row g-0 py-5">
                    {markers ? <p className={'text-center lead text-light'}>
                            {'Click on the marker to see the theater details'}
                            <br/> Displaying {markers.length} results.</p> :
                        <p className={'text-center lead text-light'}>
                            {'Loading theaters...'}
                        </p>}

                    <div className="col-12 col-lg-9 mx-lg-auto ">
                        <MapContainer style={{height: 400}}

                                      center={[37, -95]}
                                      zoom={4}
                                      scrollWheelZoom={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {markers ?
                                markers.map(theater => (
                                    <Marker
                                        key={theater._id}
                                        position={[theater.location.geo.coordinates[1], theater.location.geo.coordinates[0]]}
                                    >
                                        <TheaterPopup theater={theater} onclick={props.onclick}/>
                                    </Marker>
                                ))
                                : ''}
                        </MapContainer>
                    </div>
                </div>

                 {props.onTheAir}

            </div>
        </>
    );

}