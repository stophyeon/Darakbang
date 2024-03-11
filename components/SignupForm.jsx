"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;



const SignupForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setselectedDate] = useState(null);
  const [phone_number, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [nick_name, setNickname] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [nicknameError, setnicknameError] = useState("");
  useEffect(() => {
    setIsClient(true);
  }, []);

  const validatePassword = (password) => {
    // 비밀번호 검사 로직
    const logic =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return logic.test(password);
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
      setemailError("이메일을 입력해주세요.");
      return;
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
        "비밀번호는 영문, 숫자, 특수 기호를 각각 하나 이상 포함해야 합니다."
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
        email,
        password,
        birthday,
        phone_number,
        name,
        nick_name,
      }),
    });

   
    const data = await response.json();
    console.log(data); 

    if (response.ok) {
      // 회원가입 성공 시 메인 페이지로 리다이렉션
      window.location.href = "/";
    } else {
      throw new Error(data.message || "Something went wrong!");
    }
  };

  return (
    <>
      {isClient && (
        <Form onSubmit={handleSignup}>
          <Input
            type="string"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
          />
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <DatePicker
            selected={birthday}
            onChange={(date) => setselectedDate(date)}
            dateFormat="yyyy년 MM월 dd일"
            scrollableYearDropdown
            placeholderText="생년월일"
          />
          <Input
            type="string"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="전화번호"
          />
          <Input
            type="string"
            value={nick_name}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
          />
          {nicknameError && <ErrorMessage>{nicknameError}</ErrorMessage>}
          <Button type="submit">회원가입</Button>
        </Form>
      )}
    </>
  );
};

export default SignupForm;
