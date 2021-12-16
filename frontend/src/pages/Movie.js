import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Hero from "../components/Hero";
import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";
import MovieTitle from "../components/HeroTitles/MovieTitle";
import defaultImg from "../ui/images/PlaceholderImage.svg";
import RatingStars from "../ui/RatingStars";


export default function Movie() {
    const param = useParams()
    const [movie, setMovie] = useState({})
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        fetch('/api/movie/' + param.movieId)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then(data => {
                setMovie(data.movie)
                setComments(data.comments)
                console.log(data.movie)
                setIsLoading(false)
            })
    }, [param.movieId])
    if (isLoading) {
        return (
            <>
                <Hero title={<h1>Movie:
                    <Placeholder as={Card.Title} animation="wave">
                        <Placeholder xs={6}/>
                    </Placeholder>
                </h1>}/>
                <div className="main-bg ">


                </div>
            </>);
    } else {
        return (
            <>

                <Hero title={<MovieTitle movie={movie}/>} image={movie.poster}/>
                <div className="main-bg ">
                    <div className="container pt-5">
                        <div className="card  mb-3 dark_bg text-muted p-4">
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <img src={movie.poster || defaultImg}
                                         className="img-fluid rounded-start" alt={movie.title}/>
                                </div>
                                <div className="col-md-10">
                                    <div className="card-body p-0 m-0 px-4">
                                        <h3 className="card-title text-light pt-0 mt-0">
                                            {movie.title} ({movie.year})<>&nbsp;</>

                                        </h3>
                                        <p className="p-0 m-0 ">
                                            <RatingStars rating={movie.imdb.rating}/> <br/>
                                            <span
                                                className={'x-small'}> {movie.imdb.rating}/10 by {movie.imdb.votes.toLocaleString()} users</span>
                                        </p>

                                        <p className=" fst-italic small my-3 ">{movie.fullplot}</p>
                                        <p className={' small m-0 px-1 py-1 text-light'}>Writers: {movie.writers.join(',')}</p>
                                        <p className={'lighter_bg small m-0 px-1 py-1 text-light'}>
                                            Released: {movie.released.toLocaleString().split('00:00:00 GMT')[0]}</p>
                                        <p className={' small m-0 px-1 py-1 text-light'}>Runtime: {movie.runtime} min</p>
                                        <p className={'lighter_bg small m-0 px-1 py-1 text-light'}>Genres: {movie.genres.join(',')}</p>
                                        <p className={' small m-0 px-1 py-1 text-light'}>Stars: {movie.cast.join(',')}</p>

                                        {movie.tomatoes ?
                                            <>
                                            <p className={'lighter_bg small m-0 px-1 py-1 text-light'}>Production: {movie.tomatoes.production}
                                            <a className={'float-end pe-1 text-muted text-decoration-none'}
                                               rel="noreferrer"
                                               target={'_blank'} href={movie.tomatoes.website}>website</a>
                                        </p>
                                        <p className={' small m-0 px-1 py-1 text-light'}>Consensus: {movie.tomatoes.consensus}</p>
                                        <p className={'lighter_bg small m-0 px-1 py-1 text-light'}>Box
                                            office: {movie.tomatoes.boxOffice}</p>
                                            </>
                                            :''}


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card dark_bg mt-5 p-4">
                            <h4 className={'text-light'}>Comments ({comments.length})</h4>
                            {comments.map((comment,idx)=>(
                                <div key={idx} className={'border-bottom border-secondary mb-3'}>
                                    <p className="small text-muted p-0 m-0">{comment.name} - {comment.date.split('T')[0]}</p>
                                    <p className={'fst-italic text-light'}>{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </>);
    }

}