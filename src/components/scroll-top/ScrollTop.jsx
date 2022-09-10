import React, { useEffect, useState } from 'react';

import './scroll-top.scss';

const ScrollTop = () => {
    const [backtoTop, setbacktoTop] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 800) {
                setbacktoTop(true);
            } else {
                setbacktoTop(false);
            }
        })
    }, [])

    const scrolltoTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div>
            {
                backtoTop && (
                    <div className="scroll-top-btn" onClick={scrolltoTop}>
                        <i className='bx bxs-chevrons-up'></i>
                    </div>
                )
            }
        </div>
    )
}

export default ScrollTop;