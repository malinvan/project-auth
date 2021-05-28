import React, { 
  useState,
  useEffect
} from "react";
import { 
  useDispatch,
  useSelector 
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from "styled-components/macro";
// import { fetchMovies } from "reducers/movie";
import { signIn } from "reducers/user";
import { signUp } from "reducers/user";


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
  background-color: white;
  width: 50%;
  border-radius: 50px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(null);

  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push('/netflix');
    }
  }, [accessToken])

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup') {
      dispatch(signUp(email, password))
    }
    if (mode === 'signin') {
      dispatch(signIn(email, password))
    }
  }

  return (
    <FormContainer onSubmit={onFormSubmit}>
      <h2>Sign in or sign up!</h2>
      <label>Email</label>
      <Input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      ></Input>
      <label>password</label>
      <Input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      ></Input>
      <ButtonContainer>
        <Button
          type="submit"
          onClick={() => {
            setMode('signin')
            console.log("HELLO FROM SIGN IN")
          }}
        >Sign In</Button>
        <Button
          type="submit"
          onClick={() => {
            setMode('signup')
            console.log("HELLO")
          }}
        >Sign Up</Button>
      </ButtonContainer>
    </FormContainer>
  )
}