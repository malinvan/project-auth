import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { fetchMovies } from "reducers/movie";
import { user } from "../reducers/user";

const Button = styled.button`
  border-radius: 50px;
  padding: 10px;
  font-weight: bold;
`;

export const Movies = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((store) => store.movie.movieList);

  const onFetchMovies = () => {
    dispatch(fetchMovies());
  };

  const onButtonClick = () => {
    console.log("HELLO");
    dispatch(user.actions.setAccesstoken(null));
    dispatch(user.actions.setEmail(null));
  };

  useEffect(() => {
    onFetchMovies();
  }, []);

  return (
    <div>
      <Button
      // onClick={onButtonClick}
      >
        Sign out
      </Button>
      {movieList.map((movie) => (
        <div key={movie._id}>
          <p>{movie.title}</p>
          <p>{movie.release_year}</p>
        </div>
      ))}
    </div>
  );
};
