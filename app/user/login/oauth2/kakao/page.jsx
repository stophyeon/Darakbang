'use client';
import React, { useEffect } from "react";
import LoadingIndicator from "@compoents/components/UI/LoadingIndicator";

export default function KakaoLogin() {
  useEffect(() => {
    const kakaoLogin = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        const response = await fetch(`http://darakbang-member-service-1/oauth2/kakao?code=${code}`, {
       // const response = await fetch(`http://localhost:8888/oauth2/kakao?code=${code}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });
        if (!response.ok) {
          throw new Error("로그인 실패");
        }
        const data = await response.json();
        console.log(data);

        const { accessToken, refreshToken } = data;
        localStorage.setItem("Authorization", `Bearer ${accessToken}`);
        document.cookie = `Authorization=Bearer ${accessToken}; path=/`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;

        const existingAccessToken = localStorage.getItem("Authorization");
        if (existingAccessToken) {
          const redirectUrl = "http://localhost:3000"; // 리다이렉트할 URL을 원하는 경로로 수정해주세요.
          window.location.href = redirectUrl;
          return;
        }
      }
    };
    kakaoLogin();
  }, []);
  

  return (
    <div>
      <div>
        <LoadingIndicator />
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
