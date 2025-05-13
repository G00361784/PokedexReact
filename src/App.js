import React from "react";
import Banner from "./components/banner.js"; // Adjust path as needed
import PokemonEntry from "./components/entry.js";
import PokemonSearchAxios from "./components/input";
function App() {
  
  return (
    <div className="App">
      <h1>My Pokedex</h1>
      <div className="pokedex-grid">
        <entry /> {/* Test empty state */}
      </div>
     
      <PokemonEntry/>
    </div>
  );
}

export default App;