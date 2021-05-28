import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { signIn } from "reducers/user";
import { signUp } from "reducers/user";

const Container = styled.form`
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  color: #7CA982;
  font-size: 40px;
  margin-bottom: 40px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 0 auto;
`;

const Input = styled.input`
  border: none;
  color: white;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  background-color: black;
  ::placeholder {
    color: #e7e9eb;
  }
  :focus {
    outline: none;
    background-color: #2c2d26;
    color: white;
    ::placeholder {
      color: white;
    }
  }
`;

const Button = styled.button`
  background-color: #7CA982;
  color: white;
  width: 50%;
  border-radius: 50px;
  font-weight: bold;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken);
  const errors = useSelector((store) => store.user.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push("/netflix");
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (mode === "signup") {
      dispatch(signUp(email, password));
    }
    if (mode === "signin") {
      dispatch(signIn(email, password));
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={onFormSubmit}>
        <Title>Sign in or sign up!</Title>
        <label>Email</label>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <label>password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <ButtonContainer>
          <Button
            type="submit"
            onClick={() => {
              setMode("signin");
            }}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            onClick={() => {
              setMode("signup");
            }}
          >
            Sign Up
          </Button>
        </ButtonContainer>
      </FormContainer>
      {errors && <div>{errors.message}</div>}
    </Container>
  );
};
