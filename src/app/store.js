import { configureStore } from '@reduxjs/toolkit'
import { tmdbApi } from '../services/tmdb'
import userReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})