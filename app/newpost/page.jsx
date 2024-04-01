'use server';

import ProductForm from "@compoents/components/posts/SendPost"

import { cookies } from "next/headers";

export default async function NewPostPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("Authorization");
  return (
    <ProductForm accessToken={accessToken}/>
  )
}