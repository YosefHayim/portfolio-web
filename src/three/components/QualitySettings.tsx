import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { PerformanceMonitor } from '../utils/deviceDetection';

interface QualitySettingsProps {
  performanceMonitor?: PerformanceMonitor;
}

export default function QualitySettings({ performanceMonitor }: QualitySettingsProps) {
  const { currentQuality, setQuality, capabilities, qualitySettings } = useMobileOptimization();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0a0e1a]/90 border border-[#05df72]/30 rounded-full w-12 h-12 flex items-center justify-center hover:border-[#05df72] hover:bg-[#05df72]/10 transition-all backdrop-blur-sm group"
      >
        <span className="font-mono text-xl group-hover:rotate-45 transition-transform">
          ⚙️
        </span>
      </button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 w-80 bg-[#0a0e1a]/95 border border-[#05df72]/30 rounded-lg p-4 backdrop-blur-sm"
          >
            <h3 className="font-mono text-lg font-bold text-[#05df72] mb-4">
              Graphics Settings
            </h3>

            {/* Quality Selector */}
            <div className="mb-4">
              <label className="font-mono text-sm text-[#e0e0e0] block mb-2">
                Quality Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((quality) => (
                  <button
                    key={quality}
                    onClick={() => setQuality(quality)}
                    className={`font-mono text-sm py-2 px-3 rounded transition-all ${
                      currentQuality === quality
                        ? 'bg-[#05df72] text-[#0a0e1a] font-bold'
                        : 'bg-[#1e293b] text-[#e0e0e0] hover:bg-[#334155]'
                    }`}
                  >
                    {quality.charAt(0).toUpperCase() + quality.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Settings Display */}
            <div className="mb-4 space-y-2">
              <div className="font-mono text-xs text-[#64748b] border-t border-[#1e293b] pt-3">
                Current Settings:
              </div>
              <SettingRow label="Particles" value={qualitySettings.particleCount} />
              <SettingRow label="Shadows" value={qualitySettings.shadowsEnabled ? 'On' : 'Off'} />
              <SettingRow label="Post-FX" value={qualitySettings.postProcessingEnabled ? 'On' : 'Off'} />
              <SettingRow label="Antialias" value={qualitySettings.antialias ? 'On' : 'Off'} />
              <SettingRow label="Max Lights" value={qualitySettings.maxLights} />
            </div>

            {/* Performance Stats */}
            {performanceMonitor && (
              <div className="mb-4 space-y-2">
                <div className="font-mono text-xs text-[#64748b] border-t border-[#1e293b] pt-3">
                  Performance:
                </div>
                <SettingRow label="FPS" value={performanceMonitor.getFPS()} />
                <SettingRow label="Avg FPS" value={performanceMonitor.getAverageFPS()} />
              </div>
            )}

            {/* Device Info */}
            <div className="border-t border-[#1e293b] pt-3">
              <div className="font-mono text-xs text-[#64748b] mb-2">
                Device Info:
              </div>
              <div className="space-y-1">
                <InfoRow label="Type" value={capabilities.isMobile ? 'Mobile' : capabilities.isTablet ? 'Tablet' : 'Desktop'} />
                <InfoRow label="GPU" value={capabilities.gpu.substring(0, 20)} />
                <InfoRow label="Cores" value={capabilities.cores} />
                {capabilities.memory && <InfoRow label="RAM" value={`${capabilities.memory}GB`} />}
                <InfoRow label="WebGL2" value={capabilities.supportsWebGL2 ? 'Yes' : 'No'} />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full font-mono text-sm py-2 bg-[#1e293b] text-[#e0e0e0] rounded hover:bg-[#334155] transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-mono text-xs text-[#e0e0e0]">{label}:</span>
      <span className="font-mono text-xs text-[#05df72]">{value}</span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-mono text-xs text-[#64748b]">{label}:</span>
      <span className="font-mono text-xs text-[#e0e0e0]">{value}</span>
    </div>
  );
}
