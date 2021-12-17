import React, {useEffect, useState} from "react";
import MovieCard from "../ui/MovieCard";
import SinglePlaceholderCard from "../ui/SinglePlaceholderCard";
import {useLocation} from "react-router-dom";
import SearchPagination from "../ui/SearchPagination";

export default function SearchResults(props) {


    const movies = props.movies;
    const [page, setPage] = useState(0);
    const [moviesPerPage, setMoviesPerPage] = useState([]);
    const {pathname} = useLocation();
    const perPage = 24

    useEffect(() => {
        /*slicing movies to show only movies per that page*/
        setMoviesPerPage(movies.slice((page * perPage), (page + 1) * perPage))
        window.scrollTo(0, 0);

    }, [page, perPage, movies])

    useEffect(() => {
        setPage(0)
    }, [pathname])


    return (
        <div className={'container'} >

            <h4 className={'text-light ps-2'}>Page {page + 1}</h4>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-2 ">

                {moviesPerPage.length > 0 ?
                    moviesPerPage.map(movie => (
                        <div key={movie.id} className={'px-3'}>
                            <MovieCard movie={movie} class={'search_card col'} search={true}/>
                        </div>
                    )) :
                    Array.from({length: 8}).map((_, idx) => (
                        <div key={idx} className={'search_card col'}><SinglePlaceholderCard/></div>
                    ))

                }
            </div>
            <SearchPagination
                movies={movies}
                moviesPerPage={moviesPerPage}
                page={page}
                perPage={perPage}
                setPage={setPage}
            />


        </div>
    )
}