import React, { useState, useEffect } from 'react';

import './movie-list-row.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from 'swiper';

import tmdbApi, { category } from '../../api/tmdbApi';

import MovieCardRow from '../movie-card/MovieCardRow';

const MovieListRow = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params});
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params});
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, []);

    return (
        <div className="movie-list-row">
            <Swiper
                modules={[Navigation]}
                navigation={true}
                grabCursor={true}
                spaceBetween={20}
                slidesPerView={'auto'}
                slidesPerGroup={2}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCardRow item={item} category={props.category}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default MovieListRow;
