import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemonDetails } from '../services/pokemonService';

export function Favorites() {
  const favorites = useSelector((state) => state.pokemon.favorites);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const details = await Promise.all(
          favorites.map((id) => getPokemonDetails(id))
        );
        setPokemonDetails(details);
      } catch (error) {
        console.error('Error fetching favorite Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">No Favorites Yet</h1>
          <p className="text-gray-600 mb-8">
            Start adding some Pokemon to your favorites!
          </p>
          <Link
            to="/pokemon"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Pokemon
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Favorite Pokemon</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pokemonDetails.map((pokemon) => (
            <Link
              key={pokemon.id}
              to={`/pokemon/${pokemon.id}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full h-32 object-contain"
              />
              <h2 className="text-center mt-2 capitalize font-medium">
                {pokemon.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
