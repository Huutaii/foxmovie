import React from "react";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { Flex } from 'antd';

import { useGetMoviesQuery } from '../services/tmdb'
import apiConfig from '../api/apiConfig';

import HeroSlide from "../components/HeroSlide";

import imdbImage from '../assets/imgs/imdb.jpeg';

function Home() {
    const { data: moviePopularData, isFetching: isFetchingMoviePopular } = useGetMoviesQuery({category: 'movie', type: 'popular'})
    const { data: tvAiringTodayData, isFetching: isFetchingTvAiringToday } = useGetMoviesQuery({category: 'tv', type: 'airing_today'})
    const { data: trendingData, isFetching: isFetchingTrending } = useGetMoviesQuery({category: 'trending', time: 'week'})

    return (
        <Flex vertical={true} gap="large" className="home">
            <HeroSlide />

            <div>
                <p className="swiper-title">Popular Movie</p>
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={16}
                    freeMode={true}
                    modules={[FreeMode]}
                    grabCursor={true}
                    className="listSwiper"
                >
                        {
                            !isFetchingMoviePopular && moviePopularData.results.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Link to={`/movie/${item.id}`} style={{ color: "unset" }}>
                                        <img className="poster" src={`${apiConfig.w500Image(item.poster_path ? item.poster_path : item.backdrop_path)}`} alt="" />
                                        <h3>{item.original_title && item.original_title}</h3>
                                        <Flex align="center" gap="small" wrap="wrap">
                                            <img src={imdbImage} alt="" style={{ width: "16px", height: "16px" }}/>
                                            <span style={{ fontWeight: "200" }}> {item.vote_average.toFixed(1)}</span>
                                        </Flex>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                </Swiper>
            </div>

            <div>
                <p className="swiper-title">Airing Today</p>
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={16}
                    freeMode={true}
                    modules={[FreeMode]}
                    grabCursor={true}
                    className="listSwiper"
                >
                        {
                            !isFetchingTvAiringToday && tvAiringTodayData.results.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Link to={`/tv/${item.id}`} style={{ color: "unset" }}>
                                        <img className="poster" src={`${apiConfig.w500Image(item.poster_path ? item.poster_path : item.backdrop_path)}`} alt="" />
                                        <h3>{item.original_name && item.original_name}</h3>
                                        <Flex align="center" gap="small" wrap="wrap">
                                            <img src={imdbImage} alt="" style={{ width: "16px", height: "16px" }}/>
                                            <span style={{ fontWeight: "200" }}> {item.vote_average.toFixed(1)}</span>
                                        </Flex>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                </Swiper>
            </div>

            <div>
                <p className="swiper-title">Top 10 Movies & TV in Today</p>
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={48}
                    freeMode={true}
                    modules={[FreeMode]}
                    grabCursor={true}
                    className="trendingSwiper"
                >
                        {
                            !isFetchingTrending && trendingData.results.slice(0, 10).map((item, i) => (
                                <SwiperSlide key={i}>
                                    <span>{i+1}</span>
                                    <Link to={`/${item.media_type}/${item.id}`}>
                                        <img src={`${apiConfig.w500Image(item.poster_path ? item.poster_path : item.backdrop_path)}`} alt="" />
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                </Swiper>
            </div>
        </Flex>
    )
}

export default Home;
