import { Route } from "react-router";
import Homepage from "./Pages/Homepage/Homepage";
import About from "./Pages/About/About";
import Certifications from "./Pages/Certifications/Certifications";
import TechStack from "./Pages/TechStack/TechStack";
import Projects from "./Pages/Projects/Projects";
import NotFound404 from "./Pages/NotFound404/NotFound404";

const App = () => {
  return (
    <div>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/techStack" element={<TechStack />} />
      <Route path="/certifications" element={<Certifications />} />
      <Route path="/404" element={<NotFound404 />} />
    </div>
  );
};

export default App;
