import React, { useEffect, useState } from 'react';
import Season from '../season/Season';

import './video-play.scss';

const VideoPlay = props => {
    const [src, setSrc] = useState();
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);

    const callbackFunction = (seasonData, episodeData) => {
        setSeason(seasonData);
        setEpisode(episodeData);
    }

    useEffect(() => {
        const getSrc = () => {
            if (props.category === 'movie') {
                setSrc(`https://2embed.org/embed/movie?tmdb=${props.id}`);
            } else {
                setSrc(`https://2embed.org/embed/series?tmdb=${props.id}&sea=${season}&epi=${episode}`);
            }
        }
        getSrc();
    }, [props.category, props.id, season, episode]);

    return (
        <div className="mb-3">  
            <iframe 
                src={src}
                width="100%"
                title="video"
                allowFullScreen
                className="video-iframe mb-2"
            ></iframe>
            {
                props.category === "tv" && (
                    <Season category={props.category} id={props.id} seasons={props.seasons} videoplayCallback={callbackFunction}/>
                )
            }
            
        </div>
    )
}

export default VideoPlay;