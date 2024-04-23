
import NextPageContainer from '@compoents/containers/NextPageContainers';

export default function CommuPostsPage({params}) {
  return (
    <NextPageContainer postPage={params.postpage} />
  )
}
