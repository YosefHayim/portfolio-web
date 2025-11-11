import * as THREE from 'three';

/**
 * Reusable material library following Three.js best practices
 * Materials are created once and reused to optimize performance
 */

// Neon glow material for terminal aesthetic
export const createNeonMaterial = (color: string = '#05df72') => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.5,
    roughness: 0.3,
    metalness: 0.8,
  });
};

// Holographic/glass material for terminal windows
export const createGlassMaterial = () => {
  return new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    metalness: 0,
    roughness: 0,
    transmission: 0.9,
    transparent: true,
    opacity: 0.3,
    thickness: 0.5,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
};

// Code matrix material with glow
export const createMatrixMaterial = () => {
  return new THREE.MeshBasicMaterial({
    color: 0x0f0, // Matrix green
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  });
};

// Metallic material for professional elements
export const createMetallicMaterial = (color: string = '#e0e0e0') => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.9,
    roughness: 0.1,
  });
};

// Achievement particle material
export const createParticleMaterial = (color: string = '#fdc700') => {
  return new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: 0.05,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });
};
