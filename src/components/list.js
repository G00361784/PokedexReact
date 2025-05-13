import React, { useState, useEffect } from 'react';
import axios from 'axios';
// You can reuse the CSS from the previous example if you name the main div class similarly
// import './PokemonSearch.css'; // Or your preferred CSS file

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      setError(null);
      const pokemonPromises = [];

      for (let i = 1; i <= 100; i++) {
        pokemonPromises.push(
          axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        );
      }

      try {
        const responses = await Promise.all(pokemonPromises);
        // Extract the .data from each Axios response
        const pokemonData = responses.map(response => response.data);
        setPokemonList(pokemonData);
      } catch (err) {
        console.error("Failed to fetch some Pokémon:", err);
        setError("Failed to load all Pokémon. Please try refreshing. " + (err.message || ''));
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <p className="loading-message">Loading Pokémon 1-100...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="pokemon-list-container"> {/* You can style this class */}
      <h1>Pokémon 1-100</h1>
      <div className="pokemon-grid"> {/* For styling the grid of Pokémon */}
        {pokemonList.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card"> {/* Style individual cards */}
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            {pokemon.sprites && pokemon.sprites.front_default && (
              <img src={pokemon.sprites.front_default} alt={`Sprite of ${pokemon.name}`} />
            )}
            <p>#{pokemon.id}</p>
            {/* You can add more details here, e.g., types */}
            {pokemon.types && (
              <div className="pokemon-types">
                <strong>Types: </strong>
                {pokemon.types.map((typeInfo, index) => (
                  <span key={index} className={`type ${typeInfo.type.name}`}>
                    {typeInfo.type.name}
                    {index < pokemon.types.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;