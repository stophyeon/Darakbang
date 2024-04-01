

import MainNavigation from "@compoents/components/layout/main-navigation";

export default function ProductLayout({ children }) {
  return (
      <>
          <MainNavigation />
          {children}
      </>
  );
}