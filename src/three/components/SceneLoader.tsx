import { useEffect, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const loadingMessages = [
  'Initializing workspace...',
  'Loading Three.js modules...',
  'Compiling shaders...',
  'Assembling 3D scene...',
  'Optimizing performance...',
  'Almost there...',
  'Preparing experience...',
];

const humorousMessages = [
  'Convincing pixels to cooperate...',
  'Teaching vertices good manners...',
  'Brewing fresh WebGL...',
  'Untangling matrix mathematics...',
  'Polishing the render pipeline...',
  'Summoning GPU spirits...',
  'Aligning the code stars...',
];

interface SceneLoaderProps {
  onComplete?: () => void;
  allowSkip?: boolean;
}

export function SceneLoader({ onComplete, allowSkip = true }: SceneLoaderProps) {
  const { progress, active } = useProgress();
  const [message, setMessage] = useState(loadingMessages[0]);
  const [showSkip, setShowSkip] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Change message based on progress
    const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
    setMessage(loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]);

    // Show skip button after 2 seconds
    if (allowSkip) {
      const timer = setTimeout(() => setShowSkip(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [progress, allowSkip]);

  useEffect(() => {
    if (!active && progress === 100) {
      setTimeout(() => {
        setCompleted(true);
        onComplete?.();
      }, 500);
    }
  }, [active, progress, onComplete]);

  const handleSkip = () => {
    setCompleted(true);
    onComplete?.();
  };

  if (completed) return null;

  return (
    <Html center>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center"
          style={{
            width: '400px',
            padding: '2rem',
            background: 'rgba(10, 14, 26, 0.95)',
            border: '2px solid rgba(5, 223, 114, 0.3)',
            borderRadius: '12px',
            boxShadow: '0 0 30px rgba(5, 223, 114, 0.2)',
          }}
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="font-mono text-3xl font-bold text-[#05df72] mb-2">
              {'</>'}
            </div>
            <div className="font-mono text-sm text-[#e0e0e0]">
              Joseph Sabag Portfolio
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-mono text-sm text-[#e0e0e0]">Loading...</span>
              <span className="font-mono text-sm text-[#05df72]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#05df72] to-[#00d9ff]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 0 10px rgba(5, 223, 114, 0.5)',
                }}
              />
            </div>
          </div>

          {/* Loading Message */}
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-mono text-sm text-[#e0e0e0] mb-4 text-center"
          >
            {message}
          </motion.div>

          {/* Assembly Animation */}
          <div className="flex gap-2 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-[#05df72] rounded-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  boxShadow: '0 0 8px rgba(5, 223, 114, 0.6)',
                }}
              />
            ))}
          </div>

          {/* Skip Button */}
          {showSkip && allowSkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleSkip}
              className="font-mono text-sm text-[#00d9ff] hover:text-[#05df72] transition-colors"
            >
              Press any key to skip →
            </motion.button>
          )}

          {/* Humorous Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-mono text-xs text-[#64748b] mt-4 text-center"
          >
            {humorousMessages[Math.floor(Math.random() * humorousMessages.length)]}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Html>
  );
}

// 3D Loader variant for in-scene loading
export function SceneLoader3D() {
  const { progress } = useProgress();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.1);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <group>
      {/* Loading Cube */}
      <mesh rotation={[rotation, rotation * 0.7, rotation * 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#05df72"
          emissive="#05df72"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>

      {/* Progress Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.6, 64, 1, 0, (progress / 100) * Math.PI * 2]} />
        <meshBasicMaterial color="#00d9ff" />
      </mesh>

      {/* Progress Text */}
      <Html center>
        <div className="font-mono text-xl text-[#05df72] font-bold">
          {Math.round(progress)}%
        </div>
      </Html>
    </group>
  );
}
