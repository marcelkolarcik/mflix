import './App.css';
import React, {useEffect, useState} from 'react';
import Layout from "./ui/Layout";
import {Route, Routes} from 'react-router-dom';
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Login from "./auth/Login";
import Reset from "./auth/Reset";
import Register from "./auth/Register";
import Dashboard from "./auth/Dashboard";
import Theaters from "./pages/Theaters";
function App() {

    const [movies, setMovies] = useState([]);
    const [groupedMovies, setGroupedMovies] = useState([]);
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
                setGroupedMovies(data.all_grouped)


            })
    }, [])


    return (
        <Layout genres={genres}>

            <Routes>
                <Route path={'/'} element={<Landing movies={movies} groupedMovies={groupedMovies}/>}/>
                <Route path={`/search/:field/:term`} element={<Search/>}/>
                <Route path={`/movie/:movieId`} element={<Movie/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/reset" element={<Reset/>}/>
                 <Route path="/theaters" element={<Theaters/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>


        </Layout>
    );
}

export default App;
