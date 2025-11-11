import { useEffect } from 'react';
import { CertificationsThreeD } from './CertificationsThreeD';

/**
 * Certifications Page - FULL 3D IMMERSIVE EXPERIENCE
 *
 * All certifications are now rendered as trophies in a 3D museum display case.
 * No 2D grid - everything is interactive 3D trophies on rotating pedestals.
 */
const Certifications = () => {
  useEffect(() => {
    document.title = 'Certifications - Joseph Sabag';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return <CertificationsThreeD />;
};

export default Certifications;
