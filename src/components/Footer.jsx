import React from 'react';
import { Link } from 'react-router-dom';

import bg from '../assets/imgs/footer-bg.jpg';
import logo from '../assets/imgs/logo.png';

function Footer() {
    return (
        <div className="footer" style={{backgroundImage: `url(${bg})`}}>
            <div className='container'>
                <div className="footer__content">
                    <div className="footer__content__logo">
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="footer__content__menus">
                        <div className="footer__content__menu">
                            <Link to="/">Contact us</Link>
                            <Link to="/">FAQ</Link>
                            <Link to="/">Premium</Link>
                            <Link to="/">Pravacy policy</Link>
                        </div>
                        <div className="footer__content__text">
                            <p>This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
                            <p>Copyright © Newmovies</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
