import { createSlice } from '@reduxjs/toolkit';

export const movie = createSlice({
  name: 'movie',
  initialState: {
    movieList: [],
  },
  reducers: {
    setMovieList: (store, action) => {
      store.movieList = action.payload;
    },
  },
});

export const fetchMovies = () => {
  return (dispatch) => {
    fetch('http://localhost:8080/netflix')
      .then((res) => res.json)
      .then((books) => {
        dispatch(movie.action.setMovieList(books));
      });
  };
};
