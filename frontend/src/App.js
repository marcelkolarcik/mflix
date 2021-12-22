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
import Dashboard from "./pages/Dashboard";
import Theatres from "./pages/Theatres";
import Theater from "./pages/Theater";
import {BookingContextProvider} from "./store/booking-context";

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
        <BookingContextProvider>
            <Layout genres={genres}>

                <Routes>
                    <Route path={'/'} element={<Landing movies={movies} groupedMovies={groupedMovies}/>}/>
                    <Route path={`/search/:field/:term`} element={<Search/>}/>
                    <Route path={`/movie/:movieId`} element={<Movie/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/reset" element={<Reset/>}/>
                    <Route path="/theatres" element={<Theatres/>}/>
                    <Route path={`/theater/:theaterId`} element={

                        <Theater/>

                    }/>
                    <Route path="/dashboard"
                           element={

                               <Dashboard/>
                           }/>

                </Routes>


            </Layout>
        </BookingContextProvider>
    );
}

export default App;
