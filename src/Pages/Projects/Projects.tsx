import { useEffect } from 'react';
import { ProjectsThreeD } from './ProjectsThreeD';

/**
 * Projects Page - FULL 3D IMMERSIVE EXPERIENCE
 *
 * All projects are now rendered as a 3D solar system with orbiting planets.
 * No 2D grid - everything is interactive 3D.
 */
const Projects = () => {
  useEffect(() => {
    document.title = 'Projects - Joseph Sabag';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return <ProjectsThreeD />;
};

export default Projects;
