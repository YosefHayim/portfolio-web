import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Scanline,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

interface PostProcessingProps {
  quality?: 'low' | 'medium' | 'high';
  enabled?: boolean;
}

/**
 * Post-processing effects for the 3D scenes
 * Includes bloom for neon glow, chromatic aberration for movement, and scanlines for CRT aesthetic
 *
 * Performance-aware: adjusts effect intensity based on quality setting
 */
export const PostProcessing = ({
  quality = 'high',
  enabled = true,
}: PostProcessingProps) => {
  if (!enabled) return null;

  // Adjust effect intensity based on quality
  const bloomIntensity =
    quality === 'high' ? 0.8 : quality === 'medium' ? 0.5 : 0.3;
  const bloomRadius =
    quality === 'high' ? 0.8 : quality === 'medium' ? 0.6 : 0.4;
  const chromaticOffset =
    quality === 'high' ? 0.002 : quality === 'medium' ? 0.001 : 0.0005;
  const scanlineOpacity =
    quality === 'high' ? 0.15 : quality === 'medium' ? 0.1 : 0.05;

  return (
    <EffectComposer
      disableNormalPass={quality === 'low'}
      multisampling={quality === 'high' ? 8 : quality === 'medium' ? 4 : 0}
    >
      {/* Bloom effect for neon glow on green elements */}
      <Bloom
        intensity={bloomIntensity}
        luminanceSmoothing={0.9}
        luminanceThreshold={0.3}
        mipmapBlur={quality !== 'low'}
        radius={bloomRadius}
      />

      {/* Chromatic aberration for subtle RGB split - enhances movement */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        modulationOffset={0.15}
        offset={new THREE.Vector2(chromaticOffset, chromaticOffset)}
        radialModulation={true}
      />

      {/* Subtle vignette for focus */}
      <Vignette
        blendFunction={BlendFunction.NORMAL}
        darkness={0.5}
        eskil={false}
        offset={0.3}
      />

      {/* CRT scanlines for retro terminal aesthetic */}
      {quality !== 'low' && (
        <Scanline
          blendFunction={BlendFunction.OVERLAY}
          density={1.5}
          opacity={scanlineOpacity}
        />
      )}
    </EffectComposer>
  );
};
