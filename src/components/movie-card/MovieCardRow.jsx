import React from 'react';

import './movie-card-row.scss';

import { Link, useNavigate } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const MovieCardRow = props => {

    let navigate = useNavigate();

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.backdrop_path || item.poster_path);

    return (
        <div className="movie-card-row">
            <Link to={link}>
                <div className="movie-card-row-img" style={{backgroundImage: `url(${bg})`}}></div>
                <div className="movie-card-row-content section">
                    <h4>{item.title || item.name}</h4>
                    <i className='bx bxs-star yellow' ></i>
                    <span> {item.vote_average.toFixed(1)}/10</span>
                    <span> &bull; </span>
                    <span>
                        {item.release_date
                            ? item.release_date.slice(0, 4)
                            : item.first_air_date
                            ? item.first_air_date.slice(0, 4)
                            : ''}
                    </span>
                </div>
            </Link>
            <Button onClick={() => navigate('/' + props.category + '/' + item.id + '/play')}>
                <i className="bx bx-play"></i>
            </Button>
        </div>
    );
}

export default MovieCardRow;
