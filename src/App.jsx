import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { ContextState } from "./context/Context";

function App() {
  const { currentSong, audioRef, setSongInfo, songInfo } = ContextState();
  const handleTimeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation });
  };
  return (
    <div className="App" style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }}>
      <Navbar />
      <Main />
      <audio ref={audioRef} src={currentSong.audio} onTimeUpdate={handleTimeUpdate} />
    </div>
  );
}

export default App;
