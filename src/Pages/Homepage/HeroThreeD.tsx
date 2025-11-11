import { useState, useEffect } from 'react';
import { ThreeCanvas } from '@/three/ThreeCanvas';
import { SceneSetup } from '@/three/components/SceneSetup';
import { HeroScene } from '@/three/scenes/HeroScene';
import { PostProcessing } from '@/three/effects/PostProcessing';
import { useDeviceDetection } from '@/three/hooks/useDeviceDetection';

/**
 * 3D Hero component that wraps the Three.js hero scene
 * This component bridges 2D React with 3D Three.js
 */
export const HeroThreeD = () => {
  const deviceInfo = useDeviceDetection();
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>(deviceInfo.quality);

  // Update quality when device info changes (resize, orientation change)
  useEffect(() => {
    setQuality(deviceInfo.quality);
  }, [deviceInfo.quality]);

  const handleQualityChange = (newQuality: 'low' | 'medium' | 'high') => {
    console.log(`Performance adjusted to: ${newQuality}`);
    setQuality(newQuality);
  };

  return (
    <div className="fixed inset-0 -z-10">
      <ThreeCanvas
        quality={quality}
        onPerformanceChange={handleQualityChange}
      >
        <SceneSetup />
        <HeroScene quality={quality} />
        <PostProcessing quality={quality} enabled={true} />
      </ThreeCanvas>
    </div>
  );
};

export default HeroThreeD;
