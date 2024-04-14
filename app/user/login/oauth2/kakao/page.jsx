'use client';

import { useEffect } from "react";

import LoadingIndicator from "@compoents/components/UI/LoadingIndicator";

export default function KakaoLogin() {
  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const code = new URL(window.location.href).searchParams.get("code");
        const response = await fetch(`http://localhost:8888/oauth2/kakao?code=${code}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }

        const data = await response.json();

        const { accessToken, refreshToken } = data;
        localStorage.setItem("Authorization", `Bearer ${accessToken}`);
        // document.cookie = `Authorization=Bearer ${accessToken}; Expires=${expiration.toUTCString()}`;

        // refreshToken을 cookie에 저장 HttpOnly와 Secure 사용하여 보안 강화
        document.cookie = `refreshToken=${refreshToken}; Expires=${expirations.toUTCString()}; Secure; HttpOnly`;

        const redirectUrl = "http://localhost:3000"; // 리다이렉트할 URL을 원하는 경로로 수정해주세요.
        window.location.href = redirectUrl;
      } catch (error) {
        console.error(error);
        localStorage.removeItem("Authorization"); // 예외 발생 시 localStorage에서 값 삭제
        localStorage.removeItem("expiration");
        // Handle error
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
