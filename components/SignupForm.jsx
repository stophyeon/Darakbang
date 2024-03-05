"use client";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../util/http";


export default function SignupForm() {
  const router = useRouter();
  // 회원가입 API 요청 보내기
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
  });

  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birth, setselectedDate] = useState(null);
  const [phone_num, setPhoneNumber] = useState("");
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

    const formData = {
      birth,
      email,
      name,
      nick_name,
      password,
      phone_num,
    };
    console.log('456456 formdata: ', formData);
    mutate(formData);
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
            selected={birth}
            onChange={(date) => setselectedDate(date)}
            dateFormat="yyyy년 MM월 dd일"
            scrollableYearDropdown
            placeholderText="생년월일"
          />
          <Input
            type="string"
            value={phone_num}
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
          <Button type="submit">
             회원가입
          </Button>

        </Form>
      )}
    </>
  );
};


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 50px;
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

