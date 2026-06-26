import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import BackToTop from "../components/BackToTop";
import Background from "../components/Background";
import CustomCursor from "../components/CustomCursor";

export default function MainLayout({ children }) {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-lg focus:bg-[var(--fg)] focus:px-4 focus:py-2 focus:text-[var(--bg)]"
      >
        Skip to content
      </a>
      <CustomCursor />
      <ScrollProgress />
      <Background />
      <Navbar />
      <main id="main">{children}</main>
      <BackToTop />
    </>
  );
}
