'use client';
import Link from "next/link";
import FindEventSection from "../items/ItemSearch";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import SmallProfile from "../profile/SmallProfile";

export default function MainNavigation() {
    const [Authorization, setAccessToken] = useState("");
    const [showProfile, setShowProfile] = useState(false);
    const router = useRouter();

    // 토큰이 있는지 확인하고 토큰 값 가져오기
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('Authorization');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        }
    }, []);

    // 로그아웃 시 토큰 값 빈 값으로 변경 후 메인페이지로 이동
    

    return (
    <>
        <HeaderContainer>
            <Link href="/" legacyBehavior passHref>
                    <Logo>Darakbang</Logo>
            </Link>
            <Nav>
                <NavList>
                <NavItem>
                          <FindEventSection />
                </NavItem>
                    {!Authorization && (
                        <NavItem2>
                            <Link href="/login" passHref>
                                <NavLink>로그인</NavLink>
                            </Link>
                        </NavItem2>
                    )}
                    {Authorization && (
                        <NavItem2>
                             <SmallProfile />
                        </NavItem2>
                    )}
                    {/*  */}
                </NavList>
            </Nav>
        </HeaderContainer>
        
         </>
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
margin-right: 350px;
`;

const NavItem2 = styled.li`
margin-left: 100px;
`;


const NavLink = styled.div`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-right: 50px;
`;

