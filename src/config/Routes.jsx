import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';
import Play from '../pages/Play';
import Person from '../pages/Person';
import Private from '../pages/Private';
import ScrollToTop from '../components/ScrollToTop';

function Containers() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route
                    exact
                    path='/'
                    element={<Home />}
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
                    path='/person/:id'
                    element={<Person />}
                />
                <Route
                    path='/:category'
                    element={<Catalog />}
                />
                <Route
                    path='/favorite'
                    element={<Private />}
                />
                <Route
                    path='/watchlist'
                    element={<Private />}
                />
            </Routes>
        </>
    );
}

export default Containers;
