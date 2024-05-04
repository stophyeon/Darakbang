'use server';
import MainNavigation from "@compoents/components/layout/main-navigation";
import { cookies } from 'next/headers';

export default async function SearchLayout({ children }) {
  const cookieStore = cookies()
  const Authorization = cookieStore.get('Authorization');
  const authorizationValue = Authorization?.value || '';
  return (
      <>
          <MainNavigation accessToken={authorizationValue}/>
          {children}
      </>
  );
}