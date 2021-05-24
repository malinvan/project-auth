import React from 'react'
import styled from 'styled-components/macro';

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

export const Form = () => {
  return (
    <FormContainer>
      <h2>Sign Up!</h2>
      <label>email</label>
      <Input
        type="text"
        id="email"
        placeholder="email"
      ></Input>
      <label>name</label>
      <Input
        type="text"
        id="name"
        placeholder="name"
      ></Input>
      <label>password</label>
      <Input
        type="text"
        id="password"
        placeholder="password"
      ></Input>
    </FormContainer>
  )
}
