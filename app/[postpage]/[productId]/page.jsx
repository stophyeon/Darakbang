'use server';

import PostDetailContainers from '@compoents/containers/ProductDetailContainers';
import { getPostData } from '@compoents/util/post-util';
import { cookies } from 'next/headers';
import { RefreshAccessToken } from '@compoents/util/http';

export default async function PostDetailPage({ params }) {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization');
  let postdata = await getPostData(params.productId, Authorization.value);
  if (postdata.state == "Jwt Expired"){
    const NewaccessToken = await RefreshAccessToken();
    postdata = await getPostData(params.productId, NewaccessToken);
    }
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
