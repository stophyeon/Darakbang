'use client';

import Link from "next/link";

export default function Home() {
  const nicknames = ["김민우", "지현정", "지혁이"];
  const linkPaths = nicknames.map((nickname) => `/profile/${nickname}`);

  
  return (
    <>
      <h1>메인 페이지</h1>
      {nicknames.map((nickname, index) => (
        <Link key={nickname} href={linkPaths[index]}>
          <div>{nickname} 프로필</div>
        </Link>
      ))}
    </>
  );
}
