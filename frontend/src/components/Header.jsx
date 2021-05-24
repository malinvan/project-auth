import React from 'react';
import styled from 'styled-components/macro';

const Title = styled.h1`
  margin: 30px 0 50px;
`;

export const Header = () => {
  return (
    <div>
      <Title>HELLO MOVIES</Title>
    </div>
  )
}
