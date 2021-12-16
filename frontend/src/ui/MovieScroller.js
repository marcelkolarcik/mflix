import React from "react";
import Movies from "./Movies";
import MovieScrollerTitleNav from "./MovieScrollerTitleNav";

export default function MovieScroller(props) {
    const movies = props.movies
    return (
        <div className="container">


            <MovieScrollerTitleNav parent_id={props.id} title={props.title}/>
            <Movies id={props.id} movies={movies}/>

        </div>);
}