import { createSlice } from '@reduxjs/toolkit';

export const movie = createSlice({
  name: 'movie',
  initialState: {
    movieList: [
      {
        title: '',
        release_year: '',
      },
    ],
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
      .then((res) => res.json())
      .then((json) => {
        json.map((movie) => {
          dispatch(movie.action.setMovieList(movie.title));
          dispatch(movie.action.setMovieList(movie.release_year));
        });
      });
  };
};
