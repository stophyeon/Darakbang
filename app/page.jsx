'use server'

import MainContainers from '@compoents/containers/MainContainers';
import { cookies } from 'next/headers';
import { getPostsFile } from '@compoents/util/post-util';

export default async function Home() {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization')
  const postdata = await getPostsFile(Authorization);
  return (
    <MainContainers postdata={postdata} accessToken={Authorization} />
  )
}
