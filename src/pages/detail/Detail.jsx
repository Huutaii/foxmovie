import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import tmdbApi, { category as cate } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import Button from '../../components/button/Button';
import CastList from '../../components/cast-list/CastList';
import VideoList from '../../components/video-list/VideoList';
import MovieListRow from '../../components/movie-list/MovieListRow';

const Detail = () => {

    let navigate = useNavigate();

    const { category, id } = useParams();

    const path = category === cate.movie ? 'movie' : 'tv'

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <Button onClick={() => navigate('/' + path + '/' + item.id + '/play')}>
                                    <i className="bx bx-play"></i>
                                    <span>Play</span>
                                </Button>
                                <div>Release Date: {item.first_air_date || item.release_date || item.air_date}</div>
                                <p className="overview">{item.overview}</p>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item" onClick={() => navigate(`/${category}/genre/${genre.id}`)}>{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <i className='bx bxs-star yellow' ></i>
                                <span> {item.vote_average.toFixed(1)}/10</span>
                                <span className="ml-2"> ({item.vote_count} votes)</span>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                                
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-2">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieListRow category={category} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
