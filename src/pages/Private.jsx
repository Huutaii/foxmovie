import React, { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Skeleton, Tabs, Pagination } from 'antd';

import { useGetMoviesAccountQuery } from '../services/tmdb'
import { userSelector } from "../features/authSlice";
import apiConfig from '../api/apiConfig';

function Private() {
    const { user } = useSelector(userSelector);
    
    const [page, setPage] = useState(1)
    const [category, setCategory] = useState("movies")

    let navigate = useNavigate();
    const location = useLocation();
    
    const { data, isFetching, refetch } = useGetMoviesAccountQuery({type: location.pathname.split('/').pop(), category: category, accountId: user.id, sessionId: localStorage.getItem('session_id'), page: page})

    useEffect(() => {
        refetch()
    }, [])
    
    return (
        <div className="private">
            <Tabs
                defaultActiveKey="1"
                items={['movies', 'tv'].map((itemTab, i) => {
                    return {
                        key: itemTab,
                        label: itemTab,
                        children: (
                            <>
                                <div className="categories__list">
                                    {
                                        isFetching ? (
                                            (new Array(20).fill(0).map((_, index) => (
                                                <Skeleton.Node key={index} active>
                                                    <div></div>
                                                </Skeleton.Node>
                                            )))
                                        ) : (
                                            data?.results.map((item, i) => (
                                                <Link to={`/${itemTab === 'movies' ? 'movie' : 'tv'}/${item.id}`} key={i} className="categories__item">
                                                    <img src={`${apiConfig.w500Image(item.poster_path || item.poster_path || item.profile_path)}`} alt="" />
                                                    <div className="categories__item--info">
                                                        <p>{item.title || item.name}</p>
                                                    </div>
                                                </Link>
                                            ))
                                        )
                                    }
                                </div>
                                { (!isFetching && data?.total_pages > 1) && 
                                    <Pagination
                                        style={{ marginTop: "32px", textAlign: "center" }}
                                        defaultCurrent={page}
                                        pageSize={20}
                                        total={data?.total_results}
                                        showSizeChanger={false}
                                        onChange={(e) => {
                                            setPage(e);
                                            window.scrollTo(0,0)
                                        }}
                                    />
                                }
                            </>
                            
                        ),
                }})}
                onChange={activeKey => setCategory(activeKey)}
            />
        </div>
    )
}

export default Private;
