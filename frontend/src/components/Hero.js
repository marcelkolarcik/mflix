import React from "react";

export default function Hero() {
    return (<div className="jumbo-hero">
        <div className={'text-light'}>
            <h1 className={'fw-light'}>Find Movies & TV Shows</h1>
            <h4 className="text-light">
                Browse and Read all about your favorite movies & series for free!
            </h4>
            <a className={'btn btn-outline-info nav_link_color small mb-2 mb-sm-0'}>
                Sign-in to comment
            </a>
        </div>
    </div>);
}