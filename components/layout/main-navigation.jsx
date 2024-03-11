'use client';
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function MainNavigation() {
    const [Authorization, setAccessToken] = useState("");
    const router = useRouter();

    // 토큰이 있는지 확인하고 토큰 값 가져오기
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('Authorization');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
    }, []);

    // 로그아웃 시 토큰 값 빈 값으로 변경 후 메인페이지로 이동
    function logoutHandler() {
        localStorage.removeItem('Authorization');
        window.location.href = "http://localhost:3000"
    }

    return (
        <HeaderContainer>
            <Link href="/" legacyBehavior passHref>
                    <Logo>Darakbang</Logo>
            </Link>
            <Nav>
                <NavList>
                    {!Authorization && (
                        <NavItem>
                            <Link href="/login" passHref>
                                <NavLink>로그인</NavLink>
                            </Link>
                        </NavItem>
                    )}
                    {Authorization && (
                        <NavItem>
                            <Link href="/profile" passHref>
                                <NavLink>프로필</NavLink>
                            </Link>
                        </NavItem>
                    )}
                    {Authorization && (
                        <NavItem>
                            <Link href="/getpoint" passHref>
                                <NavLink>포인트 구매</NavLink>
                            </Link>
                        </NavItem>
                    )}
                    {Authorization &&  (
                        <NavItem>
                            <Button onClick={logoutHandler}>로그아웃</Button>
                        </NavItem>
                    )}
                </NavList>
            </Nav>
        </HeaderContainer>
    );
}


const HeaderContainer = styled.header`
background-color: #7632a4;
  padding: 5px;
  display: flex; 
  justify-content: space-between;
  align-items: center; 
`;

const Logo = styled.div`
font-family: 'Lato', sans-serif;
font-size: 2rem;
color: black;
margin: 0;
padding: 10px;
margin-left: 40px;
`;

const Nav = styled.nav`
  margin-top: 10px;
`;

const NavList = styled.ul`
list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
`;

const NavItem = styled.li`
margin-right: 10px;
`;

const NavLink = styled.div`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-right: 50px;
`;

const Button = styled.button`
font: inherit;
background-color: transparent;
border: 1px solid white;
color: white;
font-weight: bold;
padding: 0.5rem 1.5rem;
border-radius: 6px;
cursor: pointer;
`;