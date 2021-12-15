import './App.css';
import React, {useEffect, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import MainNav from "./components/MainNav";
import Hero from "./components/Hero";

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
        <>


           <MainNav genres={genres}/>
           <Hero/>
            <div className="main-bg py-5">
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 px-2">
                      {movies.map(movie => (
                    <div className={'col movie_card'}><img className={'img-fluid'} src={movie.poster} alt=""/></div>
                ))}
                </div>

            </div>

        </>
    );
}

export default App;
