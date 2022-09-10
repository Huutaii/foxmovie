import 'swiper/css';
import 'swiper/css/navigation';

import './assets/boxicons-2.1.2/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Containers from './config/Routes';
import ScrollTop from './components/scroll-top/ScrollTop';

function App() {
    return (
        <BrowserRouter>
                <>
                    <Header/>
                    <Containers/>
                    <Footer/>
                    <ScrollTop/>
                </>
        </BrowserRouter>
    );
}

export default App;
