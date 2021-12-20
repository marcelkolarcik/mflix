import React, {useEffect, useState} from "react";
import TheatersMap from "../components/theaters/TheatersMap";
import MovieScroller from "../components/movies/MovieScroller";


export default function Theaters(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [markers, setMarkers] = useState([]);
    const [isClicked, setIsClicked] = useState(false)
    const [onTheAir, setOnTheAir] = useState([])

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
                    document.getElementById('on_the_air').scrollIntoView();
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

        fetch('/api/theaters/')
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
                    onTheAir={(onTheAir && isClicked) && <MovieScroller movies={onTheAir} title={'Currently showing'} link={'#'} id={'on_the_air'}/>}
                />
            </>
        );
    }
}