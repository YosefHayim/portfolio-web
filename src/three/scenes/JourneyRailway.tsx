import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Train } from '../components/Train';
import { TrainStation } from '../components/TrainStation';
import { RailwayTrack } from '../components/RailwayTrack';
import {
  careerMilestones,
  trackSegments,
  getPositionAtProgress,
  getTotalJourneyLength,
  type CareerMilestone,
} from '../data/journeyData';

interface JourneyRailwayProps {
  quality?: 'low' | 'medium' | 'high';
  scrollProgress?: number; // 0 to 1, controlled by parent
  onMilestoneSelect?: (milestone: CareerMilestone) => void;
}

/**
 * Journey Railway Scene
 * Visualizes career timeline as a 3D railway with train animation
 */
export const JourneyRailway = ({
  quality = 'high',
  scrollProgress = 0,
  onMilestoneSelect,
}: JourneyRailwayProps) => {
  const { camera } = useThree();
  const [selectedMilestone, setSelectedMilestone] = useState<CareerMilestone | null>(null);
  const [trainProgress, setTrainProgress] = useState(0);
  const trainRef = useRef<THREE.Group>(null);
  const cameraTargetRef = useRef(new THREE.Vector3());

  // Update train position based on scroll progress
  useEffect(() => {
    setTrainProgress(scrollProgress);
  }, [scrollProgress]);

  // Smooth camera following train
  useFrame(() => {
    if (!selectedMilestone) {
      const trainPosition = getPositionAtProgress(trainProgress);
      cameraTargetRef.current.set(trainPosition[0], trainPosition[1] + 5, trainPosition[2]);

      // Smooth camera movement
      camera.position.lerp(
        new THREE.Vector3(
          cameraTargetRef.current.x - 10,
          cameraTargetRef.current.y + 8,
          cameraTargetRef.current.z + 15
        ),
        0.05
      );

      camera.lookAt(cameraTargetRef.current);
    }
  });

  const handleStationClick = (milestone: CareerMilestone) => {
    setSelectedMilestone(milestone);
    onMilestoneSelect?.(milestone);
  };

  // Get train position and rotation
  const trainPosition = getPositionAtProgress(trainProgress);

  // Calculate train rotation based on direction of travel
  const getTrainRotation = () => {
    const nextProgress = Math.min(trainProgress + 0.01, 1);
    const nextPosition = getPositionAtProgress(nextProgress);
    const dx = nextPosition[0] - trainPosition[0];
    const dz = nextPosition[2] - trainPosition[2];
    return Math.atan2(dx, dz);
  };

  const trainRotation = getTrainRotation();

  // Find closest milestone to current train position
  const closestMilestone = careerMilestones.reduce((closest, milestone) => {
    const milestonePos = new THREE.Vector3(...milestone.position);
    const trainPos = new THREE.Vector3(...trainPosition);
    const distance = milestonePos.distanceTo(trainPos);

    if (!closest || distance < closest.distance) {
      return { milestone, distance };
    }
    return closest;
  }, null as { milestone: CareerMilestone; distance: number } | null);

  return (
    <group>
      {/* Camera controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        maxDistance={60}
        minDistance={10}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        enabled={!selectedMilestone}
      />

      {/* Stars background */}
      <Stars
        radius={200}
        depth={80}
        count={quality === 'high' ? 6000 : quality === 'medium' ? 3000 : 1500}
        factor={4}
        saturation={0}
        fade
        speed={0.2}
      />

      {/* Railway tracks */}
      <RailwayTrack segments={trackSegments} quality={quality} />

      {/* Train stations (career milestones) */}
      {careerMilestones.map((milestone) => (
        <TrainStation
          key={milestone.id}
          milestone={milestone}
          onClick={handleStationClick}
          quality={quality}
          isActive={
            selectedMilestone?.id === milestone.id ||
            (!selectedMilestone && closestMilestone?.milestone.id === milestone.id)
          }
        />
      ))}

      {/* Train */}
      <Train
        position={trainPosition}
        rotation={trainRotation}
        quality={quality}
      />

      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />

      {/* Directional lights for depth */}
      <directionalLight
        position={[30, 40, 30]}
        intensity={0.4}
        color="#05df72"
        castShadow={quality === 'high'}
      />
      <directionalLight
        position={[-30, 40, -30]}
        intensity={0.3}
        color="#00d9ff"
      />

      {/* Fog for atmospheric depth */}
      <fog attach="fog" args={['#0a0e1a', 40, 100]} />

      {/* Ground plane (optional, for shadows) */}
      {quality === 'high' && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[50, -5, -10]} receiveShadow>
          <planeGeometry args={[300, 150]} />
          <meshStandardMaterial
            color="#0a0e1a"
            roughness={0.9}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}

      {/* Grid helper for spatial reference */}
      {quality !== 'low' && (
        <gridHelper
          args={[200, 40, '#05df72', '#05df72']}
          position={[60, -4, -10]}
          material-transparent
          material-opacity={0.15}
        />
      )}

      {/* Journey start marker */}
      <group position={[-5, 0, 2]}>
        <mesh>
          <cylinderGeometry args={[1, 1.5, 0.5, 32]} />
          <meshStandardMaterial
            color="#05df72"
            emissive="#05df72"
            emissiveIntensity={0.8}
          />
        </mesh>
        <pointLight
          position={[0, 2, 0]}
          color="#05df72"
          intensity={3}
          distance={10}
        />
      </group>

      {/* Journey end marker (future) */}
      <group position={[120, 13, -3]}>
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#fdc700"
            emissive="#fdc700"
            emissiveIntensity={1.2}
            transparent
            opacity={0.8}
          />
        </mesh>
        {quality !== 'low' && (
          <>
            <mesh scale={1.2}>
              <sphereGeometry args={[1.5, 24, 24]} />
              <meshBasicMaterial
                color="#fdc700"
                transparent
                opacity={0.3}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            <mesh scale={1.4}>
              <sphereGeometry args={[1.5, 24, 24]} />
              <meshBasicMaterial
                color="#fdc700"
                transparent
                opacity={0.15}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </>
        )}
        <pointLight
          position={[0, 0, 0]}
          color="#fdc700"
          intensity={5}
          distance={15}
        />
      </group>
    </group>
  );
};
