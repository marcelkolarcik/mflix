import React from "react";

export default function RatingStars(props) {
    const rating = parseInt(props.rating)
    return (
        <>{Array.from({length: 10}).map((_, idx) =>
            (
                idx + 1 <= rating ?
                    <span key={idx} className={'text-warning fs-5'}>&#9733;</span>
                    :
                    <span key={idx} className={'text-light fs-5'}>&#9734;</span>
            ))}

        </>
    );
}