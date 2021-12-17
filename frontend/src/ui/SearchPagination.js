import Pagination from "react-bootstrap/Pagination";
import React from "react";

export default function SearchPagination(props) {
    const moviesPerPage = props.moviesPerPage;
    const movies = props.movies;
    const page = props.page;
    const perPage = props.perPage;
    const setPage = props.setPage;
    const numOfButtons = Math.ceil(movies.length / perPage)

    const paginationBtns = Array.from({length: numOfButtons}).map((_, idx) => (

        (idx >= page && idx < page + 3) ?
            <Pagination.Item title={`Go to page ${idx+1}`}
                             key={(idx + 1)}
                             active={(idx) === page}
                             disabled={(idx) === page}
                             onClick={() => { setPage(idx)}}>
                {idx + 1}
            </Pagination.Item>
            :
            ''
    ))


    return (
        moviesPerPage.length > 0 ?
            <div className="d-flex justify-content-center">
                <Pagination>

                    {page > 0 ?
                        <>
                            <Pagination.Prev  title={`Go to previous page`} onClick={() => setPage(page - 1)}/>
                            <Pagination.First title={`Go to first page`} onClick={() => setPage(0)}/>
                            <Pagination.Ellipsis disabled/>
                        </>
                        : ''}
                    {paginationBtns}

                    {(page + 1) !== Math.ceil(movies.length / perPage) ?
                        <>
                            <Pagination.Ellipsis disabled/>
                            <Pagination.Next title={`Go to next page`} onClick={() => setPage(page + 1)}/>
                            <Pagination.Last title={`Go to last page`} onClick={() => setPage(numOfButtons - 1)}/>
                        </>
                        : ''}

                </Pagination>
            </div> : ''
    );
}