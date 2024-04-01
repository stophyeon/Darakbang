import UserProfile from "../../components/profile/Profile"

import { cookies } from "next/headers";

export default function ProfilePage() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("Authorization");
    return (
        <>
            <UserProfile accessToken={accessToken} />
        </>
    )
}