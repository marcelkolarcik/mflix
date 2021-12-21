import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Hero from "../components/Hero";
import TheaterTitle from "../components/HeroTitles/TheaterTitle";
import TheaterMovie from "../components/theaters/TheaterMovie";

export default function Theater() {
    const params = useParams();
    const theaterId = params.theaterId;
    const [isLoading, setIsLoading] = useState(true)
    const [theater, setTheater] = useState({})
    const movieIds =  (new URL(document.location)).searchParams.get('movies');
    const [movies, setMovies] = useState([])


    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/theater/${theaterId}/${movieIds}/`)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                else{
                    alert('error')
                }
            })
            .then(data => {

                setTheater(data.theater);
                setMovies(data.movies);
                setIsLoading(false);

            },
                error=>{
                alert('error'+error.message)
                })
            .catch(error => {
                alert('error'+error)
            })
    }, [theaterId, movieIds])
    return (
        isLoading ? <>
                <Hero title={<p className="lead">Loading...</p>}/>

            </> :
            <>
                <Hero title={
                    <>
                        <h4 className={'text-light'}>Book your tickets for the theater at:</h4>
                        <TheaterTitle theater={theater}/>
                    </>}/>

                <div className="main-bg ">
                    <div className="container pt-5 text-light">

                        {movies.map(movie=>(<TheaterMovie key={movie.id} movie={movie} theater={theater}/>))}
                    </div>
                </div>
            </>
    );
}