import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router';
import AIChatSidebar from './Components/AIChatSidebar/AIChatSidebar';
import BottomNav from './Components/BottomNav/BottomNav';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import ReturnVisitorDialog from './Components/ReturnVisitorDialog/ReturnVisitorDialog';
import ScrollProgress from './Components/ScrollProgress/ScrollProgress';
import { useReturnVisitor } from './hooks/useReturnVisitor';
import About from './Pages/About/About';
import Certifications from './Pages/Certifications/Certifications';
import Homepage from './Pages/Homepage/Homepage';
import NotFound404 from './Pages/NotFound404/NotFound404';
import ProjectDetail from './Pages/Projects/ProjectDetail/ProjectDetail';
import Projects from './Pages/Projects/Projects';
import TechStack from './Pages/TechStack/TechStack';
import '@/index.css';

const App = () => {
  const location = useLocation();
  const { shouldShowDialog, dismissDialog } = useReturnVisitor();

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-10 overflow-hidden p-5 pb-24 md:pb-5">
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route element={<Homepage />} path="/" />
            <Route element={<About />} path="/about" />
            <Route element={<Projects />} path="/projects" />
            <Route element={<ProjectDetail />} path="/projects/:projectId" />
            <Route element={<TechStack />} path="/techStack" />
            <Route element={<Certifications />} path="/certifications" />
            <Route element={<NotFound404 />} path="/404" />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <BottomNav />
      <ReturnVisitorDialog isOpen={shouldShowDialog} onClose={dismissDialog} />
      <AIChatSidebar />
    </div>
  );
};

export default App;
