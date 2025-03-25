import React from "react";
import '../styles/Results.css';

import plusIcon from "../assets/Plus.svg";


export default function Results(props) {
  const results = props.results.map((track) => (
    <div id = "result" className = "flexContainer" key = {track.id}>
      <div id = "details" className = "flexContainer">
        <h3>{track.name}</h3>
        <p>{track.artists}</p>
      </div>

      <button onClick = {() => props.addSong(track)} className="add">
        <img src={plusIcon} alt="icon" />
      </button>
    </div>
  ))

  return(
    <section id = "results">
      {results}
    </section>
  );
}
