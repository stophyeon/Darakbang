'use server';
import MainNavigation from "@compoents/components/layout/main-navigation";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProductLayout({ children }) {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization');
  if (Authorization && Authorization.value) {
  return (
      <>
          <MainNavigation accessToken={Authorization.value} />
          {children}
      </>
  );
} else {
  redirect('/user/login');
}
}