import styled from 'styled-components';

export default function ErrorBlock({ title, message }) {
  return (
    <ErrorBlockContainer>
      <ErrorBlockIcon>!</ErrorBlockIcon>
      <div>
        <ErrorBlockTitle>{title}</ErrorBlockTitle>
        <ErrorBlockMessage>{message}</ErrorBlockMessage>
      </div>
    </ErrorBlockContainer>
  );
}

const ErrorBlockContainer = styled.div`
  background-color: #f0d9e5;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 4px;
  color: #890b35;
  display: flex;
  gap: 2rem;
  align-items: center;
  text-align: left;
`;

const ErrorBlockIcon = styled.div`
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  color: #fff;
  background-color: #890b35;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorBlockTitle = styled.h2`
  color: inherit;
  font-size: 1.25rem;
  margin: 0;
`;

const ErrorBlockMessage = styled.p`
  margin: 0;
`;

