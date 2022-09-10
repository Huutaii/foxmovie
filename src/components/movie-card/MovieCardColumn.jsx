import React from 'react';

import './movie-card-column.scss';

import { Link } from 'react-router-dom';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCardColumn = props => {

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className="movie-card-column-wrap">
                <div className="movie-card-column-img" style={{backgroundImage: `url(${bg})`}}></div>
                <div className="movie-card-column-info">
                    <h4>{item.title || item.name}</h4>
                    <i className='bx bxs-star yellow' ></i>
                    <span> {item.vote_average.toFixed(1)}/10</span>
                    <span className="ml-2"> ({item.vote_count} votes)</span>
                </div>
            </div>
        </Link>
    );
}

export default MovieCardColumn;
