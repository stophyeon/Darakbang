'use server';

import PostDetailContainers from '@compoents/containers/ProductDetailContainers';
import { getPostData } from '@compoents/util/post-util';
import { cookies } from 'next/headers';


export default async function PostDetailPage({ params }) {

  
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization');
  const postdata = await getPostData(params.productId, Authorization.value);
  return (
    <>
      <PostDetailContainers 
      productId={params.productId} 
      postpage={params.postpage}
      post={postdata.product} 
      postList={postdata} 
      accessToken={Authorization.value} 
      />
    </>
  );
}
