import { useEffect, useState } from 'react';
import { detectDeviceCapabilities, getQualitySettings, QualitySettings } from '../utils/deviceDetection';

export function useMobileOptimization() {
  const [capabilities, setCapabilities] = useState(() => detectDeviceCapabilities());
  const [qualitySettings, setQualitySettings] = useState<QualitySettings>(() =>
    getQualitySettings(capabilities.quality)
  );
  const [userOverride, setUserOverride] = useState<'low' | 'medium' | 'high' | null>(null);

  useEffect(() => {
    // Re-detect on window resize (orientation change)
    const handleResize = () => {
      const newCaps = detectDeviceCapabilities();
      setCapabilities(newCaps);

      // Update quality settings if no user override
      if (!userOverride) {
        setQualitySettings(getQualitySettings(newCaps.quality));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [userOverride]);

  // Allow manual quality override
  const setQuality = (quality: 'low' | 'medium' | 'high') => {
    setUserOverride(quality);
    setQualitySettings(getQualitySettings(quality));

    // Store in localStorage
    localStorage.setItem('portfolio-quality', quality);
  };

  // Load saved quality preference
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-quality');
    if (saved && (saved === 'low' || saved === 'medium' || saved === 'high')) {
      setQuality(saved);
    }
  }, []);

  // Get simplified scene settings
  const getSceneSettings = () => {
    if (capabilities.isMobile) {
      return {
        ...qualitySettings,
        // Mobile-specific overrides
        particleCount: Math.floor(qualitySettings.particleCount * 0.5),
        shadowsEnabled: false,
        maxLights: Math.min(qualitySettings.maxLights, 3),
        cameraFar: 100,
      };
    }

    return qualitySettings;
  };

  return {
    capabilities,
    qualitySettings: getSceneSettings(),
    currentQuality: userOverride || capabilities.quality,
    setQuality,
    isMobile: capabilities.isMobile,
    isTablet: capabilities.isTablet,
    isDesktop: capabilities.isDesktop,
    hasTouch: capabilities.hasTouch,
  };
}

// Helper to get platform-specific controls hint
export function getControlsHint(isMobile: boolean, hasTouch: boolean): string {
  if (isMobile) {
    return 'Swipe to look around • Pinch to zoom • Tap to interact';
  }
  if (hasTouch) {
    return 'Touch to drag • Pinch to zoom • WASD to move • Click to interact';
  }
  return 'Drag to look around • Scroll to zoom • WASD to move • Click to interact';
}
