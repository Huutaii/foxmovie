import React, { useState } from "react";
import { useParams, useLocation } from 'react-router';
import { Link, useNavigate } from "react-router-dom";
import { Skeleton, Pagination } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import { useGetMoviesQuery, useGetGenresQuery } from '../services/tmdb'

import apiConfig from '../api/apiConfig';

import headingBg from '../assets/imgs/heading.jpeg';


function Catalog() {
    const [page, setPage] = useState(1)
    
    let navigate = useNavigate();
    const urlParams = new URLSearchParams(useLocation().search);
    const querySearch = urlParams.get('query');
    const genreId = urlParams.get('genreId');
    
    const { category } = useParams();
    const { data, isFetching } = useGetMoviesQuery({category: category, type: !['trending', 'search'].includes(category) && 'popular', page: page, time: category === 'trending' && 'week', genreId: genreId, query: querySearch})
    const { data: genres, error: genresError, isFetching: isFetchingGenres } = useGetGenresQuery(category)
    
    return (
        <div className="categories">
            <div className="heading" style={{backgroundImage: `url(${headingBg})`}}>
                <h1>{category}</h1>
            </div>
            { !genresError && 
                <Swiper
                    initialSlide="3"
                    slidesPerView={'auto'}
                    spaceBetween={8}
                    freeMode={true}
                    modules={[FreeMode]}
                    onClick={(swiper, event) => {
                        swiper.slideTo(swiper.clickedIndex);
                    }}
                    className="genresSwiper"
                    style={{ marginBottom: "16px" }}
                >
                        {
                            !isFetchingGenres && genres.genres.map((item, i) => (
                                <SwiperSlide key={i} className={(genreId == item.id) && 'current'} onClick={() => navigate(`?genreId=${item.id}`)}>
                                    <div>{item.name}</div>
                                </SwiperSlide>
                            ))
                        }
                </Swiper>
            }
            <div className="categories__list">
                {
                    isFetching ? (
                        (new Array(20).fill(0).map((_, index) => (
                            <Skeleton.Node key={index} active>
                                <div></div>
                            </Skeleton.Node>
                        )))
                    ) : (
                        data.results.map((item, i) => (
                            <Link to={['trending', 'search'].includes(category) ? `/${item.media_type}/${item.id}` : `/${category}/${item.id}`} key={i} className="categories__item">
                                <img src={`${apiConfig.originalImage(item.poster_path || item.poster_path || item.profile_path)}`} alt="" />
                                <div className="categories__item--info">
                                    <p>{item.title || item.name}</p>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>

            { !isFetching && 
                <Pagination
                    style={{ marginTop: "32px", textAlign: "center" }}
                    defaultCurrent={page}
                    pageSize={20}
                    total={data.total_results}
                    showSizeChanger={false}
                    onChange={(e) => {
                        setPage(e);
                        window.scrollTo(0,0)
                    }}
                />
            }
        </div>
    )
}

export default Catalog;
