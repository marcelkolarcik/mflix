import './App.css';
import React, {useEffect, useState} from 'react';
import Layout from "./ui/Layout";
import {Route, Routes} from 'react-router-dom';
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import Movie from "./pages/Movie";

function App() {

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([])
    useEffect(() => {
        fetch('/api/')
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then(data => {
                setGenres(data.genres)
                setMovies(data.movies)


            })
    }, [])


    return (
        <Layout genres={genres}>

            <Routes>
                <Route path={'/'} element={<Landing movies={movies}/>}/>
                <Route path={`/search/:term`} element={<Search/>}/>
                <Route path={`/movie/:movieId`} element={<Movie/>}/>
            </Routes>


        </Layout>
    );
}

export default App;
