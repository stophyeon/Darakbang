

import MainNavigation from "@compoents/components/layout/main-navigation";

export default function EditmyLayout({ children }) {
  return (
      <>
          <MainNavigation />
          {children}
      </>
  );
}