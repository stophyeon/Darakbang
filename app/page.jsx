'use server'

import MainContainers from '@compoents/containers/MainContainers';
import { cookies } from 'next/headers';
import { getPostsFile } from '@compoents/util/post-util';

export default async function Home() {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization');
  const authorizationValue = Authorization?.value || '';
  const postdata = await getPostsFile(authorizationValue);
  return (
    <MainContainers postdata={postdata} accessToken={authorizationValue} />
  )
}
