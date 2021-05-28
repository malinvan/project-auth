import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import styled from "styled-components/macro";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { movie } from "reducers/movie";
import { user } from "reducers/user";

import { Movies } from "components/Movies";
import { SignIn } from "components/SignIn";
import { Main } from "components/Main";

const reducer = combineReducers({
  user: user.reducer,
  movie: movie.reducer,
});

const store = configureStore({ reducer });

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Container>
            <Route path="/" exact component={Main} />
            <Route path="/signin" component={SignIn} />
            <Route path="/netflix" component={Movies} />
          </Container>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
