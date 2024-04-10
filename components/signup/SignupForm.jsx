"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from './SignupForm.module.css';


export default function SignupForm() {
  const formData = new FormData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [nick_name, setNickname] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [image, setImage] = useState('');
  const [showimage, setShowimage] = useState('/defaultImg.jpg');
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = (selectedImage);
    setImage(imageUrl);
    const imageUrls = URL.createObjectURL(selectedImage);
    setShowimage(imageUrls);
    console.log(imageUrl);
  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // 중복이면 True 중복아니면 false
  async function handleCheckDuplicate(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:8888/nick_name?nick_name=${nick_name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    if (data === true) {
      // 중복이면
      setIsDuplicate(true);
      alert("닉네임을 변경해 주시길 바랍니다.");
    } else {
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


    // JSON.stringify({
    //   "email": email,
    //   "password": password,
    //   "name": name,
    //   "nick_name": nick_name,
    //   "image": image,
    // }),

    const formData = new FormData();
    let req = {
      "email": email,
      "password": password,
      "name": name,
      "nick_name": nick_name
    }
    formData.append('req', new Blob([JSON.stringify(req)], { type: "application/json" }));
    formData.append('img', image);

    for (var pair of formData.values()) {
      console.log(pair);
    }

    // 회원가입 API 요청 보내기
    const response = await fetch("http://localhost:8888/member/signup", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.state === "처리 성공") {
        // 회원가입 성공 시 메인 페이지로 리다이렉션
        window.location.href = "/user/login";
      } else if (responseData.state === "중복된 이메일") {
        // 중복된 이메일일 경우 알림창 표시
        alert(responseData.message);
        alert("이메일을 변경해주세요.")
      }
    } else {
      console.error(response.status);
    }

  };

  function handleFocus(e) {
    // 입력 필드의 id를 기반으로 조건부 스타일 적용
    const field = e.target.id;
    if (field === "email") {
      document.getElementById("email").style.borderColor = "#496AF3";
    } else if (field === "password") {
      document.getElementById("password").style.borderColor = "#496AF3";
    } else if (field === "name") {
      document.getElementById("name").style.borderColor = "#496AF3";
    }
    else if (requestError === 400) {
      if (field === "email") {
        document.getElementById("email").style.borderColor = "#FF0000";
      } else if (field === "password") {
        document.getElementById("password").style.borderColor = "#FF0000";
      }
      else if (field === "name") {
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
            {isDuplicate === true &&
              <div>
                <Image className={styles.vector} alt="벡터" src={'/Ellipse-168.svg'} width={14} height={14} />
                <Image className={styles.vector2} alt="벡터2" src={'/Vector340.svg'} width={12} height={10} />
                <p className={styles.nickFalse}>   사용 불가능한 닉네임입니다.</p>
              </div>
            }
            {isDuplicate === false &&
              <div className={styles.nickTrue}>
                <Image src={'/Ellipse-169.svg'} alt="스마일2" width={14} height={14} />
                사용 가능한 닉네임입니다.
              </div>
            }
          </div>
          {nicknameError && <div className={styles.anyLogins}>
            <Image src={smile} width={132} height={132} alt="스마일" className={styles.smile} />
            <p className={styles.errorMsg}>{nicknameError}</p>
          </div>}
          <h1 className={styles.logintext2}>프로필 이미지</h1>
          <div className={styles.outProfile}>
            <label htmlFor="input-file">
              <Image src={showimage} alt="프로필 이미지" width="132" height="132" className={styles.selectImg} />
            </label>
            <input
              type="file"
              name="image_URL"
              id="input-file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                handleImageChange(e)
              }}
            />
          </div>

          <button className={styles.Button1} type="submit">회원가입</button>
        </form>
        <section className={styles.flexSection2}></section>
      </div>
    </>
  );
};

