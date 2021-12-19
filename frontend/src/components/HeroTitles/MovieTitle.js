import React from "react";
import RatingStars from "../movies/RatingStars";

export default function MovieTitle(props) {
    const movie = props.movie
    return (
        <div className='lighter_bg px-3 rounded-3 opacity-75 py-2'>
            <h1 className={'fw-light'}>{movie.title} ({movie.year})</h1>
            <h4 className="text-light">

                <RatingStars rating={movie.imdb.rating}/> <br/>
                {movie.imdb.rating}/10

            </h4>
            <p className='fst-italic'>{movie.plot}</p>
        </div>
    );
}