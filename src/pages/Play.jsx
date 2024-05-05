import React from 'react';
import { useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { Flex, Avatar, Pagination } from 'antd';

import apiConfig from '../api/apiConfig';
import { useGetRecommendationsQuery, useGetReviewsQuery } from '../services/tmdb'

import VideoPlay from '../components/VideoPlay';

const Play = () => {
    const { category, id } = useParams();
    let { state } = useLocation();

    const { data: dataRecommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({category: category, id: id})
    const { data: dataReviews, isFetching: isReviewsFetching } = useGetReviewsQuery({category: category, id: id})

    const hideOptionSeason = () => {
        document.querySelector('.option-list').classList.add('display-none');
    };
    
    return (
        <div className="play">
            {
                state && (
                    <>
                        <div className="play__wrapper" onClick={hideOptionSeason}>
                            <VideoPlay category={category} id={id} seasons={state.seasons}/>
                            <Flex gap="large" align="flex-start" className="info__wrapper">
                                <div className="info__wrapper--poster">
                                    <img src={apiConfig.originalImage(state.poster_path || state.backdrop_path)} alt=""/>
                                </div>
                                <div>
                                    <h1 className="info__wrapper--title">{state.title || state.name}</h1>
                                    <Flex align="center" gap="small">
                                        <span class="stars" style={{ '--rating': state.vote_average.toFixed(1) }} aria-label="Rating of this product is 4.8 out of 5."></span>
                                        <span> {state.vote_average.toFixed(1)}/10</span>
                                    </Flex>
                                    <p className='info__wrapper--release'>Release: {state.first_air_date || state.release_date || state.air_date}</p>
                                    <p className="info__wrapper--overview">{state.overview}</p>
                                    <Flex align="center" gap="small" className="info__wrapper--genre">
                                        <span>Genre: </span>
                                        <Swiper
                                            slidesPerView={'auto'}
                                            spaceBetween={8}
                                            freeMode={true}
                                            modules={[FreeMode]}
                                        >
                                                {
                                                    state.genres.map((item, i) => (
                                                        <SwiperSlide key={i}>
                                                            <span>{item.name}</span>
                                                        </SwiperSlide>
                                                    ))
                                                }
                                        </Swiper>
                                    </Flex>
                                </div>
                            </Flex>
                            { (!isReviewsFetching && dataReviews?.results.length > 0) && (
                                <div className="play__wrapper--reviews">
                                    <h2>Reviews</h2>
                                    <div className='play__wrapper--reviews__list'>
                                        {
                                            dataReviews?.results.slice(0, 5).map((item, i) => (
                                                <div key={i} className='play__wrapper--reviews__item'>
                                                    <div className="">
                                                        <Flex wrap={true} justify="space-between" align="end" gap="large">
                                                            <Flex align="center" gap="small">
                                                                <Avatar src={`${apiConfig.originalImage(item.author_details.avatar_path)}`} size="large">{!item.author_details.avatar_path && item.author_details.name}</Avatar>
                                                                <div className='play__wrapper--reviews__item--user'>
                                                                    <p>{item.author_details.name}</p>
                                                                    <p>@{item.author_details.username}</p>
                                                                </div>
                                                            </Flex>
                                                            <span class="stars" style={{ '--rating': item.author_details.rating }} aria-label="Rating of this product is 4.8 out of 5."></span>
                                                        </Flex>
                                                        <p className='play__wrapper--reviews__item--content'>{item.content}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                            { (!isRecommendationsFetching && dataRecommendations?.results.length > 0) && (
                                <div className="play__wrapper--recommendation">
                                    <h2>You might like also</h2>
                                    <div className="categories__list">
                                        {
                                            dataRecommendations?.results.map((item, i) => (
                                                <Link to={`/${category}/${item.id}`} key={i} className="categories__item">
                                                    <img src={`${apiConfig.originalImage(item.poster_path ? item.poster_path : item.backdrop_path)}`} alt="" />
                                                    <div className="categories__item--info">
                                                        <p>{item.title ? item.title : item.name}</p>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Play