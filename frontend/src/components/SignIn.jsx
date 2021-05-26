import React, { 
  useState, 
  useDispatch,
  useEffect
} from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from "styled-components/macro";
import { fetchMovies } from "reducers/movie";
import { API_URL } from "../reusable/urls";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 0 auto;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  background-color: black;
`;

export const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(null);

  const accessTooken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push('/movies');
    }
  }, [accessToken])

  const submit = (e) => {
    e.preventDefault();
    fetch(API_URL(mode))
    // dispatch(fetchMovies(value));
  }

  return (
    <FormContainer>
      <h2>Sign In!</h2>
      <label>email</label>
      <Input
        type="text"
        id="email"
        value="email"
        onChange={e => setUsername(e.target.value)}
      ></Input>
      <label>password</label>
      <Input
        type="password"
        id="password"
        value="password"
        onChange={e => setPassword(e.target.value)}
      ></Input>
      <button
        type="submit"
        onClick={() => setMode('singin')}
      >Sign In</button>
      <button
        type="submit"
        onClick={() => setMode('singup')}
      >Sign Up</button>
    </FormContainer>
  )
}