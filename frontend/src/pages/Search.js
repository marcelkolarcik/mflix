import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Hero from "../components/Hero";
import SearchTitle from "../components/HeroTitles/SearchTitle";
import SearchResults from "../components/SearchResults";

export default function Search() {

    const search = useParams();
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        setMovies([])
        fetch('/api/search/' + search.term)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                setMovies(data.movies)
            })
    }, [search])

    return (

        <>
            <Hero title={<SearchTitle searchTerm={search.term}/>}/>
            <div className="main-bg pb-5">

                <SearchResults movies={movies}/>


            </div>
            <div className={'main-bg'}/>

        </>
    );

}