import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { movie } from 'reducers/movie';
import { user } from 'reducers/user';
import styled from 'styled-components/macro';
import { 
  BrowserRouter, 
  Route, 
  Switch 
} from 'react-router-dom'

import { Movies } from 'components/Movies';
import { SignUp } from 'components/SignUp';
import { SignIn } from 'components/SignIn';
import { Header } from 'components/Header';

const reducer = combineReducers({
  user: user.reducer,
  movie: movie.reducer
});

const store = configureStore({ reducer });

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/* <Container> */}
            <Header />
            <Route path="/" component={LandingPage} />  
            <Route path="/SignIn">
              <SignIn />
            {/* </Route>
            <Route path="/SignUp"> */}
              <SignUp />
            </Route> 
            <Route path="/movies" exact>
              <Movies />
            </Route> 
          {/* </Container> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
