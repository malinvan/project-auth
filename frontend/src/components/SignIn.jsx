import React from 'react';
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

export const SignIn = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(fetchBooks(value));
  }

  return (
    <FormContainer>
      <h2>Sign In!</h2>
      <label>email</label>
      <Input
        type="text"
        id="email"
        placeholder="email"
        onChange={e => setValue(e.target.value)}
      ></Input>
      <label>password</label>
      <Input
        type="text"
        id="password"
        placeholder="password"
        onChange={e => setValue(e.target.value)}
      ></Input>
      <button
        onClick={submit}
      >Sign In</button>
    </FormContainer>
  )
}