import React from "react";
import {Link} from "react-router-dom";
import img from './images/PlaceholderImage.svg'

export default function MovieCard(props) {
    const movie = props.movie


    return (
        <>

            <div className={props.class + ' pointer'}
                 style={{backgroundImage: `url(${movie.poster || img})`}}>
                <div className="movie_inset d-flex align-items-start flex-column bd-highlight mb-3 text-light px-2"

                >
                    <p className="text-light small">
                        <span className={'text-warning'}>&#9733;</span> {movie.imdb.rating}/10
                        ({movie.imdb.votes.toLocaleString()} votes)
                    </p>


                    <p className="small text-light mb-2">
                        RUNTIME: {movie.runtime} mins
                    </p>

                    <Link to={`/movie/${movie.id}`}
                          className={'mt-auto btn btn-sm btn-outline-info p-0 m-0 w-100 mb-2 text-light'}>Full
                        Info</Link>
                </div>
                {!props.search ? <div className={'w-100 mb-5'}>
                    <p className="small p-0 m-0 text-light">
                        {movie.title} ({movie.year})
                    </p>
                </div> : ''}

            </div>
            {props.search ? <div className={'w-100 mb-5'}>
                <p className="small p-0 m-0 text-light">
                    {movie.title} ({movie.year})
                </p>
            </div> : ''}
        </>


    );
}