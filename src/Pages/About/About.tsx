import { useEffect } from 'react';
import { AboutThreeD } from './AboutThreeD';

/**
 * About Page - FULL 3D IMMERSIVE EXPERIENCE
 *
 * Career journey rendered as a 3D railway with scroll-synced train animation.
 * No 2D content - everything is interactive 3D stations along the timeline.
 */
const About = () => {
  useEffect(() => {
    document.title = 'About - Joseph Sabag';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <AboutThreeD />;
};

export default About;
