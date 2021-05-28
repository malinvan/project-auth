import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from 'reducers/movie';

export const Movies = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((store) => store.movie.movieList);


  const onFetchMovies = () => {
    dispatch(fetchMovies());
  };

  useEffect(() => {
    onFetchMovies();
  }, []);

  return (
      <div>
        {movieList.map((movie) => (
          <div key={movie._id}>
            <p>{movie.title}</p>
            <p>{movie.release_year}</p>
          </div>
        ))}
      </div>
  );
}