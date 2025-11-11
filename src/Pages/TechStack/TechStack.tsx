import { useEffect } from 'react';
import { TechStackThreeD } from './TechStackThreeD';

/**
 * Tech Stack Page - FULL 3D IMMERSIVE EXPERIENCE
 *
 * All technologies are now rendered as a 3D constellation with connecting lines.
 * No 2D sections - everything is interactive 3D stars in space.
 */
const TechStack = () => {
  useEffect(() => {
    document.title = 'Tech Stack - Joseph Sabag';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return <TechStackThreeD />;
};

export default TechStack;
