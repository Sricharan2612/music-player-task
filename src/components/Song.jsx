import React from 'react';
import song1 from '../assets/song1.png';
import { ContextState } from '../context/Context';
import { playAudio } from '../util';


const Song = ({ song }) => {
    const { setCurrentSong, songs, setSongs, isPlaying, audioRef } = ContextState();
    const handleSongSelection = () => {
        setCurrentSong(song);

        const setNewActiveSongs = songs.map((s) => {
            if (s.id === song.id) {
                return {
                    ...s,
                    active: true
                };
            } else {
                return {
                    ...s,
                    active: false
                };
            }
        });
        setSongs(setNewActiveSongs);
        playAudio(isPlaying, audioRef);
    };
    return (
        <div className={`playlist-song ${song.active ? 'active-song' : ''}`} onClick={handleSongSelection}>
            <div className="song-info">
                <img src={song.cover} alt="songImage" />
                <div className="song-name">
                    <h5>{song.name}</h5>
                    <p>{song.artist}</p>
                </div>
            </div>
            <p className="song-duration">{song.duration}</p>
        </div>
    );
};

export default Song;