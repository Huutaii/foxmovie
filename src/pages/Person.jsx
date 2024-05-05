import React, { useState } from "react";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import { Flex, Skeleton, Pagination } from 'antd';

import { useGetPersonDetailQuery, useGetMoviesByPersonIdQuery } from '../services/tmdb'

import apiConfig from '../api/apiConfig';

function Person() {
    const [page, setPage] = useState(1)
    const { id } = useParams();

    const { data: dataPerson, isFetching: isFetchingPerson } = useGetPersonDetailQuery(id)
    const { data: dataMovies, isFetching: isFetchingMovies } = useGetMoviesByPersonIdQuery({id: id, page: page})
    
    return (
        <div className="person">
            {
                (isFetchingPerson && isFetchingMovies) ? (
                    <>
                        <Flex gap="large" align="center">
                            <Skeleton.Node active className="person-poster">
                                <div></div>
                            </Skeleton.Node>
                            <div className="flex-1">
                                <Skeleton active paragraph={{ rows: 8 }} />
                                <br />
                                <Skeleton.Button active />
                            </div>
                        </Flex>
                        <br />
                        <div className="categories__list">
                            {
                                (new Array(20).fill(0).map((_, index) => (
                                    <Skeleton.Node key={index} active>
                                        <div></div>
                                    </Skeleton.Node>
                                )))
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <Flex gap="large">
                            <img src={apiConfig.originalImage(dataPerson?.profile_path)} className="person-poster" alt=""/>
                            <div className="flex-1">
                                <h1>{ dataPerson?.name }</h1>
                                <p>{ dataPerson?.biography }</p>
                            </div>
                        </Flex>
                        { dataMovies?.results.length > 0 &&
                            <div className="person-movies">
                                <h2>Be featured in</h2>
                                <div className="categories__list">
                                    {
                                        dataMovies?.results.map((item, i) => (
                                            <div className="categories__list">
                                                <Link to={`/movie/${item.id}`} key={i} className="categories__item">
                                                    <img src={`${apiConfig.originalImage(item.poster_path ? item.poster_path : item.backdrop_path)}`} alt="" />
                                                    <div className="categories__item--info">
                                                        <p>{item.title ? item.title : item.name}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                { dataMovies?.total_pages > 1 &&
                                    <Pagination
                                        style={{ marginTop: "32px", textAlign: "center" }}
                                        defaultCurrent={page}
                                        pageSize={20}
                                        total={dataMovies.total_results}
                                        showSizeChanger={false}
                                        onChange={(e) => {
                                            setPage(e);
                                            window.scrollTo(0,0)
                                        }}
                                    />
                                }
                            </div>
                        }
                    </>
                )
            }
        </div>
    )
}

export default Person;
