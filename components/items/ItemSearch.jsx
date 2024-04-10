'use client';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IoSearch } from "react-icons/io5";
import styles from './ItemSearch.module.css';

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
    queryFn: ({ signal, queryKey }) => fetchItemsByProductName({ signal, ...queryKey[1] }),
    enabled: searchTerm !== '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    const searchTerm = searchElement.current.value;
    setSearchTerm(searchElement.current.value);
    router.push(`/search/${searchTerm}?search=${searchTerm}`);
  }

  return (
    <form onSubmit={handleSubmit} id="search-form" className={styles.SearchForm}>
      <header className={styles.headerd}>
        <input type="search" ref={searchElement} className={styles.inputSch}/>
        <button type="submit" className={styles.SchBtn}><IoSearch /></button>
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
              <Items key={item.id} items={item} />
          ))}
        </ul>
      )}
    </form>
  );
};

export default FindEventSection;
