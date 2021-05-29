import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { fetchMovies } from "reducers/movie";

const MovieContainer = styled.section`
  width: 100vw;  
  display: flex;
  flex-direction: flex-start;
  flex-wrap: wrap;
`;

const Movie = styled.div`
  border: 1px solid #7CA982;
  padding: 20px;
  margin: 10px;
`;

// const Button = styled.button`
//   background-color: #7CA982;
//   color: white;
//   border-radius: 50px;
//   padding: 10px;
//   font-weight: bold;
// `;

export const Movies = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((store) => store.movie.movieList);

  // const onFetchMovies = () => {
  //   dispatch(fetchMovies());
  // };

  // const onButtonClick = () => {
  //   console.log("HELLO");
  //   dispatch(user.actions.setAccesstoken(null));
  //   dispatch(user.actions.setEmail(null));
  // };

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <div>
      {/* <Button
        onClick={onButtonClick}
      >
        Sign out
      </Button> */}
      <MovieContainer>
        {movieList.map((movie) => (
          <Movie key={movie._id}>
            <p>{movie.title}</p>
            <p>{movie.release_year}</p>
          </Movie>
        ))}
      </MovieContainer>
    </div>
  );
};
