import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { TechConnection } from '../data/techStackData';
import { getTechnologyById } from '../data/techStackData';

interface ConnectionLinesProps {
  connections: TechConnection[];
  quality?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

/**
 * Connection lines showing relationships between technologies
 * Primary connections are brighter, secondary are dimmer
 */
export const ConnectionLines = ({
  connections,
  quality = 'high',
  animated = true,
}: ConnectionLinesProps) => {
  const linesRef = useRef<THREE.Group>(null);

  // Create line geometries for all connections
  const lineData = useMemo(() => {
    return connections.map((connection) => {
      const fromTech = getTechnologyById(connection.from);
      const toTech = getTechnologyById(connection.to);

      if (!fromTech || !toTech) return null;

      // Create curved line using quadratic bezier curve
      const start = new THREE.Vector3(...fromTech.position);
      const end = new THREE.Vector3(...toTech.position);

      // Calculate midpoint and offset for curve
      const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);

      // Add slight curve (pull toward origin for constellation effect)
      const curveOffset = distance * 0.15;
      const controlPoint = midpoint.clone().normalize().multiplyScalar(-curveOffset).add(midpoint);

      // Create bezier curve
      const curve = new THREE.QuadraticBezierCurve3(start, controlPoint, end);

      // Sample points along curve
      const points = curve.getPoints(quality === 'high' ? 50 : quality === 'medium' ? 30 : 20);

      return {
        points,
        strength: connection.strength,
        curve,
      };
    }).filter(Boolean);
  }, [connections, quality]);

  // Animate lines pulsing
  useFrame((state) => {
    if (linesRef.current && animated) {
      linesRef.current.children.forEach((line, index) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        if (material) {
          const baseOpacity = lineData[index]?.strength === 'primary' ? 0.4 : 0.15;
          const pulse = Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.1;
          material.opacity = baseOpacity + pulse;
        }
      });
    }
  });

  if (quality === 'low') {
    // Skip connection lines on low quality
    return null;
  }

  return (
    <group ref={linesRef}>
      {lineData.map((data, index) => {
        if (!data) return null;

        const isPrimary = data.strength === 'primary';
        const color = isPrimary ? '#05df72' : '#00d9ff';
        const opacity = isPrimary ? 0.4 : 0.15;
        const lineWidth = isPrimary ? 2 : 1;

        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={data.points.length}
                array={new Float32Array(data.points.flatMap((p) => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={color}
              transparent
              opacity={opacity}
              linewidth={lineWidth}
              blending={THREE.AdditiveBlending}
            />
          </line>
        );
      })}

      {/* Add animated particles traveling along lines */}
      {quality === 'high' && animated && (
        <ConnectionParticles lineData={lineData} />
      )}
    </group>
  );
};

/**
 * Animated particles that travel along connection lines
 */
const ConnectionParticles = ({ lineData }: { lineData: any[] }) => {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, index) => {
        const data = lineData[index % lineData.length];
        if (!data || !data.curve) return;

        // Animate particle along curve
        const speed = data.strength === 'primary' ? 0.5 : 0.3;
        const t = (state.clock.elapsedTime * speed + index * 0.3) % 1;
        const point = data.curve.getPoint(t);

        particle.position.set(point.x, point.y, point.z);

        // Fade in/out at ends
        const material = (particle as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (material) {
          const fadeDistance = 0.1;
          const opacity = Math.min(t / fadeDistance, (1 - t) / fadeDistance, 1) * 0.6;
          material.opacity = opacity;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {lineData.map((data, index) => {
        if (!data) return null;

        const color = data.strength === 'primary' ? '#05df72' : '#00d9ff';

        return (
          <mesh key={index}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.6}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
};
