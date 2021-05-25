import React, { useState, useDispatch } from 'react';
import styled from 'styled-components/macro';
import { fetchMovies } from 'reducers/movie';

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

const Button = styled.button`
  background-color: white;
`;

export const SignUp = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(fetchMovies(value));
  }

  return (
    <FormContainer>
      <h2>Sign Up!</h2>
      <label>email</label>
      <Input
        type="text"
        id="email"
        placeholder="email"
        onChange={e => setValue(e.target.value)}
      ></Input>
      <label>name</label>
      <Input
        type="text"
        id="name"
        placeholder="name"
        onChange={e => setValue(e.target.value)}
      ></Input>
      <label>password</label>
      <Input
        type="text"
        id="password"
        placeholder="password"
      ></Input>
      <Button
       onClick={submit}
      >
        Sign Up
      </Button>
    </FormContainer>
  )
}
