import Link from "next/link";
import React from "react";

export default function Pagination({
  currentPage,
  totalContents,
  paginate,
  contentsPerPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContents / contentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${
              currentPage === number ? styles.active : ""
            }`}
          >
            <Link href="/posts" onClick={() => paginate(number)}>
              <div>{number}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


