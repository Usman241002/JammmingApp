import React from "react";
import '../../styles/Hero.css';

export default function Hero() {
  return(
    <section id = "hero">
      <form onSubmit = "" className = "flexContainer">
        <input type = "text" id = "songInput"/>
        <input type = "submit" value = "Search" className = "button flexContainer"/>
      </form>
    </section>
  );
}
