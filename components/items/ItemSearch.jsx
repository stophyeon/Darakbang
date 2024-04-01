'use client';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoSearch } from "react-icons/io5";
import styled from 'styled-components'; // styled-components import 추가

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

import { fetchitems } from '../../util/http.js';
import Items from './Items.jsx';
import { useRouter } from 'next/navigation';



const FindEventSection = () => {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Items', { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchitems({ signal, ...queryKey[1] }),
    enabled: searchTerm !== '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    const searchTerm = searchElement.current.value;
    setSearchTerm(searchElement.current.value);
    router.push(`/search/posts?searchTerm=${searchTerm}`);
  }

  return (
    <SearchForm onSubmit={handleSubmit} id="search-form">
      <header>
        <input type="search" placeholder="상품 검색" ref={searchElement} />
        <button type="submit"><IoSearch /></button>
      </header>

      {isLoading && <LoadingIndicator />}
      {isError && (
        <ErrorBlock
          title="검색 결과가 없습니다."
          message={error.info?.message || '연결 실패'}
        />
      )}

      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <Items items={item} />
            </li>
          ))}
        </ul>
      )}
    </SearchForm>
  );
};

export default FindEventSection;


// 검색 폼 스타일드 컴포넌트 생성
const SearchForm = styled.form`
  display: flex;
  position: relative;
  header {
    display: flex;
    align-items: center;
    width: 880px;
    height: 48px;
    flex-shrink: 0;
  }

  input[type='search'] {
    width: 1440px;
    height: 48px;
    flex-shrink: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 100px;
    padding-left: 20px;
  }

  button {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border: none;
    cursor: pointer;
    background: #FFFFFF;
    margin-left: 1500px;
    position: absolute;
  }
`;