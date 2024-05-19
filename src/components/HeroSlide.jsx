import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Flex, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { userSelector } from "../features/authSlice";
import { useGetMoviesQuery, useGetVideosQuery, useGetMoviesAccountQuery, useAddToWatchlistMutation } from '../services/tmdb';
import { useNotification } from "../components/NotificationContext";

import apiConfig from '../api/apiConfig';

const TrailerModal = ({ id, open, close }) => {
    const iframeRef = useRef()
    const { data, isFetching } = useGetVideosQuery({category: 'movie', id: id})

    const handleClose = () => {
        close();
        iframeRef.current.src += ''
    };

    return (
        <>
            {
                !isFetching &&
                <Modal centered title="Trailer" footer={null} open={open} onCancel={handleClose}>
                    { data && data.results.length > 0 ?
                        (
                            <iframe
                                ref={iframeRef}
                                title="trailer"
                                frameBorder="0"
                                src={`https://www.youtube.com/embed/${data.results[0].key}`}
                                style={{ aspectRatio: "16/9", width: "100%" }}
                            />
                        ) : (
                            <p style={{ textAlign: "center" }}>No trailer</p>
                        )
                    }
                </Modal>
            }
        </>
    )
}

function HeroSlide() {
    const { isAuthenticated, user } = useSelector(userSelector);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idItem, setIdItem] = useState();
    const { data: movieUpcomingData, isFetching: isFetchingMovieUpcoming } = useGetMoviesQuery({category: 'movie', type: 'upcoming'})
    const { data: watchlistData, } = useGetMoviesAccountQuery({type: 'watchlist', category: 'movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1})

    const [addToWatchlist, {data} ] = useAddToWatchlistMutation();
    console.log(data)
    const { success, info, error } = useNotification();

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                loop={true}
                autoplay={{delay: 15000, disableOnInteraction: false,}}
                spaceBetween={16}
                slidesPerView={1}
            >
                {
                    !isFetchingMovieUpcoming && movieUpcomingData.results.slice(0, 3).map((item, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="hero-slide__item"
                                style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)})`}}
                            >
                                <div className="hero-slide__item--info">
                                    <h3>{item.title}</h3>
                                    <p>{item.overview}</p>
                                </div>
                                <Flex gap="small" wrap="wrap">
                                    <Button type="primary" shape="round" size="large"
                                        onClick={() => {
                                            setIdItem(item.id)
                                            setIsModalOpen(true);
                                    }}>
                                            Watch trailer
                                    </Button>
                                    <Button ghost shape="round" icon={<PlusOutlined />} size="large"
                                        style={{
                                            color: !!watchlistData?.results?.find((movie) => movie.id === item.id) ? "#F59445" : "#FFF",
                                            borderColor: !!watchlistData?.results?.find((movie) => movie.id === item.id) ? "#F59445" : "#FFF"
                                        }}
                                        onClick={ async() => {
                                            if(!isAuthenticated) {
                                                error('Please log in to proceed');
                                            } else {
                                                await addToWatchlist({ user, category: 'movie', id: item.id, isWatchlisted: !!watchlistData?.results?.find((movie) => movie.id === item.id) }).unwrap();
                                                !!watchlistData?.results?.find((movie) => movie.id === item.id) ? info('Successfully removed to watchlist') : success('Successfully added to watchlist');
                                            }
                                    }}>
                                        Watchlist
                                    </Button>
                                </Flex>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <TrailerModal id={idItem} open={isModalOpen} close={closeModal}/>
        </div>
    )
}

export default HeroSlide;
