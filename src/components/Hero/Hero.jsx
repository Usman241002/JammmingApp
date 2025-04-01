import React from "react";
import './Hero.css';


export default function Hero(props) {
  return(
    <section id = "hero">
      <form id = "searchForm" onSubmit = {props.searchSong} className = "flexContainer">
        <input type = "text" id = "songInput" name = "songInput" required/>
        <input type = "submit" value = "Search" className = "button flexContainer"/>
      </form>
    </section>
  );
}
