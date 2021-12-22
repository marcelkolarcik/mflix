import React, {useEffect, useState} from "react";
import TheatersMap from "../components/theaters/TheatersMap";
import MovieScroller from "../components/movies/MovieScroller";
import {Link} from 'react-router-dom'


export default function Theaters(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [markers, setMarkers] = useState([]);
    const [isClicked, setIsClicked] = useState(false)
    const [onTheAir, setOnTheAir] = useState([])
    const [theaterId, setTheaterId] = useState('')
    const [theaterMovies, setTheaterMovies] = useState('')
    let tempMovies = ''


    function showOnTheAir() {
        setIsClicked(true)

        fetch('/api/on-the-air/')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                    setOnTheAir(data.movies);
                    data.movies.map(movie => (
                        tempMovies += movie.id + ','
                    ))
                    setTheaterMovies(tempMovies)

                    document.querySelector('.scroller_title').scrollIntoView();
                    document.querySelector('nav.navbar').classList.remove('sticky-top');
                }
                ,
                error => {
                    console.log('error ' + error.message)
                })
            .catch(error => {
                console.log('error ' + error.message)
            })
    }

    useEffect(() => {

        fetch('/api/theater/all/')
            .then(response => {
                if (response.status === 200) return response.json()
            }).then(data => {
            setMarkers(data.theaters)

            setIsLoading(false)
        }, error => {
            console.log('error: ' + error)
        })
    }, [])


    if (isLoading) {
        return (
            <>
                <TheatersMap/>
            </>)
    } else {
        return (
            <>

                <TheatersMap
                    markers={markers}
                    onclick={showOnTheAir}
                    setTheaterId={setTheaterId}
                    onTheAir={(onTheAir && isClicked) &&
                    <>
                        <MovieScroller movies={onTheAir}
                                       title={'Currently showing'}
                                       link={`/theater/${theaterId}?movies=${theaterMovies}`} id={'on_the_air'}/>
                        <p className=" text-light text-center " style={{marginTop:'-50px'}}>
                            <Link
                                to={`/theater/${theaterId}?movies=${theaterMovies}`}
                                className={'text-decoration-none btn btn-outline-info p-0 px-4 py-1 pt-0 mt-0'}>BOOK NOW</Link>
                        </p>
                    </>}
                />
            </>
        );
    }
}