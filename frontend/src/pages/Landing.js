import React from "react";
import MovieScroller from "../ui/MovieScroller";
import Hero from "../components/Hero";
import HeroTitle from "../components/HeroTitles/LandingTitle";

export default function Landing(props) {
    const movies = props.movies
    return (
        <>
            <Hero title={<HeroTitle/>}/>
            <div className="main-bg ">

                <MovieScroller id={'popular'} title={'Popular'} link={'/popular'} movies={movies}/>

                <MovieScroller id={'top_rated'} title={'Top rated'} link={'/popular'} movies={movies}/>

                <MovieScroller id={'on_the_air'} title={'On the air'} link={'/popular'} movies={movies}/>

            </div>
        </>);
}