import React from 'react';
import Playlist from './Playlist';
import Player from './Player';

const Main = () => {
    return (
        <div className='main'>
            <Playlist />
            <Player />
        </div>
    );
};

export default Main;
