import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonSearch.css'; 

function PokemonSearchAxios() {
  const [pokemonNameInput, setPokemonNameInput] = useState('');
  const [pokemonToSearch, setPokemonToSearch] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonToSearch) {
      setPokemonData(null);
      return;
    }

    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      setPokemonData(null);

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonToSearch.toLowerCase()}`);
        setPokemonData(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(`Pokemon "${pokemonToSearch}" not found.`);
        } else {
          setError(err.message);
        }
        setPokemonData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonToSearch]);

  const handleInputChange = (event) => {
    setPokemonNameInput(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (pokemonNameInput.trim()) {
        setPokemonToSearch(pokemonNameInput.trim());
    } else {
        setError("Please enter a Pokémon name or ID.");
        setPokemonData(null);
        setPokemonToSearch('');
    }
  };

  // Add the class name to the root div
  return (
    <div className="pokemon-search-container"> {/* <--- Added class here */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={pokemonNameInput}
          onChange={handleInputChange}
          placeholder="Enter Pokémon name or ID"
        />
        <button type="submit">Search</button>
      </form>

      {/* Added class names for messages */}
      {loading && <p className="loading-message">Loading Pokémon information...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {/* Added a wrapper div with class for data */}
      {pokemonData && (
        <div className="pokemon-data">
          <h1>{pokemonData.name}</h1> {/* Capitalization can be done in JS or CSS text-transform */}
          {pokemonData.sprites && pokemonData.sprites.front_default && (
             <img src={pokemonData.sprites.front_default} alt={`Sprite of ${pokemonData.name}`} />
          )}
          <h2>Abilities:</h2>
          <ul>
            {pokemonData.abilities && pokemonData.abilities.map((abilityObj, index) => (
              <li key={index}>{abilityObj.ability.name}</li>
            ))}
          </ul>
          {pokemonData.height !== undefined && <p><strong>Height:</strong> {pokemonData.height / 10} m</p>}
          {pokemonData.weight !== undefined && <p><strong>Weight:</strong> {pokemonData.weight / 10} kg</p>}
          <h2>Base Stats:</h2>
          <ul>
            {pokemonData.stats && pokemonData.stats.map((statObj, index) => (
              <li key={index}>
                {statObj.stat.name}: {statObj.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonSearchAxios;