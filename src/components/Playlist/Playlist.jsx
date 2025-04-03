import React from "react";
import "./Playlist.css";

import minusIcon from "../../assets/Minus.svg";


export default function Playlist(props) {
  const playlist = props.playlist.map((track) => (
    <div id = "track" className = "flexContainer" key = {track.id}>
      <div id = "details" className = "flexContainer">
        <h3>{track.name}</h3>
        <p>{track.artist}</p>
      </div>

      <button onClick = {() => (props.removeSong(track.id))} className="minus">
        <img src={minusIcon} alt="icon" />
      </button>
    </div>
  ))

  return(
    <section id = "playlist">
      {playlist}
    </section>
  );
}
