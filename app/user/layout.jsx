
import LoginHeader from "@compoents/components/layout/Login-Header";

export default function UserLayout({ children }) {
  return (
      <>
          <LoginHeader />
          {children}
      </>
  );
}