'use server';
import ProductForm from "@compoents/components/posts/Interaction/SendPost";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function ProductPage() {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization');
  if (Authorization && Authorization.value) {
    return (
      <>
        <ProductForm accessToken={Authorization.value} />
      </>
    );
  } else {
        redirect('/user/login');
  }
}