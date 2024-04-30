'use server';
import NextPageContainer from '@compoents/containers/NextPageContainers';
import { getPostsFiles } from '@compoents/util/post-util';
import { cookies } from 'next/headers';

export default async function CommuPostsPage({params}) {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization')
  const postdata = await getPostsFiles(params.postpage, Authorization.value);
  return (
    <NextPageContainer postdata={postdata} postPage={params.postpage} />
  )
}
