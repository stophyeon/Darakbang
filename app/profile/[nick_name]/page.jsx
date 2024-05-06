'use server';
import OtherProfileform from "@compoents/components/profile/OtherProfileform"
import { cookies } from "next/headers";
import { fetchOtherUserProfile, fetchFollowUser, fetchFollowingUser, getSelling } from "@compoents/util/http";
import { RefreshAccessToken } from "@compoents/util/http";

export default async function otherProfilePage({ params }) {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization');
  let userInfo = await fetchOtherUserProfile(params.nick_name, Authorization.value);
    if (userInfo.state == "Jwt Expired"){
        const NewaccessToken = await RefreshAccessToken();
        userInfo = await fetchOtherUserProfile(params.nick_name, NewaccessToken);
    }
  const followerList = await fetchFollowUser(Authorization.value);
  const followingList = await fetchFollowingUser(Authorization.value);
  const userproducts = await getSelling(userInfo.nick_name);
  
  return (
    <OtherProfileform 
    userInfo={userInfo} 
    nick_name={params.nick_name} 
    accessToken={Authorization.value}
    followerList={followerList}
    followingList={followingList}
    userproducts={userproducts}
    />
  )
}