import styled, { keyframes } from 'styled-components';

export default function LoadingIndicator() {
  return (
    <LoadingIndicatorContainer>
      <LoadingIndicatorItem></LoadingIndicatorItem>
      <LoadingIndicatorItem></LoadingIndicatorItem>
      <LoadingIndicatorItem></LoadingIndicatorItem>
      <LoadingIndicatorItem></LoadingIndicatorItem>
    </LoadingIndicatorContainer>
  );
}


const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingIndicatorContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 1rem 0;
`;

const LoadingIndicatorItem = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #e30d5b;
  border-radius: 50%;
  animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #e30d5b transparent transparent transparent;

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
