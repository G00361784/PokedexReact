import React, { useState, useEffect } from 'react';

function DittoInfoFetch() {
  const [dittoData, setDittoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDittoData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDittoData(data);
      } catch (error) {
        setError(error.message);
        setDittoData(null); // Clear any old data
      } finally {
        setLoading(false);
      }
    };

    fetchDittoData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <p>Loading Ditto's information...</p>;
  }

  if (error) {
    return <p>Error fetching Ditto's data: {error}</p>;
  }

  if (!dittoData) {
    return <p>No data found for Ditto.</p>;
  }

  return (
    <div>
      <h1>{dittoData.name.charAt(0).toUpperCase() + dittoData.name.slice(1)}</h1>
      <img src={dittoData.sprites.front_default} alt={`Sprite of ${dittoData.name}`} />
      <h2>Abilities:</h2>
      <ul>
        {dittoData.abilities.map((abilityObj, index) => (
          <li key={index}>{abilityObj.ability.name}</li>
        ))}
      </ul>
      <p><strong>Height:</strong> {dittoData.height / 10} m</p> {/* Height is in decimetres */}
      <p><strong>Weight:</strong> {dittoData.weight / 10} kg</p> {/* Weight is in hectograms */}
      <h2>Base Stats:</h2>
      <ul>
        {dittoData.stats.map((statObj, index) => (
          <li key={index}>
            {statObj.stat.name}: {statObj.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DittoInfoFetch;