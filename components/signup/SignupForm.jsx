"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from './SignupForm.module.css';

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [nick_name, setNickname] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [image, setImage] = useState('/defaultImg.jpg');
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [nicknameError, setnicknameError] = useState("");
  const [requestError, setRequestError] = useState(false);
  const smile = '/ellipse-87.svg'
  const showpsw = '/View.svg'

  const validatePassword = (password) => {
    // 비밀번호 검사 로직
    const logic =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return logic.test(password);
  };

  // 사진 base64 인코딩
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleCheckDuplicate() {
    // 서버로 중복 확인 요청을 보내는 부분
    const response = await fetch('http://localhost:8080/member/nicknameCheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nick_name }),
    })
      const data = await response.json();
        if (data.isDuplicate) {
          // 중복 일 때
          setIsDuplicate(true);
        } else {
          // 중복되지 않은 경우
          setIsDuplicate(false);
        }
      
  };
  

  const handleSignup = async (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError("이름을 입력해주세요.");
      return;
    } else {
      setNameError("");
    }

    if (email === "") {
      setemailError("이메일을 양식에 맞추어 입력해주세요.");
      return;
    } else if (emailError === 500) {
      setemailError("이미 가입된 이메일입니다.");
    } else {
      setemailError("");
    }

    if (nick_name === "") {
      setnicknameError("닉네임을 입력해주세요.");
      return;
    } else {
      setnicknameError("");
    }


    if (!validatePassword(password)) {
      setPasswordError(
        "비밀번호는 숫자, 영어, 특수문자를 포함하여 8자리 이상이어야 합니다."
      );
      return;
    } else {
      setPasswordError("");
    }


    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }


    // 회원가입 API 요청 보내기
    const response = await fetch("http://localhost:8080/member/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name": name,
        "nick_name": nick_name,
        "image": image,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // 회원가입 성공 시 메인 페이지로 리다이렉션
      window.location.href = "/user/login";
    } else if (response.status === 400) {
      setRequestError(400);
    } else if (response.status === 500) {
      setemailError("이미 가입된 이메일입니다.");
    }
    else {
      console.log(error);
    }
  };

  function handleFocus(e) {
    // 입력 필드의 id를 기반으로 조건부 스타일 적용
    const field = e.target.id;
    if (field === "email") {
      document.getElementById("email").style.borderColor = "#496AF3";
    } else if (field === "password") {
      document.getElementById("password").style.borderColor = "#496AF3";
    } else if (field === "name" ) {
      document.getElementById("name").style.borderColor = "#496AF3";
    }
    else if (requestError === 400) {
      if (field === "email") {
        document.getElementById("email").style.borderColor = "#FF0000";
      } else if (field === "password") {
        document.getElementById("password").style.borderColor = "#FF0000";
      }
      else if (field === "name" ) {
        document.getElementById("name").style.borderColor = "#496AF3";
      }
    }


  }

  return (
    <>
      <div className={styles.pageContainer}>
        <section className={styles.flexSection1}>
          <div className={styles.write1}>회원가입</div>
        </section>

        <form className={styles.formContainer} onSubmit={handleSignup}>
          <h1 className={styles.logintext}>이름</h1>
          <input
            className={styles.Input3}
            type="string"
            id="name"
            value={name}
            onChange={(e) => { 
              setName(e.target.value)
              handleFocus(e)
            }}
            placeholder="이름"
          />
          {nameError &&
            <div className={styles.anyLogins}>
              <Image src={smile} width={30} height={30} alt="스마일" className={styles.smile} />
              <p className={styles.errorMsg}>{nameError}</p>
            </div>
          }
          <h1 className={styles.logintext2}>이메일</h1>
          <label htmlFor="email">
            <input className={styles.Input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                handleFocus(e)
              }}
              placeholder="이메일을 입력해주세요..."
            />
          </label>
          {emailError && <div className={styles.anyLogins}>
            <Image src={smile} width={30} height={30} alt="스마일" className={styles.smile} />
            <p className={styles.errorMsg}>{emailError}</p>
          </div>}
          <h1 className={styles.logintext2}>비밀번호</h1>
          <div className={styles.anyLogins}>
            <input
              className={styles.Input}
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => { 
                setPassword(e.target.value) 
                handleFocus(e)
              }}
              placeholder="비밀번호"
            />
            <button onClick={togglePasswordVisibility} className={styles.showPswbtn}>
              <Image src={showpsw} width={18} height={12} alt="비밀번호 표시" />
            </button>
          </div>
          <h1 className={styles.logintext2}>비밀번호 확인</h1>
          <div className={styles.anyLogins}>
          <input
            className={styles.Input}
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              handleFocus(e)
            }}
            placeholder="비밀번호 확인"
          />
          <button onClick={togglePasswordVisibility} className={styles.showPswbtn}>
            <Image src={showpsw} width={18} height={12} alt="비밀번호 표시" />
          </button>
          </div>
          {passwordError && <div className={styles.anyLogins}>
            <Image src={smile} width={30} height={30} alt="스마일" className={styles.smile} />
            <p className={styles.errorMsg}>{passwordError}</p>
          </div>}
          <div className={styles.verticalLine}></div>

          <h1 className={styles.logintext3}>프로필 정보</h1>
          <h1 className={styles.logintext}>닉네임</h1>
          <div className={styles.anyLogins}>
          <input
            className={styles.Input3}
            type="string"
            value={nick_name}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
          />
          <button className={styles.nickBtn} onClick={handleCheckDuplicate}>중복 확인</button>
          {isDuplicate=== true && <p><Image className={styles.vector} src={'/Ellipse-168.svg'} width={14} height={14}/><Image className={styles.vector2} src={'/Vector340.svg'} width={12} height={11}/><p className={styles.nickFalse}>   사용 불가능한 닉네임입니다.</p></p>}
          {isDuplicate=== false && <p className={styles.nickTrue}> <Image src={'/Ellipse-169.svg'} width={14} height={14}/>    사용 가능한 닉네임입니다.</p>}
          </div>
          {nicknameError && <div className={styles.anyLogins}>
            <Image src={smile} width={132} height={132} alt="스마일" className={styles.smile} />
            <p className={styles.errorMsg}>{nicknameError}</p>
          </div>}
          <h1 className={styles.logintext2}>프로필 이미지</h1>
          <div className={styles.outProfile}>
            <label htmlFor="input-file">
              {image && <img src={image} alt="프로필 이미지" width="132" height="132" className={styles.selectImg} />}
            </label>
            <input
              type="file"
              name="image_URL"
              id="input-file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <button className={styles.Button1} type="submit">회원가입</button>
        </form>
        <section className={styles.flexSection2}></section>
      </div>
    </>
  );
};

