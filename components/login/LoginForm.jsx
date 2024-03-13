"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


import styled from "styled-components";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [memberInfo, setMemberInfo] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const { accessToken, refreshToken } = data;
        // accessToken을 localStorage에 저장
        localStorage.setItem("Authorization", `Bearer ${accessToken}`);
        const expiration = new Date(); // 엑세스 토큰 시간 저장
        expiration.setHours(expiration.getHours() + 1); // 1시간 이후에 토큰 만료
        localStorage.setItem("expiration", expiration.toISOString());

        // refreshToken을 cookie에 저장 HttpOnly와 Secure 사용하여 보안 강화
        const expirations = new Date(); // 리프레시 토큰 시간 저장
        expirations.setHours(expirations.getHours() + 5); // 5시간 이후에 토큰 만료
        document.cookie = `refreshToken=${refreshToken}; Expires=${expirations.toUTCString()}; Secure; HttpOnly`;

        const redirectUrl = "http://localhost:3000"; // 리다이렉트할 URL을 원하는 경로로 수정해주세요.
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignup = () => {
    router.push("/signup"); // 회원가입 페이지로 이동
  };

  const handleKakaoLogin = async () => {
    const REST_API_KEY = 'b9759cba8e0cdd5bcdb9d601f5a10ac1';
    const REDIRECT_URI = 'http://localhost:3000/login/oauth2/kakao';
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  } 
  

  const handleNaverLogin = () => {
    window.location.href ='http://localhost:8080/oauth2/authorization/naver';

  };


  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Login</Title>
      <label htmlFor="email">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
      </label>
      <label htmlFor="password">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </label>
      <Button type="submit">로그인</Button>
      <SignupButton type="button" onClick={handleSignup}>
        회원가입
      </SignupButton>
      <Button type="button" onClick={handleKakaoLogin}>
        카카오 계정으로 로그인하기
      </Button>
      
      <Button type="button" onClick={handleNaverLogin}>
        네이버 계정으로 로그인하기
      </Button>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  padding: 20px;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 50px;
  width: 95%;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  text-align: center;
  color: black;
`;

const Input = styled.input`
  font: inherit;
  background-color: #f1e1fc;
  color: #38015c;
  border-radius: 4px;
  border: 1px solid white;
  width: 100%;
  text-align: left;
  padding: 0.25rem;
  margin-top: 15px;
  &::placeholder {
    text-align: center;
  }
`;

const Button = styled.button`
  cursor: pointer;
  font: inherit;
  color: white;
  background-color: green;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.5rem 2.5rem;
  margin-top: 0px;
`;

const SignupButton = styled.button`
  cursor: pointer;
  font: inherit;
  color: white;
  background-color: green;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.5rem 2.5rem;
`;
