'use client';
import styled from 'styled-components';

const MainHeader = styled.header`
  margin: 0;
  padding: 2rem 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainHeaderLoading = styled.div`
  height: 2rem;
  margin-bottom: -2rem;
  text-align: center;
  accent-color: #e30d7c;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: red;
`;

const HeaderTitleImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.26));
`;

const HeaderTitleText = styled.h1`
  font-size: 1.5rem;
  color: red;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;

const MainHeaderNav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const StyledMainHeader = ({ children }) => {
  return (
    <>
      <MainHeaderLoading></MainHeaderLoading>
      <MainHeader>
        <HeaderTitle>
          <HeaderTitleText>Darakbang</HeaderTitleText>
        </HeaderTitle>
        <MainHeaderNav>{children}</MainHeaderNav>
      </MainHeader>
    </>
  );
};

export default StyledMainHeader;
