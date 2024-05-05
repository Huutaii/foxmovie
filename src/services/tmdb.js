import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import apiConfig from "../api/apiConfig";

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiConfig.baseUrl }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: ({category, type, page = 1, time, genreId, query}) => {
                if (genreId) {
                    return `discover/${category}?with_genres=${genreId}&page=${page}&api_key=${apiConfig.apiKey}`
                }
                if (category && category === "trending") {
                    return `${category}/all/${time}?page=${page}&api_key=${apiConfig.apiKey}`
                }
                if (category && category === "search") {
                    return `search/multi?query=${query}&page=${page}&api_key=${apiConfig.apiKey}`
                }
                return `${category}/${type}?page=${page}&append_to_response=videos,credits&api_key=${apiConfig.apiKey}`
            },
        }),
        getVideos: builder.query({
            query: ({category, id}) => `${category}/${id}/videos?api_key=${apiConfig.apiKey}`,
        }),
        getGenres: builder.query({
            query: (category) => `genre/${category}/list?api_key=${apiConfig.apiKey}`,
        }),
        getDetails: builder.query({
            query: ({category, id}) => `${category}/${id}?append_to_response=videos,credits&api_key=${apiConfig.apiKey}`,
        }),
        getRecommendations: builder.query({
            query: ({category, id, page = 1}) => `${category}/${id}/recommendations?page=${page}&api_key=${apiConfig.apiKey}`,
        }),
        getReviews: builder.query({
            query: ({category, id}) => `${category}/${id}/reviews?api_key=${apiConfig.apiKey}`,
        }),
        getPersonDetail: builder.query({
            query: (id) => `person/${id}?api_key=${apiConfig.apiKey}`,
        }),
        getMoviesByPersonId: builder.query({
            query: ({id, page = 1}) => `discover/movie?with_cast=${id}&page=${page}&api_key=${apiConfig.apiKey}`,
        }),
    }),
})

export const { useGetMoviesQuery, useGetVideosQuery, useGetGenresQuery, useGetDetailsQuery, useGetRecommendationsQuery, useGetReviewsQuery, useGetPersonDetailQuery, useGetMoviesByPersonIdQuery } = tmdbApi