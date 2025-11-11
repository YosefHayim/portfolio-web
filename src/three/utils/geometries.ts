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
  _radius = 0.1,
  _smoothness = 4
) => {
  // TODO: Implement proper rounded corners using RoundedBoxGeometry from drei
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

// Create glowing star geometry for skill constellation
export const createStarGeometry = (innerRadius = 0.5, outerRadius = 1, points = 5) => {
  const shape = new THREE.Shape();
  const angleStep = (Math.PI * 2) / (points * 2);

  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = radius * Math.cos(i * angleStep - Math.PI / 2);
    const y = radius * Math.sin(i * angleStep - Math.PI / 2);

    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();

  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 3,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};

// Create planet/sphere with detail levels for projects
export const createPlanetGeometry = (
  radius = 1,
  quality: 'low' | 'medium' | 'high' = 'high'
) => {
  const widthSegments = quality === 'high' ? 64 : quality === 'medium' ? 32 : 16;
  const heightSegments = quality === 'high' ? 64 : quality === 'medium' ? 32 : 16;
  return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
};

// Create train track segment geometry
export const createTrackSegment = (length = 10, width = 0.5) => {
  const group = new THREE.Group();

  // Left rail
  const leftRail = new THREE.BoxGeometry(0.1, 0.1, length);
  const leftMesh = new THREE.Mesh(leftRail);
  leftMesh.position.x = -width / 2;
  group.add(leftMesh);

  // Right rail
  const rightRail = new THREE.BoxGeometry(0.1, 0.1, length);
  const rightMesh = new THREE.Mesh(rightRail);
  rightMesh.position.x = width / 2;
  group.add(rightMesh);

  // Ties (sleepers)
  const tieCount = Math.floor(length / 0.5);
  for (let i = 0; i < tieCount; i++) {
    const tie = new THREE.BoxGeometry(width + 0.2, 0.05, 0.2);
    const tieMesh = new THREE.Mesh(tie);
    tieMesh.position.z = (i / tieCount) * length - length / 2;
    tieMesh.position.y = -0.05;
    group.add(tieMesh);
  }

  return group;
};

// Create phone/mobile device geometry for WhatsApp button
export const createPhoneGeometry = () => {
  const phone = new THREE.Group();

  // Phone body
  const body = new THREE.BoxGeometry(0.5, 1, 0.1);
  const bodyMesh = new THREE.Mesh(body);
  phone.add(bodyMesh);

  // Screen (slightly inset)
  const screen = new THREE.BoxGeometry(0.45, 0.85, 0.02);
  const screenMesh = new THREE.Mesh(screen);
  screenMesh.position.z = 0.04;
  screenMesh.position.y = 0.05;
  phone.add(screenMesh);

  // Home button
  const button = new THREE.CircleGeometry(0.05, 32);
  const buttonMesh = new THREE.Mesh(button);
  buttonMesh.position.z = 0.06;
  buttonMesh.position.y = -0.4;
  phone.add(buttonMesh);

  return phone;
};

// Create document/paper geometry for CV download
export const createDocumentGeometry = (width = 1, height = 1.4) => {
  const shape = new THREE.Shape();

  // Document outline with folded corner
  shape.moveTo(0, 0);
  shape.lineTo(width, 0);
  shape.lineTo(width, height - 0.2);
  shape.lineTo(width - 0.2, height);
  shape.lineTo(0, height);
  shape.lineTo(0, 0);

  // Folded corner
  const cornerShape = new THREE.Path();
  cornerShape.moveTo(width - 0.2, height);
  cornerShape.lineTo(width - 0.2, height - 0.2);
  cornerShape.lineTo(width, height - 0.2);

  const extrudeSettings = {
    depth: 0.02,
    bevelEnabled: false,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};

// Create terminal window frame geometry
export const createTerminalFrame = (width = 4, height = 2.5, depth = 0.1) => {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  return geometry;
};

// Create orbit ring for project planets
export const createOrbitRing = (radius = 5, thickness = 0.02, segments = 128) => {
  const geometry = new THREE.TorusGeometry(radius, thickness, 16, segments);
  return geometry;
};

// Create trophy/achievement geometry for certifications
export const createTrophyGeometry = () => {
  const trophy = new THREE.Group();

  // Cup body (tapered cylinder)
  const cupGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.5, 32);
  const cupMesh = new THREE.Mesh(cupGeometry);
  cupMesh.position.y = 0.25;
  trophy.add(cupMesh);

  // Base
  const baseGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 32);
  const baseMesh = new THREE.Mesh(baseGeometry);
  baseMesh.position.y = -0.05;
  trophy.add(baseMesh);

  // Handles (left and right)
  const handleGeometry = new THREE.TorusGeometry(0.15, 0.03, 8, 16, Math.PI);
  const leftHandle = new THREE.Mesh(handleGeometry);
  leftHandle.position.x = -0.25;
  leftHandle.position.y = 0.3;
  leftHandle.rotation.y = -Math.PI / 2;
  trophy.add(leftHandle);

  const rightHandle = new THREE.Mesh(handleGeometry);
  rightHandle.position.x = 0.25;
  rightHandle.position.y = 0.3;
  rightHandle.rotation.y = Math.PI / 2;
  trophy.add(rightHandle);

  return trophy;
};

// Create holographic card for certificates
export const createCardGeometry = (width = 2, height = 1.4, cornerRadius = 0.1) => {
  const shape = new THREE.Shape();

  // Rounded rectangle
  shape.moveTo(-width / 2 + cornerRadius, -height / 2);
  shape.lineTo(width / 2 - cornerRadius, -height / 2);
  shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + cornerRadius);
  shape.lineTo(width / 2, height / 2 - cornerRadius);
  shape.quadraticCurveTo(width / 2, height / 2, width / 2 - cornerRadius, height / 2);
  shape.lineTo(-width / 2 + cornerRadius, height / 2);
  shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - cornerRadius);
  shape.lineTo(-width / 2, -height / 2 + cornerRadius);
  shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + cornerRadius, -height / 2);

  const extrudeSettings = {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};
