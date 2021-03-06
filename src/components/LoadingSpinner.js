import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const rotate = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 64px);
`;

const Ring = styled.div`
  align-self: center;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: auto;
`;

const RingDiv = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${props => props.theme.color.secondary.main} transparent
    transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const LoadingSpinner = () => {
  return (
    <Container>
      <Ring className='lds-ring'>
        <RingDiv></RingDiv>
        <RingDiv></RingDiv>
        <RingDiv></RingDiv>
        <RingDiv></RingDiv>
      </Ring>
    </Container>
  );
};

export default LoadingSpinner;
