import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface BreadcrumbNode {
  position: THREE.Vector3;
  timestamp: number;
  id: number;
}

interface BreadcrumbTrailProps {
  maxNodes?: number;
  interval?: number;
  fadeTime?: number;
  color?: string;
  size?: number;
  enabled?: boolean;
}

export default function BreadcrumbTrail({
  maxNodes = 50,
  interval = 1000, // milliseconds between nodes
  fadeTime = 5000, // milliseconds before node fades
  color = '#05df72',
  size = 0.1,
  enabled = true,
}: BreadcrumbTrailProps) {
  const { camera } = useThree();
  const [nodes, setNodes] = useState<BreadcrumbNode[]>([]);
  const lastNodeTime = useRef(0);
  const nodeIdCounter = useRef(0);
  const lineRef = useRef<THREE.Line>(null);

  // Add new breadcrumb nodes
  useFrame((state) => {
    if (!enabled) return;

    const now = Date.now();
    if (now - lastNodeTime.current > interval) {
      const newNode: BreadcrumbNode = {
        position: camera.position.clone(),
        timestamp: now,
        id: nodeIdCounter.current++,
      };

      setNodes((prev) => {
        const updated = [...prev, newNode];
        // Remove old nodes
        return updated.filter(node => now - node.timestamp < fadeTime);
      });

      lastNodeTime.current = now;
    }
  });

  // Update line geometry
  useEffect(() => {
    if (!lineRef.current || nodes.length < 2) return;

    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
    });

    lineRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  }, [nodes]);

  if (!enabled || nodes.length === 0) return null;

  return (
    <group>
      {/* Breadcrumb nodes */}
      {nodes.map((node) => {
        const now = Date.now();
        const age = now - node.timestamp;
        const opacity = 1 - age / fadeTime;

        return (
          <mesh key={node.id} position={node.position}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity * 0.6}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}

      {/* Trail line */}
      {nodes.length >= 2 && (
        <line ref={lineRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={nodes.length}
              array={new Float32Array(nodes.length * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={0.4}
            linewidth={2}
          />
        </line>
      )}

      {/* Glow points */}
      {nodes.map((node) => {
        const now = Date.now();
        const age = now - node.timestamp;
        const opacity = 1 - age / fadeTime;

        return (
          <mesh key={`glow-${node.id}`} position={node.position}>
            <sphereGeometry args={[size * 2, 8, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity * 0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Preset paths for navigation
export function PresetBreadcrumbPath({
  points,
  color = '#05df72',
  animated = true,
}: {
  points: THREE.Vector3[];
  color?: string;
  animated?: boolean;
}) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame((state) => {
    if (!animated || !lineRef.current) return;

    // Animate the line material
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
  });

  const positions = new Float32Array(points.length * 3);
  points.forEach((point, i) => {
    positions[i * 3] = point.x;
    positions[i * 3 + 1] = point.y;
    positions[i * 3 + 2] = point.z;
  });

  return (
    <group>
      {/* Path line */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          linewidth={3}
        />
      </line>

      {/* Waypoint markers */}
      {points.map((point, i) => (
        <group key={i} position={point}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.8}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
