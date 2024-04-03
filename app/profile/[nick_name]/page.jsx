import OtherProfileform from "@compoents/components/profile/OtherProfileform"

export default async function otherProfilePage({ params }) {
  return (
    <OtherProfileform nick_name={params.nick_name} />
  )
}