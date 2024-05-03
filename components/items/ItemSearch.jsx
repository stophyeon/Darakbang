'use client'
import React, { useState, useRef, useCallback } from 'react';
import { IoSearch } from "react-icons/io5";
import styles from './ItemSearch.module.css';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

const FindEventSection = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const searchElement = useRef();

  const AutoSearch = useCallback(
    debounce(async (term) => {
      try {
        if (term.trim() === '') {
          setAutoCompleteResults([]); 
          return; 
        }
        const accessToken = localStorage.getItem('Authorization');
       // const response = await fetch('http://darakbang-apigateway-service-1:8888/product/search/word', {  
        const response = await fetch('http://localhost:8888/product/search/word', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${accessToken}`
          },
          body: JSON.stringify({ 
            word: term 
          }),
        });
        if (!response.ok) {
          throw new Error('Fetch 에러');
        }
        const data = await response.json();
        setAutoCompleteResults(data);
      } catch (error) {
        console.error('자동검색 에러', error);
      }
    }, 500),
    []
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    AutoSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchTerm = searchElement.current.value;
    setSearchTerm(searchTerm);
    router.push(`/search/${searchTerm}`);
  };

  const handleItemSelect = (item) => {
    setSearchTerm(item);
    searchElement.current.value = item;
    setAutoCompleteResults([]);
  };
  

  return (
    <form id="search-form" className={styles.SearchForm}>
      <header className={styles.headerd}>
        <input
          type="search"
          ref={searchElement}
          className={styles.inputSch}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.SchBtn} onClick={handleSubmit}>
          <IoSearch />
        </button>
      </header>

      {autoCompleteResults.length > 0 && (
        <ul className={styles.autoCompleteDropdown}>
          {autoCompleteResults.map((item, index) => (
            <>
            <li
              key={index}
              className={styles.autoCompleteItem}
              onClick={() => handleItemSelect(item)}
            >
              {item}
            </li>
            <div className={styles.verticalLine}></div>
            </>
          ))}
        </ul>
      )}
    </form>
  );
};

export default FindEventSection;

