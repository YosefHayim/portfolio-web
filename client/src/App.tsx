import { Route } from "react-router";
import Homepage from "./Components/Homepage/Homepage";
import About from "./Components/About/About";
import Certifications from "./Components/Certifications/Certifications";
import TechStack from "./Components/TechStack/TechStack";
import Projects from "./Components/Projects/Projects";
import NotFound404 from "./Components/NotFound404/NotFound404";

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
