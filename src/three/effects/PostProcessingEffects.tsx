import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette, Scanline } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import * as THREE from 'three';

interface PostProcessingEffectsProps {
  bloomEnabled?: boolean;
  bloomIntensity?: number;
  chromaticAberrationEnabled?: boolean;
  filmGrainEnabled?: boolean;
  scanlinesEnabled?: boolean;
  vignetteEnabled?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

export default function PostProcessingEffects({
  bloomEnabled = true,
  bloomIntensity = 1.5,
  chromaticAberrationEnabled = true,
  filmGrainEnabled = true,
  scanlinesEnabled = true,
  vignetteEnabled = true,
  quality = 'high',
}: PostProcessingEffectsProps) {

  // Adjust quality settings
  const bloomKernel = quality === 'high' ? KernelSize.LARGE : quality === 'medium' ? KernelSize.MEDIUM : KernelSize.SMALL;
  const bloomResolution = quality === 'high' ? 512 : quality === 'medium' ? 256 : 128;

  return (
    <EffectComposer multisampling={quality === 'high' ? 8 : quality === 'medium' ? 4 : 0}>
      {/* Bloom Effect - Glowing neon elements */}
      {bloomEnabled && (
        <Bloom
          intensity={bloomIntensity}
          kernelSize={bloomKernel}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.4}
          mipmapBlur={quality === 'high'}
          resolutionX={bloomResolution}
          resolutionY={bloomResolution}
        />
      )}

      {/* Chromatic Aberration - RGB split on movement */}
      {chromaticAberrationEnabled && (
        <ChromaticAberration
          offset={new THREE.Vector2(0.001, 0.001)}
          blendFunction={BlendFunction.NORMAL}
        />
      )}

      {/* Film Grain - Retro terminal aesthetic */}
      {filmGrainEnabled && (
        <Noise
          premultiply
          blendFunction={BlendFunction.OVERLAY}
          opacity={0.15}
        />
      )}

      {/* Scanlines - CRT monitor effect */}
      {scanlinesEnabled && (
        <Scanline
          blendFunction={BlendFunction.OVERLAY}
          density={quality === 'high' ? 1.5 : quality === 'medium' ? 1.25 : 1.0}
          opacity={0.05}
        />
      )}

      {/* Vignette - Darken edges for focus */}
      {vignetteEnabled && (
        <Vignette
          offset={0.3}
          darkness={0.5}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
      )}
    </EffectComposer>
  );
}

// Custom chromatic aberration effect that responds to mouse movement
export function DynamicChromaticAberration() {
  return (
    <ChromaticAberration
      offset={new THREE.Vector2(0.002, 0.002)}
      blendFunction={BlendFunction.NORMAL}
    />
  );
}

// Glitch effect for special moments
export function GlitchEffect() {
  return null; // Placeholder - requires custom implementation
}
