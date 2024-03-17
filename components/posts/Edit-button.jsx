'use client';

import { useRouter } from "next/navigation";

export default function PutDetailPage({ productId }) {
    const router = useRouter();

    const handleButtonClick = () => {
      router.push(`/posts/${productId}/edit`);
    };
  return (
    <>
     <button onClick={handleButtonClick}>수정</button>
    </>
  );
}