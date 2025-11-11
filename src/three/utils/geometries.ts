import * as THREE from 'three';

/**
 * Custom geometry utilities for reusable shapes
 * Following Three.js best practices: create geometries once, reuse them
 */

// Create hexagon geometry for tech aesthetic
export const createHexagonGeometry = (radius = 1, height = 0.1) => {
  const shape = new THREE.Shape();
  const sides = 6;
  const angle = (Math.PI * 2) / sides;

  for (let i = 0; i < sides; i++) {
    const x = radius * Math.cos(i * angle);
    const y = radius * Math.sin(i * angle);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();

  const extrudeSettings = {
    depth: height,
    bevelEnabled: false,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};

// Create rounded box for modern UI elements
export const createRoundedBoxGeometry = (
  width = 1,
  height = 1,
  depth = 1,
  radius = 0.1,
  smoothness = 4
) => {
  return new THREE.BoxGeometry(width, height, depth).toNonIndexed();
};

// Create crystal/gem geometry for skill nodes
export const createCrystalGeometry = (size = 1) => {
  const geometry = new THREE.OctahedronGeometry(size, 0);
  return geometry;
};

// Create optimized particle system geometry
export const createParticleGeometry = (count = 1000, spread = 10) => {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * spread;
    positions[i3 + 1] = (Math.random() - 0.5) * spread;
    positions[i3 + 2] = (Math.random() - 0.5) * spread;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return geometry;
};

// Create line geometry for connections between nodes
export const createConnectionLine = (
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments = 20
) => {
  const curve = new THREE.LineCurve3(start, end);
  const points = curve.getPoints(segments);
  return new THREE.BufferGeometry().setFromPoints(points);
};
