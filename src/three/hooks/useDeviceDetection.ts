import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  quality: 'low' | 'medium' | 'high';
}

/**
 * Device detection hook for adaptive 3D quality
 * Military precision: detects device capabilities and adjusts automatically
 */
export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    // Determine quality based on device
    let quality: 'low' | 'medium' | 'high' = 'high';
    if (isMobile) {
      quality = pixelRatio > 2 ? 'medium' : 'low'; // Retina mobile = medium, others = low
    } else if (isTablet) {
      quality = 'medium';
    } else {
      quality = 'high';
    }

    return {
      isMobile,
      isTablet,
      isDesktop,
      screenWidth: width,
      screenHeight: height,
      pixelRatio,
      quality,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      let quality: 'low' | 'medium' | 'high' = 'high';
      if (isMobile) {
        quality = pixelRatio > 2 ? 'medium' : 'low';
      } else if (isTablet) {
        quality = 'medium';
      } else {
        quality = 'high';
      }

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        screenWidth: width,
        screenHeight: height,
        pixelRatio,
        quality,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
};
