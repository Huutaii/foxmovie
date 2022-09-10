import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import MovieListRow from '../../components/movie-list/MovieListRow';
import MovieListColumn from '../../components/movie-list/MovieListColumn';
import VideoPlay from '../../components/video-play/VideoPlay';

import './play.scss';

const Play = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState();

    const hideOptionSeason = () => {
        document.querySelector('.option-list').classList.add('display-none');
    };

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
        }
        getDetail();
    }, [category, id]);
    
  return (
    <>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="play-wrap container" onClick={hideOptionSeason}>
                            <div className="section mb-3 flex-3">
                                <VideoPlay category={category} id={id} seasons={item.seasons}/>
                                <div className="mb-2 play-content container">
                                    <div className="play-content__poster">
                                        <div className="play-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                                    </div>
                                    <div className="play-content__info">
                                        <h1 className="title">
                                            {item.title || item.name}
                                        </h1>
                                        <div className="genres">
                                            {
                                                item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                                    <span key={i} className="genres__item">{genre.name}</span>
                                                ))
                                            }
                                        </div>
                                        <i className='bx bxs-star yellow' ></i>
                                        <span> {item.vote_average.toFixed(1)}/10</span>
                                        <span className="ml-2"> ({item.vote_count} votes)</span>
                                        <div className="release">Release Date: {item.first_air_date || item.release_date || item.air_date}</div>
                                        <p className="overview">{item.overview}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-right section flex-1">
                                <div className="mb-3">
                                    <div className="mb-1">
                                        <h2>Trending on Day</h2>
                                    </div>
                                    <MovieListColumn category={category} time="day"/>
                                </div>
                                <div>
                                    <div className="mb-1">
                                        <h2>Trending on Week</h2>
                                    </div>
                                    <MovieListColumn category={category} time="week"/>
                                </div>
                            </div>
                        </div>    
                        <div className="section mb-2">
                            <div className="section__header mb-2">
                                <h2>Similar</h2>
                            </div>
                            <MovieListRow category={category} type="similar" id={item.id}/>
                        </div> 
                    </>
                )
            }
        </>
  )
}

export default Play