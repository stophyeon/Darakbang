
import UserHeader from "@compoents/components/layout/User-Header";

export default function UserLayout({ children }) {
  return (
      <>
          <UserHeader />
          {children}
      </>
  );
}