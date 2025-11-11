import { useControls, folder } from 'leva';
import { useEffect } from 'react';

interface DebugPanelProps {
  onSettingsChange?: (settings: any) => void;
  enabled?: boolean;
}

/**
 * Debug Panel for development using Leva
 * Military precision: fine-tune every parameter in real-time
 * Only visible in development mode
 */
export const DebugPanel = ({ onSettingsChange, enabled = true }: DebugPanelProps) => {
  // Only show in development
  if (import.meta.env.PROD || !enabled) {
    return null;
  }

  const settings = useControls({
    'Scene Settings': folder({
      backgroundColor: { value: '#0a0e1a', label: 'Background' },
      fogColor: { value: '#0a0e1a', label: 'Fog Color' },
      fogNear: { value: 10, min: 0, max: 50, label: 'Fog Near' },
      fogFar: { value: 50, min: 10, max: 100, label: 'Fog Far' },
    }),

    'Code Matrix': folder({
      matrixCount: { value: 1000, min: 100, max: 2000, step: 100, label: 'Particle Count' },
      matrixSpread: { value: 20, min: 10, max: 50, label: 'Spread' },
      matrixSpeed: { value: 0.05, min: 0.01, max: 0.2, step: 0.01, label: 'Fall Speed' },
      matrixColor: { value: '#0f0', label: 'Color' },
      matrixOpacity: { value: 0.6, min: 0, max: 1, step: 0.1, label: 'Opacity' },
    }),

    'Terminal Window': folder({
      terminalScale: { value: 1, min: 0.5, max: 2, step: 0.1, label: 'Scale' },
      terminalGlow: { value: 0.4, min: 0, max: 1, step: 0.1, label: 'Glow Intensity' },
      typingSpeed: { value: 100, min: 50, max: 300, step: 10, label: 'Typing Speed (ms)' },
    }),

    'Floating Text': folder({
      nameColor: { value: '#e0e0e0', label: 'Name Color' },
      titleColor: { value: '#05df72', label: 'Title Color' },
      nameSize: { value: 0.5, min: 0.2, max: 1, step: 0.1, label: 'Name Size' },
      titleSize: { value: 0.25, min: 0.1, max: 0.5, step: 0.05, label: 'Title Size' },
      floatSpeed: { value: 1.5, min: 0.5, max: 5, step: 0.5, label: 'Float Speed' },
    }),

    'Orbiting Cubes': folder({
      cubeCount: { value: 4, min: 3, max: 8, step: 1, label: 'Cube Count' },
      orbitRadius: { value: 2, min: 1, max: 5, step: 0.5, label: 'Orbit Radius' },
      orbitSpeed: { value: 0.2, min: 0.1, max: 1, step: 0.1, label: 'Rotation Speed' },
      cubeSize: { value: 0.3, min: 0.1, max: 0.5, step: 0.05, label: 'Cube Size' },
    }),

    'Post Processing': folder({
      bloomEnabled: { value: true, label: 'Enable Bloom' },
      bloomIntensity: { value: 0.5, min: 0, max: 2, step: 0.1, label: 'Bloom Intensity' },
      bloomRadius: { value: 0.4, min: 0, max: 1, step: 0.1, label: 'Bloom Radius' },
      chromaticEnabled: { value: false, label: 'Enable Chromatic Aberration' },
      scanlineEnabled: { value: true, label: 'Enable Scanlines' },
      scanlineIntensity: { value: 0.1, min: 0, max: 0.5, step: 0.05, label: 'Scanline Intensity' },
    }),

    'Performance': folder({
      targetFPS: { value: 60, min: 30, max: 144, step: 15, label: 'Target FPS' },
      autoQuality: { value: true, label: 'Auto Quality Adjustment' },
      quality: { value: 'high', options: ['low', 'medium', 'high'], label: 'Manual Quality' },
    }),

    'Camera': folder({
      cameraFOV: { value: 75, min: 45, max: 120, step: 5, label: 'Field of View' },
      cameraZ: { value: 5, min: 2, max: 10, step: 0.5, label: 'Camera Z Position' },
      parallaxEnabled: { value: true, label: 'Mouse Parallax' },
      parallaxIntensity: { value: 0.5, min: 0, max: 2, step: 0.1, label: 'Parallax Intensity' },
    }),
  });

  // Notify parent component of changes
  useEffect(() => {
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  return null; // Leva creates its own UI
};

/**
 * Hook to expose debug settings to components
 */
export const useDebugSettings = () => {
  if (import.meta.env.PROD) {
    return {
      enabled: false,
      settings: {},
    };
  }

  return {
    enabled: true,
    settings: useControls({
      showFPS: { value: true, label: 'Show FPS Counter' },
      showHelpers: { value: false, label: 'Show 3D Helpers' },
      showStats: { value: true, label: 'Show Stats' },
    }),
  };
};
