import StyledComponentsRegistry from "../lib/registry";
import StyledMainHeader from "../components/layout/Header";
import Providers from "./providers";


export const metadata = {
  title: "다락방",
  description: "당신의 숨겨진 물건을 찾으세요!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <StyledComponentsRegistry>
          <StyledMainHeader />
          {children}
        </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}