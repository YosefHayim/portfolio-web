import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FallbackModeProps {
  onEnable3D?: () => void;
  reason?: string;
}

export default function FallbackMode({ onEnable3D, reason }: FallbackModeProps) {
  const [show3DOption, setShow3DOption] = useState(false);

  useEffect(() => {
    // Show 3D option after a delay
    const timer = setTimeout(() => setShow3DOption(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0e1a] flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#05df72] via-transparent to-[#00d9ff]" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#05df72] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -10,
              opacity: Math.random(),
            }}
            animate={{
              y: window.innerHeight + 10,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-2xl mx-auto px-6 text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="font-mono text-6xl font-bold text-[#05df72] mb-4">
            {'</>'}
          </div>
          <h1 className="font-mono text-3xl font-bold text-[#e0e0e0] mb-2">
            Joseph Sabag
          </h1>
          <p className="font-mono text-lg text-[#64748b]">
            Full-Stack Developer
          </p>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-[#1e293b] border border-[#05df72]/30 rounded-lg p-6 mb-4">
            <h2 className="font-mono text-xl text-[#05df72] mb-3">
              Classic Mode Enabled
            </h2>
            <p className="font-mono text-sm text-[#e0e0e0] mb-2">
              {reason || 'Your device may not support 3D graphics, or WebGL is disabled.'}
            </p>
            <p className="font-mono text-xs text-[#64748b]">
              You're viewing the lightweight version of this portfolio.
            </p>
          </div>

          {/* Alternative navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Projects', path: '/projects', icon: '◉' },
              { label: 'Tech Stack', path: '/techStack', icon: '⚡' },
              { label: 'About', path: '/about', icon: '👨‍💻' },
              { label: 'Certifications', path: '/certifications', icon: '🏆' },
            ].map((item, i) => (
              <motion.a
                key={item.path}
                href={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-[#1e293b] border border-[#05df72]/20 rounded-lg p-4 hover:border-[#05df72] hover:bg-[#1e293b]/80 transition-all group"
              >
                <div className="font-mono text-2xl mb-2">{item.icon}</div>
                <div className="font-mono text-sm text-[#e0e0e0] group-hover:text-[#05df72] transition-colors">
                  {item.label}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Enable 3D option */}
        {show3DOption && onEnable3D && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <button
              onClick={onEnable3D}
              className="font-mono text-sm text-[#00d9ff] hover:text-[#05df72] transition-colors underline"
            >
              Try enabling 3D mode anyway →
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-[#1e293b]"
        >
          <p className="font-mono text-xs text-[#64748b]">
            Trying to get better everyday
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Component to detect and show fallback
export function FallbackDetector({ children }: { children: React.ReactNode }) {
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackReason, setFallbackReason] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

    if (!gl) {
      setFallbackReason('WebGL is not supported or is disabled in your browser.');
      setShowFallback(true);
      return;
    }

    // Check for very old devices
    const isTooOld = !window.requestAnimationFrame || !window.Promise;
    if (isTooOld) {
      setFallbackReason('Your browser is too old to support modern 3D graphics.');
      setShowFallback(true);
      return;
    }

    // Check memory
    // @ts-ignore
    const memory = navigator.deviceMemory;
    if (memory && memory < 2) {
      setFallbackReason('Your device has limited memory. Using lightweight mode for better performance.');
      setShowFallback(true);
      return;
    }
  }, []);

  if (showFallback) {
    return (
      <FallbackMode
        reason={fallbackReason}
        onEnable3D={() => setShowFallback(false)}
      />
    );
  }

  return <>{children}</>;
}
