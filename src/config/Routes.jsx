import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Play from '../pages/play/Play';

function Containers() {
    return (
        <Routes>
            <Route
                exact
                path='/'
                element={<Home />}
            />
            <Route
                path='/:category/search/:keyword'
                element={<Catalog />}
            />
            <Route
                path='/:category/genre/:genrecode'
                element={<Catalog />}
            />
            <Route
                path='/:category/year/:year'
                element={<Catalog />}
            />
            <Route
                path='/:category/cast/:castid'
                element={<Catalog />}
            />
            <Route
                path='/:category/:id/play'
                element={<Play />}
            />
            <Route
                path='/:category/:id'
                element={<Detail />}
            />            
            <Route
                path='/:category'
                element={<Catalog />}
            />
        </Routes>
    );
}

export default Containers;
