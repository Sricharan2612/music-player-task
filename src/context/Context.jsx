import React, { createContext, useContext, useRef, useState } from 'react';
import chillHop from '../data';

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [songs, setSongs] = useState(chillHop());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    });
    const audioRef = useRef(null);
    const formatTime = (time) => {
        return Math.floor(time / 60) + ":" + ('0' + Math.floor(time % 60)).slice(-2);
    };

    const contextVal = {
        songs,
        setSongs,
        currentSong,
        setCurrentSong,
        audioRef,
        isPlaying,
        setIsPlaying,
        songInfo,
        setSongInfo,
        formatTime
    };
    return (
        <Context.Provider value={contextVal}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;

export const ContextState = () => {
    return useContext(Context);
};
