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
  header {
    display: flex;
    align-items: center;
  }

  input[type='search'] {
    width: 300px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;