import React, { useState } from 'react';
import Song from './Song';
import { CiSearch } from "react-icons/ci";
import { ContextState } from '../context/Context';

const Playlist = () => {
    const { songs, currentSong } = ContextState();
    const [searchedResults, setSearchedResults] = useState([]);
    const [userInput, setUserInput] = useState('');

    const handleSearch = (e) => {
        const inputVal = e.target.value;
        setUserInput(inputVal);
        if (userInput !== '') {
            const filterList = songs.filter((song) => (song.name.toLowerCase()).includes(userInput.toLowerCase()));
            setSearchedResults(filterList);
        } else {
            setSearchedResults(songs);
        }

    };

    return (
        <div className="playlist">
            <h3>For You</h3>
            <div className="search-box">
                <input value={userInput} onChange={handleSearch} type="text" className='search-bar' placeholder='Search Song, Artist' />
                <CiSearch fontSize={20} />
            </div>
            <div className='playlist-songs'>
                {
                    (userInput !== '' ? searchedResults : songs)?.map((song) => (
                        < Song key={song.id} song={song} className={song.name === currentSong.name ? 'active-song' : ''} />
                    ))
                }
            </div>
        </div>
    );
};

export default Playlist;