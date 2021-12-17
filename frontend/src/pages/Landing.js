import React from "react";
import MovieScroller from "../ui/MovieScroller";
import Hero from "../components/Hero";
import HeroTitle from "../components/HeroTitles/LandingTitle";

export default function Landing(props) {
    const movies = props.movies
    const groupedMovies = props.groupedMovies


    return (
        <>
            <Hero title={<HeroTitle/>}/>
            <div className="main-bg ">

                <MovieScroller id={'popular'} title={'Popular'} link={'/search/movie/popular'} movies={groupedMovies['mp']}/>

                <MovieScroller id={'top_rated'} title={'Top rated'} link={'/search/movie/top-rated'} movies={groupedMovies['mt']}/>

                <MovieScroller id={'on_the_air'} title={'On the air'} link={'/search/movie/on-the-air'} movies={movies}/>

                 <MovieScroller id={'popular'} title={'TV Popular'} link={'/search/series/popular'} movies={groupedMovies['sp']}/>

                <MovieScroller id={'top_rated'} title={'TV Top rated'} link={'/search/series/top-rated'} movies={groupedMovies['st']}/>

                <MovieScroller id={'on_the_air'} title={'TV On the air'} link={'/search/series/on-the-air'} movies={movies}/>

            </div>
        </>);
}