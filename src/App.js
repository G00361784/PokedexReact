import React from "react";
import Banner from "./components/banner.js"; // Adjust path as needed
import PokemonEntry from "./components/entry.js";
function App() {
  const bulbasaurData = {
    id: 1,
    name: 'Bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['Grass', 'Poison'],
    height: 0.7,
    weight: 6.9,
    description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
  };

  const charmanderData = {
    id: 4,
    name: 'Charmander',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: ['Fire'],
    height: 0.6,
    weight: 8.5,
    description: 'It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.',
  };

   const pikachuData = {
    id: 25,
    name: 'Pikachu',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['Electric'],
    height: 0.4,
    weight: 6.0,
    description: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.'
  };

  // Example with missing image or some details for testing
  const missingDataPokemon = {
    id: 999,
    name: 'Test Pokemon',
    // imageUrl: null, //  Test with missing image
    types: ['Unknown'],
    description: 'This is a test Pokemon with some missing data.',
  };


  return (
    <div className="App">
      <h1>My Pokedex</h1>
      <div className="pokedex-grid">
        <entry pokemon={bulbasaurData} />
        <entry pokemon={charmanderData} />
        <entry pokemon={pikachuData} />
        <entry pokemon={missingDataPokemon} />
        <entry /> {/* Test empty state */}
      </div>

      <PokemonEntry/>
    </div>
  );
}

export default App;