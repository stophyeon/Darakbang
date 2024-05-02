'use client';

import { useEffect } from "react";

export default function KakaoLogin() {
  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get("code");
        const response = await fetch(`http://darakbang-member-service-1/oauth2/naver?code=${code}`, {
      //  const response = await fetch(`http://localhost:8080/oauth2/naver?code=${code}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }

        const data = await response.json();
        console.log(data);

        const { accessToken, refreshToken } = data;
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
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };
    kakaoLogin();
  }, []);

  return (
    <div>
      <div>
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
