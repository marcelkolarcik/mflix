import React from "react";
import MovieCard from "../ui/MovieCard";
import SinglePlaceholderCard from "../ui/SinglePlaceholderCard";

export default function SearchResults(props) {
    const movies = props.movies;
    return (
        <div className={'container '}>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-2 ">

                {movies.length > 0 ?
                    movies.map(movie => (
                        <div key={movie.id} className={'px-3'}>

                            <MovieCard movie={movie} class={'search_card col'} search={true}/>
                        </div>
                    )) :
                    Array.from({length: 8}).map((_, idx) => (
                        <div key={idx} className={'search_card col'}><SinglePlaceholderCard/></div>
                    ))

                }
            </div>
        </div>
    )
}