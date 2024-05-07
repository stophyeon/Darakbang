'use server';

import BucketForm from "@compoents/components/bucket/BucketForm";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function BucketPage({ params }) {
    const cookieStore = cookies()
    const Authorization = cookieStore.get('Authorization');
    if (Authorization && Authorization.value) {
    return (
        <>
            <BucketForm nick_name={params.nick_name} accessToken={Authorization.value}/>
        </>
    )
} else {
    redirect('/user/login');
  }
  }