'use client';

import { useRouter } from "next/navigation";

export default function PutDetailbutton({ productId, postpage }) {
    const router = useRouter();

    const handleButtonClick = () => {
      router.push(`/${postpage}/${productId}/edit`);
    };
  return (
    <>
     <button onClick={handleButtonClick}>수정</button>
    </>
  );
}