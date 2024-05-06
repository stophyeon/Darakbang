'use server';
import NextPageContainer from '@compoents/containers/NextPageContainers';
import { getPostsFiles } from '@compoents/util/post-util';
import { cookies } from 'next/headers';

export default async function CommuPostsPage({params}) {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization')
  const authorizationValue = Authorization?.value || '';
  const postdata = await getPostsFiles(params.postpage, authorizationValue);
  return (
    <NextPageContainer postdata={postdata} postPage={params.postpage} accessToken={authorizationValue} />
  )
}
