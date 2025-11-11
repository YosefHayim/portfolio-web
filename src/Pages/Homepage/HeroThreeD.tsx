import { useState } from 'react';
import { ThreeCanvas } from '@/three/ThreeCanvas';
import { SceneSetup } from '@/three/components/SceneSetup';
import { HeroScene } from '@/three/scenes/HeroScene';

/**
 * 3D Hero component that wraps the Three.js hero scene
 * This component bridges 2D React with 3D Three.js
 */
export const HeroThreeD = () => {
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');

  const handleQualityChange = (newQuality: 'low' | 'medium' | 'high') => {
    console.log(`Performance adjusted to: ${newQuality}`);
    setQuality(newQuality);
  };

  return (
    <div className="fixed inset-0 -z-10">
      <ThreeCanvas
        onPerformanceChange={handleQualityChange}
        fallback={
          <div className="flex h-screen w-screen items-center justify-center bg-[#0a0e1a]">
            <div className="text-center">
              <div className="mb-4 text-6xl">⚡</div>
              <p className="font-mono text-lg text-[#05df72]">
                Loading 3D Experience...
              </p>
            </div>
          </div>
        }
      >
        <SceneSetup />
        <HeroScene quality={quality} />
      </ThreeCanvas>
    </div>
  );
};

export default HeroThreeD;
