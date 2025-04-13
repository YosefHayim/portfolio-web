import MatrixBackground from "./Components/MatrixBackground";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Projects from "./Components/Projects";
import TechStack from "./Components/TechStack";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import About from "./Components/About";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-5 bg-black text-[#00FF41]">
      <MatrixBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Contact />
      <Footer />
    </div>
  );
}
