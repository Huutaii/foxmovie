import React, { useEffect, useState } from 'react';

import tmdbApi from '../../api/tmdbApi';
import './season.scss';

const Season = props => {
    const [seasonName, setseasonName] = useState("Choose season");

    const handleOption = (event) => {
        event.stopPropagation();
        document.querySelector('.option-list').classList.toggle('display-none');
    };

    const sendSeason = (seasonNumber, episodeNumber, seasonName) => {
        props.videoplayCallback(seasonNumber, episodeNumber);
        setseasonName(seasonName);
        
    }

    const handleSeason = () => {
        const Options = document.querySelectorAll('.option-list-item');
        const Seasons = document.querySelectorAll('.tv-episodes-wrap');
        document.querySelector('.option-text').innerHTML = seasonName;
        document.querySelector('.option-list').classList.add('display-none');

        Options.forEach( (Option, index) => {
            const Season = Seasons[index];
            Option.onclick = () => {
                document.querySelector('.tv-episodes-wrap.active').classList.remove('active');
                Season.classList.add('active');
            }
        })
    }

    useEffect(() => {
        handleSeason();
    })

    return (
        <div className='season'>
            <div className='option'>
                <div className='option-choose' onClick={handleOption}>
                    <i class='bx bx-list-ul'></i>
                    <div className='option-text'>Choose season</div>
                    <i class='bx bxs-chevron-down' ></i>
                </div>
                <div className='option-list display-none'>
                    {
                        props.seasons.map((season) => (
                            <div key={season.id} className='option-list-item' onClick={() => sendSeason(season.season_number, 1, season.name)}>{season.name}</div>
                        ))
                    }
                </div>
            </div>
            {
                props.seasons.map((season, i) => (
                    <div key={i}>
                        {
                            season.season_number === 1 ? (
                                <div className='mt-1 tv-episodes-wrap active'>
                                    <Episode category={props.category} id={props.id} seasonNumber={season.season_number} seasonName={season.name} seasonCallback={sendSeason}/>
                                </div>
                            ) : (
                                <div className='mt-1 tv-episodes-wrap'>
                                    <Episode category={props.category} id={props.id} seasonNumber={season.season_number} seasonName={season.name} seasonCallback={sendSeason}/>
                                </div>
                            )
                        }            
                    </div>
                ))
            }
        </div>
    )
}

const Episode = props => {
    const [item, setItem] = useState([]);
    const [active, setActive] = useState(1);

    const sendEpisode = (seasonNumber, episodeNumber, seasonName) => {
        setActive(episodeNumber);
        props.seasonCallback(seasonNumber, episodeNumber, seasonName);
        window.scrollTo({top: 65, behavior: 'smooth'});
    }
    
    useEffect(() => {
        const getTVSeasons = async () => {
            const response = await tmdbApi.getTVSeasons(props.id, props.seasonNumber);
            setItem(response.episodes);
            console.log(response.episodes)
        }
        getTVSeasons();
    }, [props.id, props.seasonNumber]);

    return (
        <div className='tv-episodes'>
            {
                item.map((episode, i) => (
                    <div key={i} className='tv-episode'
                        style={ active === episode.episode_number ? {backgroundColor: '#D2691E'} : {}} 
                        onClick={() => sendEpisode(props.seasonNumber, episode.episode_number, props.seasonName)}>
                            Eps {episode.episode_number}: {episode.name}
                    </div>
                ))
            }
            
        </div>
    )
}

export default Season;