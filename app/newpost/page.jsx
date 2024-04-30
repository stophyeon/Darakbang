'use server';
import ProductForm from "@compoents/components/posts/Interaction/SendPost";
import { cookies } from "next/headers";

export default async function ProductPage() {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization')
  console.log(Authorization.value);
  return (
    <>
      <ProductForm accessToken={Authorization.value} />
    </>
  );
}
