import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

import { fetchitems } from '../../util/http.js';  
import Items from './Items.jsx';      // 게시글 작성된 상품들

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Items', { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchitems({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>당신이 원하는 검색을 하세요!</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="검색 결과가 없습니다."
        message={error.info?.message || '연결 실패'}
      />
    );
  }

  if (data) {
    content = (
      <ul>
        {data.map((items) => (
          <li key={items.id}>
            <Items items={items} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section>
      <header>
        <h2>당신이 찾는 물건을 검색하세요!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}