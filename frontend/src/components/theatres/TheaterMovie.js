import React from "react";
import defaultImg from '../../ui/images/placeholder_img.jpg'
import RatingStars from "../movies/RatingStars";
import BookingForm from "./BookingForm";

export default function TheaterMovie(props) {

    const movie = props.movie;
    const theater = props.theater;
    return (
        <div className="row mb-3 shadow p-3 dark_bg theater_movie">
            <div className="col-2">
                <img className={'img-thumbnail'}
                     src={movie.poster ? movie.poster : defaultImg} alt=""/>
            </div>
            <div className="col">

                <p className={'lighter_bg small m-0 ps-1 py-1 text-light'}>
                    Title: {movie.title} <br/>
                    <RatingStars rating={movie.imdb.rating}/> <br/>
                    {movie.imdb.rating}/10

                    <BookingForm movie={movie} theater={theater}/>
                    {/*<span className={'float-end btn btn-warning text-dark p-0 m-0 mb-2 pointer rounded-0'}>Book Now</span>*/}
                </p>

                <p className={' small m-0 px-1 py-1 text-light'}>
                    Plot: {movie.plot}</p>
            </div>
        </div>
    );
}