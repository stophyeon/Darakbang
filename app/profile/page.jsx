'use server';
import UserProfile from "@compoents/components/profile/Profile";
import { cookies } from "next/headers";
import { fetchUserProfile } from "@compoents/util/http";

export default async function ProfilePage() {
    const cookieStore = cookies()
    const Authorization = cookieStore.get('Authorization')
    const userInfo = await fetchUserProfile(Authorization.value);
    console.log(userInfo);
    return (
        <>
            <UserProfile userInfo={userInfo} />
        </>
    )
}