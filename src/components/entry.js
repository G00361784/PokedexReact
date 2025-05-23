import React, { useState, useEffect } from 'react';

function PokemonSearchFetch() {
  const [pokemonNameInput, setPokemonNameInput] = useState(''); // For the input field
  const [pokemonToSearch, setPokemonToSearch] = useState(''); // Pokemon name/ID to actually search
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false); // Initially not loading
  const [error, setError] = useState(null);

  // This useEffect will run whenever 'pokemonToSearch' changes and is not empty
  useEffect(() => {
    if (!pokemonToSearch) {
      setPokemonData(null); // Clear data if search term is cleared
      return;
    }

    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);
      setPokemonData(null); // Clear previous data before new search

      try {
        // Ensure the input is lowercase as PokeAPI names are typically lowercase
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonToSearch.toLowerCase()}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Pokemon "${pokemonToSearch}" not found.`);
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        setError(error.message);
        setPokemonData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonToSearch]); // Re-run effect when pokemonToSearch changes

  const handleInputChange = (event) => {
    setPokemonNameInput(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    if (pokemonNameInput.trim()) {
        setPokemonToSearch(pokemonNameInput.trim());
    } else {
        setError("Please enter a Pokémon name or ID.");
        setPokemonData(null);
        setPokemonToSearch(''); // Clear any previous search term
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={pokemonNameInput}
          onChange={handleInputChange}
          placeholder="Enter Pokémon name or ID"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading Pokémon information...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {pokemonData && (
        <div>
          <h1>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h1>
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

export default PokemonSearchFetch;