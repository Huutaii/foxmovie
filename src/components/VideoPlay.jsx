import React, { useEffect, useState } from 'react';
import { Button, Drawer, Popover } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';

import Season from './Season';

const VideoPlay = props => {
    const [open, setOpen] = useState(false);

    const [src, setSrc] = useState();
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);

    const callbackFunction = (seasonData, episodeData) => {
        setSeason(seasonData);
        setEpisode(episodeData);
    }

    const showDrawer = () => {
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        const getSrc = () => {
            if (props.category === 'movie') {
                setSrc(`https://2embed.cc/embed/${props.id}`);
            } else {
                setSrc(`https://2embed.cc/embedtv/${props.id}&s=${season}&e=${episode}`);
            }
        }
        getSrc();
    }, [props.category, props.id, season, episode]);

    return (
        <>  
            <div className="relative">
                <iframe 
                    src={src}
                    width="100%"
                    title="video"
                    allowFullScreen
                    className="video-iframe mb-2"
                ></iframe>
                { props.category === 'tv' &&
                    <Popover placement="leftTop" content="Season & Episode">
                        <Button className="video-btn" onClick={showDrawer}>
                            <OrderedListOutlined />
                        </Button>
                    </Popover>
                }
            </div>
            { props.category === "tv" && (
                <Drawer
                    placement="bottom"
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key="bottom"
                    className="video-drawer-episode"
                >
                    <Season category={props.category} id={props.id} seasons={props.seasons} videoplayCallback={callbackFunction}/>
                </Drawer>
            )}
        </>
    )
}

export default VideoPlay;