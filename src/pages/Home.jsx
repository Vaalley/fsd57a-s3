import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Home() {
  const favoriteCount = useSelector((state) => state.pokemon.favorites.length);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to PokéDex</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore the world of Pokémon! You have {favoriteCount} favorite Pokémon.
          </p>
          <div className="space-x-4">
            <Link
              to="/pokemon"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              View All Pokémon
            </Link>
            <Link
              to="/favorites"
              className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              View Favorites
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
