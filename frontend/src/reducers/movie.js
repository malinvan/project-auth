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
  return (dispatch, getState) => {

    const { user } = getState();
    console.log(user.accessToken);
    fetch('http://localhost:8080/netflix', {
      method: 'GET',
      headers: {
        'Authorization': user.accessToken
      }
    })
      .then((res) => {

        if (!res.ok) {
          // TODO - handle error
          return Promise.reject();
        }

        return res.json();
      })
      .then((json) => {
        dispatch(movie.actions.setMovieList(json));
      });
  };
};
