'use server';
import OtherProfileform from "@compoents/components/profile/OtherProfileform"
import { cookies } from "next/headers";
import { fetchOtherUserProfile, fetchFollowUser, fetchFollowingUser } from "@compoents/util/http";

export default async function otherProfilePage({ params }) {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization');
  const userInfo = await fetchOtherUserProfile(params.nick_name, Authorization.value);
  const followerList = await fetchFollowUser(Authorization.value);
  const followingList = await fetchFollowingUser(Authorization.value);
  
  return (
    <OtherProfileform 
    userInfo={userInfo} 
    nick_name={params.nick_name} 
    accessToken={Authorization.value}
    followerList={followerList}
    followingList={followingList}
    />
  )
}