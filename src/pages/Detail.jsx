import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { Flex, Button, Avatar, Skeleton } from 'antd';
import { PlayCircleFilled, HeartOutlined, HeartFilled, PlusOutlined, UserOutlined, CaretRightFilled } from '@ant-design/icons';
import axios from 'axios';

import { useGetMoviesAccountQuery, useGetDetailsQuery } from '../services/tmdb'
import { userSelector } from "../features/authSlice";

import apiConfig from '../api/apiConfig';

const Detail = () => {
    const { category, id } = useParams();
    const { isAuthenticated, user } = useSelector(userSelector);

    const { data, isFetching } = useGetDetailsQuery({category: category, id: id})
    const { data: favoriteData, } = useGetMoviesAccountQuery({type: 'favorite', category: category === 'movie' ? 'movies' : 'tv', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1})
    const { data: watchlistData, } = useGetMoviesAccountQuery({type: 'watchlist', category: category === 'movie' ? 'movies' : 'tv', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1})

    const [isFavorited, setIsFavorited] = useState(false)
    const [isWatchlisted, setIsWatchlisted] = useState(false)

    useEffect(() => {
        setIsFavorited(!!favoriteData?.results?.find((movie) => movie.id === data?.id))
    }, [favoriteData, data])
    useEffect(() => {
        setIsWatchlisted(!!watchlistData?.results?.find((movie) => movie.id === data?.id))
    }, [watchlistData, data])
    
    const addFavorite = async () => {
        await axios.post(`${apiConfig.baseUrl}account/${user}/favorite?api_key=${apiConfig.apiKey}&session_id=${localStorage.getItem('session_id')}`, {
            media_type: category,
            media_id: id,
            favorite: !isFavorited
        })
        setIsFavorited((prev) => !prev)
    }
    const addToWatchlist = async () => {
        await axios.post(`${apiConfig.baseUrl}account/${user}/watchlist?api_key=${apiConfig.apiKey}&session_id=${localStorage.getItem('session_id')}`, {
            media_type: category,
            media_id: id,
            watchlist: !isWatchlisted
        })
        setIsWatchlisted((prev) => !prev)
    }

    return (
        <div className="details">
            {
                isFetching ? (
                    <>
                        <Flex gap="large" align="center">
                            <Skeleton.Node active className="ant-skeleton-image-poster">
                                <div></div>
                            </Skeleton.Node>
                            <div className="flex-1">
                                <Skeleton active />
                                <br />
                                <Skeleton.Button active />
                                <Flex gap="middle" align="center" style={{ marginTop: "24px" }}>
                                    {(new Array(16).fill(0).map((_, index) => (
                                        <Skeleton.Node active key={index} className="ant-skeleton-image-casts">
                                            <div></div>
                                        </Skeleton.Node>
                                    )))}
                                </Flex>
                            </div>
                        </Flex>
                        <br />
                        <Skeleton active />
                        <br />
                        <Skeleton.Node active className="ant-skeleton-image-video">
                            <div></div>
                        </Skeleton.Node>
                    </>
                ) : (
                    <>
                        <div className="info__backdrop" style={{backgroundImage: `url(${apiConfig.originalImage(data?.backdrop_path || data?.poster_path)})`}}></div>
                        <div className="details__wrapper">
                            <div className="info__wrapper">
                                <Link to={`play`} state={data} className="info__wrapper--poster">
                                    <img src={apiConfig.w500Image(data?.poster_path || data?.backdrop_path)} alt=""/>
                                    <PlayCircleFilled />
                                </Link>
                                <div>
                                    <h1 className="info__wrapper--title">{data?.title || data?.name}</h1>
                                    <Flex align="center" gap="small">
                                        <span className="stars" style={{ '--rating': data?.vote_average.toFixed(1) }} aria-label="Rating of this product is 4.8 out of 5."></span>
                                        <span> {data?.vote_average.toFixed(1)}/10</span>
                                    </Flex>
                                    <p className='info__wrapper--release'>Release: {data?.first_air_date || data?.release_date || data?.air_date}</p>
                                    <Flex wrap="wrap" align="center" gap="small" className="info__wrapper--btn">
                                        <Button ghost className={isFavorited && 'active'} shape="round" icon={isFavorited ? <HeartFilled /> : <HeartOutlined />} size="large" onClick={addFavorite}>
                                            Favorite
                                        </Button>
                                        <Button ghost className={isWatchlisted && 'active'} shape="round" icon={<PlusOutlined />} size="large" onClick={addToWatchlist}>
                                            Watchlist
                                        </Button>
                                    </Flex>
                                    <p className="info__wrapper--overview">{data?.overview}</p>
                                    <Flex align="center" gap="small" className="info__wrapper--genre">
                                        <span>Genre: </span>
                                        <Swiper
                                            slidesPerView={'auto'}
                                            spaceBetween={8}
                                            freeMode={true}
                                            modules={[FreeMode]}
                                        >
                                                {
                                                    data?.genres.map((item, i) => (
                                                        <SwiperSlide key={i}>
                                                            <span>{item?.name}</span>
                                                        </SwiperSlide>
                                                    ))
                                                }
                                        </Swiper>
                                    </Flex>
                                    <Link to={`play`} state={data}>
                                        <Button type="primary" shape="round" icon={<CaretRightFilled />} iconPosition="end" size="large" className="info__wrapper--play">Play</Button>
                                    </Link>
                                </div>
                            </div>
                            <div className='details__wrapper--casts'>
                                <h2>Casts: </h2>
                                <Swiper
                                    slidesPerView={'auto'}
                                    spaceBetween={16}
                                    freeMode={true}
                                    grabCursor={true}
                                    modules={[FreeMode]}
                                >
                                        {
                                            data?.credits?.cast.map((item, i) => (
                                                <SwiperSlide key={i}>
                                                    <Link to={`/person/${item?.id}`} className='details__wrapper--casts--item'>
                                                        {
                                                            item?.profile_path ? <img src={apiConfig.w500Image(item?.profile_path)} alt=""/> : <Avatar icon={<UserOutlined />} />
                                                        }
                                                        <p className="details__wrapper--casts--item--name">{item?.name}</p>
                                                        <p className="details__wrapper--casts--item--character">{item?.character.split('/')[0]}</p>
                                                    </Link>
                                                </SwiperSlide>
                                            ))
                                        }
                                </Swiper>
                            </div>
                            {
                                data?.videos?.results?.length > 0 &&
                                <div className='details__wrapper--trailer'>
                                    <h2>Trailer: </h2>
                                    <iframe
                                        title="trailer"
                                        frameBorder="0"
                                        src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
                                    />
                                </div>
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Detail;
