// src/components/PokemonEntry.js
import React from 'react';
import PropTypes from 'prop-types';
import './pokemonEntry.css'; // We'll create this for styling

const PokemonEntry = ({ pokemon }) => {
  if (!pokemon) {
    return <div className="pokemon-entry-empty">No Pokémon data provided.</div>;
  }

  const { id, name, imageUrl, types, height, weight, description } = pokemon;

  // Helper function to format the Pokedex ID (e.g., 1 -> #001)
  const formatPokedexId = (pokedexId) => {
    return `#${String(pokedexId).padStart(3, '0')}`;
  };

  return (
    <article className="pokemon-entry" aria-labelledby={`pokemon-name-${id}`}>
      <div className="pokemon-entry-header">
        <h2 id={`pokemon-name-${id}`} className="pokemon-name">
          {name}
        </h2>
        <span className="pokemon-id">{formatPokedexId(id)}</span>
      </div>

      <div className="pokemon-entry-content">
        <div className="pokemon-image-container">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="pokemon-image" />
          ) : (
            <div className="pokemon-image-placeholder">No Image</div>
          )}
        </div>

        <div className="pokemon-details">
          <section className="pokemon-types">
            <h3>Type(s)</h3>
            <ul className="types-list">
              {types && types.length > 0 ? (
                types.map((type) => (
                  <li key={type} className={`type-badge type-${type.toLowerCase()}`}>
                    {type}
                  </li>
                ))
              ) : (
                <li>Unknown</li>
              )}
            </ul>
          </section>

          <section className="pokemon-measurements">
            <h3>Measurements</h3>
            <p>
              <strong>Height:</strong> {height !== undefined ? `${height} m` : 'N/A'}
            </p>
            <p>
              <strong>Weight:</strong> {weight !== undefined ? `${weight} kg` : 'N/A'}
            </p>
          </section>

          {description && (
            <section className="pokemon-description">
              <h3>Description</h3>
              <p>{description}</p>
            </section>
          )}
        </div>
      </div>
    </article>
  );
};

PokemonEntry.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    height: PropTypes.number,
    weight: PropTypes.number,
    description: PropTypes.string,
  }),
};

PokemonEntry.defaultProps = {
  pokemon: null,
};

export default PokemonEntry;