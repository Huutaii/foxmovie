import React, { useState, useEffect } from 'react';

import './movie-list-column.scss';

import { SwiperSlide, Swiper } from 'swiper/react';

import tmdbApi from '../../api/tmdbApi';

import MovieCardColumn from '../movie-card/MovieCardColumn';

const MovieListColumn = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            try {
                const response = await tmdbApi.trending(props.category, props.time);
                setItems(response.results);
            } catch {
                console.log('error');
            }
        }
        getList();
    }, []);

    return (
        <div className="movie-list-column">
            <Swiper
                direction={"vertical"}
                grabCursor={true}
                spaceBetween={5}
                slidesPerView={'auto'}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCardColumn item={item} category={props.category} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default MovieListColumn;
