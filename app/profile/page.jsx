'use server';
import UserProfile from "@compoents/components/profile/Profile";
import { cookies } from "next/headers";
import { fetchUserProfile, getSelling } from "@compoents/util/http";
import { fetchFollowUser, fetchFollowingUser } from "@compoents/util/http";
import { RefreshAccessToken } from "@compoents/util/http";

export default async function ProfilePage() {
    const cookieStore = cookies()
    const Authorization = cookieStore.get('Authorization')
    let userInfo = await fetchUserProfile(Authorization.value);
    if (userInfo.state == "Jwt Expired"){
        const NewaccessToken = await RefreshAccessToken();
        userInfo = await fetchUserProfile(NewaccessToken);
    }
    const followerList = await fetchFollowUser(userInfo.nick_name, Authorization.value);
    const followingList = await fetchFollowingUser(userInfo.nick_name, Authorization.value);
    const userproducts = await getSelling(userInfo.nick_name);
    return (
        <>
            <UserProfile 
            userInfo={userInfo} 
            followerList={followerList} 
            followingList={followingList}
            userproducts={userproducts} 
            accessToken={Authorization.value} 
            />
        </>
    )
}