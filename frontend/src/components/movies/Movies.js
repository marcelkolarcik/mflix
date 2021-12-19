import SinglePlaceholderCard from "../../ui/SinglePlaceholderCard";
import React from "react";
import MovieCard from "./MovieCard";

export default function Movies(props) {
    const movies = props.movies


    return (
        <>
            <div className="scroller-wrapper bg-body">
                <nav id={props.id} className="nav nav-underline " aria-label="Secondary navigation">
                    {typeof movies !== "undefined" && movies.length > 0 ?
                        movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} class={'movie_card mb-2 col-3 mx-3'} search={false}/>
                        )) :
                        Array.from({length: 8}).map((_, idx) => (
                            <div key={idx} className={'movie_card mb-2 col-3 mx-3'}><SinglePlaceholderCard/></div>
                        ))

                    }
                </nav>
            </div>
            <hr className={'scroller-divider'}/>
        </>
    )
}