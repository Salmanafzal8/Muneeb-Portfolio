import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useLenis } from "./hooks/useLenis";
import Loader from "./components/Loader";
import MainLayout from "./layouts/MainLayout";
import Hero from "./sections/Hero";

// Below-the-fold sections are code-split and lazy loaded.
const About = lazy(() => import("./sections/About"));
const Showreel = lazy(() => import("./sections/Showreel"));
const Experience = lazy(() => import("./sections/Experience"));
const Skills = lazy(() => import("./sections/Skills"));
const Languages = lazy(() => import("./sections/Languages"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

export default function App() {
  useLenis();

  return (
    <ThemeProvider>
      <Loader />
      <MainLayout>
        <Hero />
        <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
          <About />
          <Showreel />
          <Experience />
          <Skills />
          <Languages />
          <Contact />
          <Footer />
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  );
}
