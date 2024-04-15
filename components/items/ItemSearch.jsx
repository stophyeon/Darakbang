'use client';
import React, { useState, useRef, useCallback } from 'react';
import { IoSearch } from "react-icons/io5";
import styles from './ItemSearch.module.css';
import { debounce } from 'lodash';
// import { fetchAutoCompleteResults } from './api';
import { useRouter } from 'next/navigation';

const FindEventSection = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const searchElement = useRef();

  const debouncedSearch = useCallback(
    debounce((term) => {
      fetchAutoCompleteResults(term).then((results) => {
        setAutoCompleteResults(results);
      });
    }, 500),
    []
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedSearch(value);
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
    <form onSubmit={handleSubmit} id="search-form" className={styles.SearchForm}>
      <header className={styles.headerd}>
        <input
          type="search"
          ref={searchElement}
          className={styles.inputSch}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.SchBtn}>
          <IoSearch />
        </button>
      </header>

      {autoCompleteResults.length > 0 && (
        <ul className={styles.autoCompleteDropdown}>
          {autoCompleteResults.map((item) => (
            <li
              key={item}
              className={styles.autoCompleteItem}
              onClick={() => handleItemSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default FindEventSection;
