import { Route, Routes } from 'react-router';
import Homepage from './Pages/Homepage/Homepage';
import About from './Pages/About/About';
import { AboutThreeD } from './Pages/About/AboutThreeD';
import Certifications from './Pages/Certifications/Certifications';
import TechStack from './Pages/TechStack/TechStack';
import { TechStackThreeD } from './Pages/TechStack/TechStackThreeD';
import Projects from './Pages/Projects/Projects';
import { ProjectsThreeD } from './Pages/Projects/ProjectsThreeD';
import NotFound404 from './Pages/NotFound404/NotFound404';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import '@/index.css';

const App = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex w-full flex-col items-center justify-center gap-10 p-5">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/3d" element={<AboutThreeD />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/3d" element={<ProjectsThreeD />} />
          <Route path="/techStack" element={<TechStack />} />
          <Route path="/techStack/3d" element={<TechStackThreeD />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/404" element={<NotFound404 />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
