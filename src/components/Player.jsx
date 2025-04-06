import React from 'react';
import { FaForward, FaBackward, FaPlay, FaPause } from "react-icons/fa";
import { ContextState } from '../context/Context';
import { playAudio } from '../util';

const Player = () => {
    const { currentSong, setCurrentSong, songs, setSongs, audioRef, isPlaying, setIsPlaying, songInfo, setSongInfo } = ContextState();
    const handlePlay = () => {
        setIsPlaying(!isPlaying);

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const handleSongSelection = (song) => {
        setCurrentSong(song);

        const setNewActiveSongs = songs?.map((s) => {
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
    };

    const handleDrag = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };

    const handleSkipTrack = async (direction) => {
        const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        if (direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            handleSongSelection(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === 'skip-back') {

            if (currentIndex - 1 % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                handleSongSelection(songs[songs.length - 1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            handleSongSelection(songs[(currentIndex - 1) % songs.length]);
        }
        playAudio(isPlaying, audioRef);

    };


    return (
        <div className='player'>
            <div className="song-info">
                <h3>{currentSong.name}</h3>
                <p>{currentSong.artist}</p>
                <img src={currentSong.cover} alt={currentSong.name} />
            </div>
            <div className="controls">
                <div className='time-control'>
                    <div className="track">
                        <input type="range" min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={handleDrag} />
                        <div style={trackAnim} className="animate-track"></div>
                    </div>
                </div>
                <div className="player-control">
                    <FaBackward className='skip-backward' onClick={() => handleSkipTrack('skip-back')} />
                    <div onClick={handlePlay} className='playPauseBtn' >
                        {isPlaying
                            ? (<FaPause />)
                            : (<FaPlay />)}
                    </div>
                    <FaForward className='skip-forward' onClick={() => handleSkipTrack('skip-forward')} />
                </div>
            </div>
        </div>
    );
};

export default Player;

//