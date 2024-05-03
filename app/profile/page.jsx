'use server';
import UserProfile from "@compoents/components/profile/Profile";
import { cookies } from "next/headers";
import { fetchUserProfile } from "@compoents/util/http";
import { fetchFollowUser, fetchFollowingUser } from "@compoents/util/http";

export default async function ProfilePage() {
    const cookieStore = cookies()
    const Authorization = cookieStore.get('Authorization')
    const userInfo = await fetchUserProfile(Authorization.value);
    const followerList = await fetchFollowUser(Authorization.value);
    const followingList = await fetchFollowingUser(Authorization.value);
    return (
        <>
            <UserProfile userInfo={userInfo} followerList={followerList} followingList={followingList} />
        </>
    )
}