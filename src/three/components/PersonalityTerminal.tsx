import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'question';
  text: string;
  color: string;
}

const terminalSequence: TerminalLine[] = [
  { type: 'command', text: '$ whoami', color: '#05df72' },
  { type: 'output', text: 'Joseph Sabag', color: '#ffffff' },
  { type: 'output', text: 'Full-Stack Developer | Problem Solver | Automation Enthusiast', color: '#b0b0b0' },
  { type: 'command', text: '$ cat background.txt', color: '#05df72' },
  { type: 'output', text: '"Started coding in 2023 with ZERO background"', color: '#fdc700' },
  { type: 'output', text: '"Used ChatGPT to build my first trading bots"', color: '#fdc700' },
  { type: 'output', text: '"Built automation tools to help my mom\'s work"', color: '#fdc700' },
  { type: 'output', text: '"That\'s when I knew: I can build ANYTHING"', color: '#fdc700' },
  { type: 'command', text: '$ ls achievements/', color: '#05df72' },
  { type: 'success', text: '✓ 11+ Full-Stack Projects', color: '#00C853' },
  { type: 'success', text: '✓ 50+ Technologies Mastered', color: '#00C853' },
  { type: 'success', text: '✓ Bootcamp Excellence Award', color: '#00C853' },
  { type: 'success', text: '✓ 10+ Professional Certifications', color: '#00C853' },
  { type: 'command', text: '$ echo $PHILOSOPHY', color: '#05df72' },
  { type: 'output', text: '"Build with intent. Solve real problems. Never stop learning."', color: '#00d9ff' },
  { type: 'question', text: 'Ready to build something amazing? →', color: '#ff6467' },
];

interface PersonalityTerminalProps {
  position: [number, number, number];
  quality?: 'low' | 'medium' | 'high';
}

export const PersonalityTerminal = ({
  position,
  quality = 'high',
}: PersonalityTerminalProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef<THREE.Group>(null);
  const cursorRef = useRef<THREE.Mesh>(null);

  // Typing animation
  useEffect(() => {
    if (currentLine >= terminalSequence.length) {
      setIsTyping(false);
      return;
    }

    const line = terminalSequence[currentLine];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < line.text.length) {
        setDisplayedText(line.text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
          setDisplayedText('');
        }, 500); // Pause before next line
      }
    }, 30); // Typing speed

    return () => clearInterval(typingInterval);
  }, [currentLine]);

  // Cursor blink animation
  useFrame((state) => {
    if (cursorRef.current && isTyping) {
      const opacity = Math.sin(state.clock.elapsedTime * 5) * 0.5 + 0.5;
      const material = cursorRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = opacity;
    }

    // Subtle floating animation
    if (terminalRef.current) {
      terminalRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  // Calculate visible lines (last 8 lines for readability)
  const visibleLines = terminalSequence.slice(
    Math.max(0, currentLine - 7),
    currentLine
  );

  return (
    <group ref={terminalRef} position={position}>
      {/* Terminal window background */}
      <RoundedBox args={[5, 4, 0.2]} radius={0.1} smoothness={4} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#0a0e1a"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* Terminal header bar */}
      <RoundedBox args={[5, 0.3, 0.21]} radius={0.1} smoothness={4} position={[0, 1.85, -0.05]}>
        <meshStandardMaterial
          color="#1a1f2e"
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Mac-style traffic light buttons */}
      <mesh position={[-2.2, 1.85, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ff6467" />
      </mesh>
      <mesh position={[-2, 1.85, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#fdc700" />
      </mesh>
      <mesh position={[-1.8, 1.85, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#05df72" />
      </mesh>

      {/* Terminal title */}
      <Text
        position={[0, 1.85, 0]}
        fontSize={0.12}
        color="#b0b0b0"
        anchorX="center"
        anchorY="middle"
        font="/jet-brains-mono/static/JetBrainsMono-Bold.ttf"
      >
        joseph@portfolio ~ zsh
      </Text>

      {/* Terminal content */}
      <group position={[-2.3, 1.4, 0]}>
        {visibleLines.map((line, index) => (
          <Text
            key={index}
            position={[0, -index * 0.35, 0]}
            fontSize={0.16}
            color={line.color}
            anchorX="left"
            anchorY="top"
            font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
            maxWidth={4.4}
            lineHeight={1.2}
          >
            {line.text}
          </Text>
        ))}

        {/* Current typing line */}
        {currentLine < terminalSequence.length && (
          <>
            <Text
              position={[0, -visibleLines.length * 0.35, 0]}
              fontSize={0.16}
              color={terminalSequence[currentLine].color}
              anchorX="left"
              anchorY="top"
              font="/jet-brains-mono/static/JetBrainsMono-Regular.ttf"
              maxWidth={4.4}
            >
              {displayedText}
            </Text>

            {/* Blinking cursor */}
            <mesh
              ref={cursorRef}
              position={[displayedText.length * 0.09, -visibleLines.length * 0.35 - 0.08, 0]}
            >
              <planeGeometry args={[0.08, 0.18]} />
              <meshBasicMaterial
                color={terminalSequence[currentLine].color}
                transparent
                opacity={1}
              />
            </mesh>
          </>
        )}
      </group>

      {/* Border glow effect */}
      {quality !== 'low' && (
        <mesh position={[0, 0, -0.12]}>
          <planeGeometry args={[5.1, 4.1]} />
          <meshBasicMaterial
            color="#05df72"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Scan line effect */}
      {quality === 'high' && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[5, 0.05]} />
          <meshBasicMaterial
            color="#05df72"
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};
