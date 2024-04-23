import MainNavigation from "@compoents/components/layout/main-navigation";

export default function SearchLayout({ children }) {
  return (
      <>
          <MainNavigation />
          {children}
      </>
  );
}