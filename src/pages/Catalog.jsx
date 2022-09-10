import React from "react";

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';
import MovieGrid from '../components/movie-grid/MovieGrid';
import { category as cate } from '../api/tmdbApi';

function Catalog() {
    window.scrollTo(0,0);
    const { category } = useParams();
    const hideFilter = () => {
        document.querySelector('.filter__option.genre').classList.remove('active');
        document.querySelector('.filter__option.year').classList.remove('active');
    };

    return (
        <div onClick={hideFilter}>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'TV Shows'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/>
                </div>
            </div>
        </div>
    )
}

export default Catalog;
