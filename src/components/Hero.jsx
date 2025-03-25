import React from "react";
import '../styles/Hero.css';

//create a local source of truth

export default function Hero(props) {
  return(
    <section id = "hero">
      <form onSubmit = {props.searchSong} className = "flexContainer">
        <input type = "text" id = "songInput" name = "songInput"/>
        <input type = "submit" value = "Search" className = "button flexContainer"/>
      </form>
    </section>
  );
}
