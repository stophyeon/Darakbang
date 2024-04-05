import OtherProfileform from "@compoents/components/profile/OtherProfileform"

export default function otherProfilePage({ params }) {
  return (
    <OtherProfileform nick_name={params.nick_name} />
  )
}