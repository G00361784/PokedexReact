import React from "react";
import PokemonEntry from "./components/entry.js";
import PokemonList from "./components/list.js";
import "./App.css"
function App() {
  
  return (
    <div className="App">
      <h1>My Pokedex</h1>
      <div className="pokedex-grid">
      </div>
      <PokemonList/>
      <PokemonEntry/>
    </div>
  );
}

export default App;