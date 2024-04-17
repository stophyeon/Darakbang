"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import styles from "@compoents/components/login/LoginForm.module.css";
import { Loginfetch } from "@compoents/util/Client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestError, setRequestError] = useState(false);
  const router = useRouter();
  const NaverLogo = '/naver.jpg'
  const KakaoLogo = '/kakaotalk_sharing_btn_medium.jpg'
  const smile = '/ellipse-87.svg'

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Loginfetch(email, password);
    }
    catch (error) {
      console.error(error.message);
      setRequestError(403);
    }
    const redirectUrl = "http://localhost:3000";
    window.location.href = redirectUrl;
  };

  useEffect(() => {
    // requestError 상태가 변경될 때마다 입력 필드의 스타일을 업데이트
    if (requestError) {
      document.getElementById("email").style.borderColor = "#FF0000";
      document.getElementById("password").style.borderColor = "#FF0000";
    } else {
      document.getElementById("email").style.borderColor = "#496AF3B";
      document.getElementById("password").style.borderColor = "#496AF3B";
    }
  }, [requestError]);

  const handleSignup = () => {
    router.push("/user/signup"); // 회원가입 페이지로 이동
  };

  const handleKakaoLogin = () => {
    const REST_API_KEY = 'b9759cba8e0cdd5bcdb9d601f5a10ac1';
    const REDIRECT_URI = 'http://localhost:3000/user/login/oauth2/kakao';
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  }


  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';

  };
  function handleFocus(e) {
    // 입력 필드의 id를 기반으로 조건부 스타일 적용
    const field = e.target.id;
    if (field === "email") {
      document.getElementById("email").style.borderColor = "#496AF3";
    } else if (field === "password") {
      document.getElementById("password").style.borderColor = "#496AF3";
    }
    else if (requestError === 403) {
      if (field === "email") {
        document.getElementById("email").style.borderColor = "#FF0000";
      } else if (field === "password") {
        document.getElementById("password").style.borderColor = "#FF0000";
      }
    }


  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.flexSection1}>
        <div className={styles.write1}>로그인</div>
        <div className={styles.write2}>다락방에 오신 것을 환영합니다!</div>
      </section>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.logintext}>이메일</h1>
        <label htmlFor="email">
          <input className={styles.Input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              handleFocus(e);
            }}
            placeholder="이메일을 입력해주세요..."
          />
        </label>
        <h1 className={styles.logintext2}>비밀번호</h1>
        <label htmlFor="password">
          <input className={styles.Input2}
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              handleFocus(e);
            }}
          />
        </label>
        {requestError === 403 && (
          <div className={styles.anyLogins}>
            <Image src={smile} width={30} height={30} alt="스마일" className={styles.smile} />
            <h2 className={styles.errorMsg}>아이디 혹은 비밀번호를 다시 확인해주세요.</h2>
          </div>
        )}
        <button className={styles.Button1} type="submit">로그인</button>
        <button className={styles.Button2} type="button" onClick={handleSignup}>
          회원가입
        </button>
        <h1 className={styles.Easylogin}>간편 로그인</h1>
        <div className={styles.anyLogins}>
          <div className={styles.naverButton} type="button" onClick={handleNaverLogin}>
            <Image src={NaverLogo} alt="이미지" width={70} height={70} />
          </div>
          <div className={styles.kakaoButton} type="button" onClick={handleKakaoLogin}>
            <div className={styles.ellipseContainer}>
              <Image src={KakaoLogo} alt="이미지" width={72} height={72} />
            </div>
          </div>
        </div>
        <div className={styles.anyLogins}>
          <h2 className={styles.naverText}>네이버로 로그인</h2>
          <h2 className={styles.kakaoText}>카카오로 로그인</h2>
        </div>
      </form>
      <section className={styles.flexSection2}></section>
    </div>
  );
}