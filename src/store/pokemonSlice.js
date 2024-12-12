import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  searchTerm: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const pokemonId = action.payload;
      const index = state.favorites.indexOf(pokemonId);
      if (index === -1) {
        state.favorites.push(pokemonId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { toggleFavorite, setSearchTerm } = pokemonSlice.actions;

export default pokemonSlice.reducer;
