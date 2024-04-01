'use server';

import EditProductForm from "@compoents/components/posts/Edit-page";

import { cookies } from "next/headers";

export default async function EditPage({ params }) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization");

    return (
        <EditProductForm productId={params.productId} accessToken={accessToken} />
    )
}