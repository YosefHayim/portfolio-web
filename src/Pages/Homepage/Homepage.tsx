import { useEffect } from 'react';
import HeroThreeD from './HeroThreeD';

/**
 * Homepage - FULL 3D IMMERSIVE EXPERIENCE
 *
 * All content is now rendered in 3D through HeroScene.
 * No 2D overlays - everything is interactive 3D elements.
 *
 * Converted components:
 * - Hero section → FloatingText3D + HolographicPortrait + NavButton3D
 * - WhoAmI section → Interactive3DTerminal
 */
const Homepage = () => {
  useEffect(() => {
    document.title = 'Joseph Sabag - Full-Stack Developer';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <>
      {/* Full 3D Hero Scene - everything is 3D now */}
      <HeroThreeD />
    </>
  );
};

export default Homepage;
