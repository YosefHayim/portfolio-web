import { EffectComposer, Bloom, ChromaticAberration, Vignette, Scanline } from '@react-three/postprocessing';
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
export const PostProcessing = ({ quality = 'high', enabled = true }: PostProcessingProps) => {
  if (!enabled) return null;

  // Adjust effect intensity based on quality
  const bloomIntensity = quality === 'high' ? 0.8 : quality === 'medium' ? 0.5 : 0.3;
  const bloomRadius = quality === 'high' ? 0.8 : quality === 'medium' ? 0.6 : 0.4;
  const chromaticOffset = quality === 'high' ? 0.002 : quality === 'medium' ? 0.001 : 0.0005;
  const scanlineOpacity = quality === 'high' ? 0.15 : quality === 'medium' ? 0.1 : 0.05;

  return (
    <EffectComposer
      multisampling={quality === 'high' ? 8 : quality === 'medium' ? 4 : 0}
      disableNormalPass={quality === 'low'}
    >
      {/* Bloom effect for neon glow on green elements */}
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
        radius={bloomRadius}
        mipmapBlur={quality !== 'low'}
      />

      {/* Chromatic aberration for subtle RGB split - enhances movement */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(chromaticOffset, chromaticOffset)}
        radialModulation={true}
        modulationOffset={0.15}
      />

      {/* Subtle vignette for focus */}
      <Vignette
        offset={0.3}
        darkness={0.5}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
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
