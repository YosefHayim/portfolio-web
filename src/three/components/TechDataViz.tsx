import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { technologies, categories } from '../data/techStackData';
import type { TechnologyCategory } from '../data/techStackData';

interface TechDataVizProps {
  position?: [number, number, number];
  quality?: 'low' | 'medium' | 'high';
}

/**
 * 3D data visualization showing tech stack statistics
 * Includes bar charts and pie charts
 */
export const TechDataViz = ({ position = [0, -12, 0], quality = 'high' }: TechDataVizProps) => {
  return (
    <group position={position}>
      {/* Category distribution bar chart */}
      <CategoryBarChart position={[-15, 0, 0]} quality={quality} />

      {/* Proficiency pie chart */}
      <ProficiencyPieChart position={[15, 0, 0]} quality={quality} />

      {/* Experience timeline */}
      <ExperienceTimeline position={[0, 0, 15]} quality={quality} />
    </group>
  );
};

/**
 * 3D Bar chart showing technology count by category
 */
const CategoryBarChart = ({
  position,
  quality,
}: {
  position: [number, number, number];
  quality: 'low' | 'medium' | 'high';
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Animate bars growing
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Count technologies per category
  const categoryCounts = Object.keys(categories).map((categoryId) => ({
    category: categoryId as TechnologyCategory,
    count: technologies.filter((tech) => tech.category === categoryId).length,
    color: categories[categoryId as TechnologyCategory].color,
  }));

  const maxCount = Math.max(...categoryCounts.map((c) => c.count));
  const barWidth = 1.5;
  const barSpacing = 2.5;

  return (
    <group ref={groupRef} position={position}>
      {/* Title */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.6}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#0a0e1a"
      >
        TECH BY CATEGORY
      </Text>

      {/* Bars */}
      {categoryCounts.map((item, index) => {
        const height = (item.count / maxCount) * 6;
        const x = (index - categoryCounts.length / 2) * barSpacing;

        return (
          <group key={item.category} position={[x, 0, 0]}>
            {/* Bar pillar */}
            <mesh position={[0, height / 2, 0]} castShadow={quality === 'high'}>
              <boxGeometry args={[barWidth, height, barWidth]} />
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={0.3}
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>

            {/* Bar glow */}
            {quality !== 'low' && (
              <mesh position={[0, height / 2, 0]}>
                <boxGeometry args={[barWidth * 1.1, height * 1.05, barWidth * 1.1]} />
                <meshBasicMaterial
                  color={item.color}
                  transparent
                  opacity={0.2}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            )}

            {/* Count label on top */}
            <Text
              position={[0, height + 0.8, 0]}
              fontSize={0.5}
              color={item.color}
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
            >
              {item.count}
            </Text>

            {/* Category label at base */}
            <Text
              position={[0, -0.8, 0]}
              fontSize={0.25}
              color="#888888"
              anchorX="center"
              anchorY="middle"
              rotation={[0, 0, 0]}
            >
              {item.category.toUpperCase()}
            </Text>

            {/* Base platform */}
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[barWidth * 0.7, barWidth * 0.7, 0.2, 16]} />
              <meshStandardMaterial color="#05df72" emissive="#05df72" emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      })}

      {/* Grid floor */}
      <gridHelper
        args={[20, 10, item.color, '#05df72']}
        position={[0, -0.5, 0]}
        material-transparent
        material-opacity={0.2}
      />
    </group>
  );
};

/**
 * 3D Pie chart showing proficiency distribution
 */
const ProficiencyPieChart = ({
  position,
  quality,
}: {
  position: [number, number, number];
  quality: 'low' | 'medium' | 'high';
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate pie chart
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  // Group by proficiency levels
  const proficiencyGroups = [
    { range: 'Expert (9-10)', min: 9, max: 10, color: '#05df72' },
    { range: 'Advanced (7-8)', min: 7, max: 8, color: '#00d9ff' },
    { range: 'Intermediate (5-6)', min: 5, max: 6, color: '#fdc700' },
    { range: 'Beginner (1-4)', min: 1, max: 4, color: '#888888' },
  ];

  const proficiencyCounts = proficiencyGroups.map((group) => ({
    ...group,
    count: technologies.filter(
      (tech) => tech.proficiencyLevel >= group.min && tech.proficiencyLevel <= group.max
    ).length,
  }));

  const totalCount = technologies.length;
  const radius = 4;
  const thickness = 1;

  let startAngle = 0;

  return (
    <group ref={groupRef} position={position}>
      {/* Title */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.6}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#0a0e1a"
      >
        PROFICIENCY LEVELS
      </Text>

      {/* Pie slices */}
      {proficiencyCounts.map((item) => {
        const percentage = item.count / totalCount;
        const angle = percentage * Math.PI * 2;

        // Create ring segment geometry
        const shape = new THREE.Shape();
        const innerRadius = radius - thickness;

        // Outer arc
        shape.absarc(0, 0, radius, startAngle, startAngle + angle, false);

        // Line to inner arc
        const endX = Math.cos(startAngle + angle) * innerRadius;
        const endY = Math.sin(startAngle + angle) * innerRadius;
        shape.lineTo(endX, endY);

        // Inner arc (reverse)
        shape.absarc(0, 0, innerRadius, startAngle + angle, startAngle, true);

        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.5,
          bevelEnabled: false,
        });

        geometry.rotateX(Math.PI / 2);

        // Label position
        const labelAngle = startAngle + angle / 2;
        const labelRadius = radius + 1.5;
        const labelX = Math.cos(labelAngle) * labelRadius;
        const labelZ = Math.sin(labelAngle) * labelRadius;

        const slice = (
          <group key={item.range}>
            {/* Pie slice */}
            <mesh geometry={geometry} position={[0, 0, 0]} castShadow={quality === 'high'}>
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={0.4}
                metalness={0.5}
                roughness={0.4}
              />
            </mesh>

            {/* Slice glow */}
            {quality !== 'low' && (
              <mesh geometry={geometry} position={[0, 0.05, 0]}>
                <meshBasicMaterial
                  color={item.color}
                  transparent
                  opacity={0.3}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            )}

            {/* Label */}
            <Text
              position={[labelX, 1, labelZ]}
              fontSize={0.3}
              color={item.color}
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
            >
              {item.count}
            </Text>

            <Text
              position={[labelX, 0.4, labelZ]}
              fontSize={0.2}
              color="#888888"
              anchorX="center"
              anchorY="middle"
            >
              {item.range}
            </Text>

            <Text
              position={[labelX, -0.1, labelZ]}
              fontSize={0.18}
              color="#666666"
              anchorX="center"
              anchorY="middle"
            >
              {Math.round(percentage * 100)}%
            </Text>
          </group>
        );

        startAngle += angle;
        return slice;
      })}

      {/* Center disc */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[radius - thickness, radius - thickness, 0.5, 32]} />
        <meshStandardMaterial color="#0a0e1a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

/**
 * 3D Timeline showing years of experience
 */
const ExperienceTimeline = ({
  position,
  quality,
}: {
  position: [number, number, number];
  quality: 'low' | 'medium' | 'high';
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Get unique experience years
  const experienceYears = Array.from(new Set(technologies.map((tech) => tech.yearsExperience))).sort(
    (a, b) => b - a
  );

  const barSpacing = 2;

  return (
    <group ref={groupRef} position={position}>
      {/* Title */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.6}
        color="#05df72"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#0a0e1a"
      >
        EXPERIENCE YEARS
      </Text>

      {/* Bars for each year */}
      {experienceYears.map((years, index) => {
        const count = technologies.filter((tech) => tech.yearsExperience === years).length;
        const height = count * 0.5;
        const x = (index - experienceYears.length / 2) * barSpacing;

        return (
          <group key={years} position={[x, 0, 0]}>
            {/* Bar */}
            <mesh position={[0, height / 2, 0]} castShadow={quality === 'high'}>
              <cylinderGeometry args={[0.5, 0.5, height, 16]} />
              <meshStandardMaterial
                color="#00d9ff"
                emissive="#00d9ff"
                emissiveIntensity={0.4}
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>

            {/* Count label */}
            <Text
              position={[0, height + 0.6, 0]}
              fontSize={0.4}
              color="#00d9ff"
              anchorX="center"
              anchorY="middle"
              font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
            >
              {count}
            </Text>

            {/* Years label */}
            <Text
              position={[0, -0.6, 0]}
              fontSize={0.3}
              color="#888888"
              anchorX="center"
              anchorY="middle"
            >
              {years}y
            </Text>
          </group>
        );
      })}
    </group>
  );
};
