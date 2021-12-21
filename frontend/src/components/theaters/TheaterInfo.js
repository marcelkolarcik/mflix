import React from "react";

export default function TheaterInfo(props) {

    const theater = props.theater

    function InfoLine(props) {
        const lineClass = props.class === 'lead' ? 'lead p-0 m-0':'small p-0 m-0'
        return (
            <p className={lineClass}>{props.text}</p>

        );
    }

    return (
        <>
            <InfoLine text={theater.location.address.city} class={'lead'}/>
            <InfoLine text={theater.location.address.state}/>
            <InfoLine text={theater.location.address.street1}/>
            <InfoLine text={theater.location.address.zipcode}/>
            <InfoLine text={'Lat ' + theater.location.geo.coordinates[1] +
            ', Lng ' + theater.location.geo.coordinates[0]}/>

        </>
    );

}