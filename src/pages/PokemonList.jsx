import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemonList } from '../services/pokemonService';
import { setSearchTerm } from '../store/pokemonSlice';

export function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchTerm = useSelector((state) => state.pokemon.searchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList(151); // Get first 151 Pokemon
        setPokemon(data.results);
        // console.log(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPokemon.map((p) => {
            const id = p.url.split('/')[6];
            return (
              <Link
                key={id}
                to={`/pokemon/${id}`}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={p.name}
                  className="w-full h-32 object-contain"
                />
                <h2 className="text-center mt-2 capitalize font-medium">{p.name}</h2>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
