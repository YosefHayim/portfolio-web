import { useMemo } from 'react';
import * as THREE from 'three';
import type { TrackSegment } from '../data/journeyData';

interface RailwayTrackProps {
  segments: TrackSegment[];
  quality?: 'low' | 'medium' | 'high';
}

/**
 * 3D Railway tracks with ties and rails
 * Uses Bezier curves for smooth curved paths
 */
export const RailwayTrack = ({ segments, quality = 'high' }: RailwayTrackProps) => {
  // Generate track geometry
  const trackData = useMemo(() => {
    return segments.map((segment) => {
      const start = new THREE.Vector3(...segment.start);
      const end = new THREE.Vector3(...segment.end);

      // Create curved path if control points exist
      let curve: THREE.Curve<THREE.Vector3>;
      if (segment.controlPoint1 && segment.controlPoint2) {
        const cp1 = new THREE.Vector3(...segment.controlPoint1);
        const cp2 = new THREE.Vector3(...segment.controlPoint2);
        curve = new THREE.CubicBezierCurve3(start, cp1, cp2, end);
      } else if (segment.controlPoint1) {
        const cp = new THREE.Vector3(...segment.controlPoint1);
        curve = new THREE.QuadraticBezierCurve3(start, cp, end);
      } else {
        curve = new THREE.LineCurve3(start, end);
      }

      const points = curve.getPoints(quality === 'high' ? 100 : quality === 'medium' ? 60 : 30);
      return { curve, points };
    });
  }, [segments, quality]);

  const tieSpacing = quality === 'high' ? 2 : quality === 'medium' ? 3 : 4;

  return (
    <group>
      {trackData.map((data, segmentIndex) => (
        <group key={segmentIndex}>
          {/* Left rail */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={data.points.length}
                array={new Float32Array(
                  data.points.flatMap((p) => {
                    const offset = new THREE.Vector3(-0.4, 0, 0);
                    return [p.x + offset.x, p.y + offset.y, p.z + offset.z];
                  })
                )}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#888888" linewidth={2} />
          </line>

          {/* Right rail */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={data.points.length}
                array={new Float32Array(
                  data.points.flatMap((p) => {
                    const offset = new THREE.Vector3(0.4, 0, 0);
                    return [p.x + offset.x, p.y + offset.y, p.z + offset.z];
                  })
                )}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#888888" linewidth={2} />
          </line>

          {/* Railroad ties */}
          {quality !== 'low' &&
            data.points
              .filter((_, i) => i % tieSpacing === 0)
              .map((point, tieIndex) => {
                // Calculate rotation to align tie perpendicular to track
                const tangent =
                  tieIndex < data.points.length - 1
                    ? new THREE.Vector3()
                        .subVectors(data.points[tieIndex + 1], point)
                        .normalize()
                    : new THREE.Vector3()
                        .subVectors(point, data.points[tieIndex - 1])
                        .normalize();

                const angle = Math.atan2(tangent.x, tangent.z);

                return (
                  <mesh
                    key={`tie-${segmentIndex}-${tieIndex}`}
                    position={[point.x, point.y - 0.15, point.z]}
                    rotation={[0, angle, 0]}
                  >
                    <boxGeometry args={[1.2, 0.15, 0.3]} />
                    <meshStandardMaterial color="#3d2817" roughness={0.9} />
                  </mesh>
                );
              })}

          {/* Track centerline (for debugging/visual guidance) */}
          {quality === 'high' && (
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={data.points.length}
                  array={new Float32Array(data.points.flatMap((p) => [p.x, p.y, p.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#05df72"
                transparent
                opacity={0.2}
                linewidth={1}
              />
            </line>
          )}
        </group>
      ))}
    </group>
  );
};
