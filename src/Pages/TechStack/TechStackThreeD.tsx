import { Suspense, useState, useEffect } from 'react';
import { ThreeCanvas } from '@/three/ThreeCanvas';
import { TechConstellation } from '@/three/scenes/TechConstellation';
import { TechDataViz } from '@/three/components/TechDataViz';
import { SkillDetailView } from '@/three/components/SkillDetailView';
import { useDeviceDetection } from '@/three/hooks/useDeviceDetection';
import type { Technology } from '@/three/data/techStackData';
import { categories } from '@/three/data/techStackData';

/**
 * 3D Tech Stack Page Wrapper
 * Shows technologies as constellation with data visualizations
 */
export const TechStackThreeD = () => {
  const { quality } = useDeviceDetection();
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [showDataViz, setShowDataViz] = useState(false);

  const handleTechSelect = (tech: Technology) => {
    setSelectedTech(tech);
    console.log('Selected technology:', tech.name);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedTech) {
        setSelectedTech(null);
      }
      if (e.key.toLowerCase() === 'd') {
        setShowDataViz(!showDataViz);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedTech, showDataViz]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0e1a]">
      {/* 3D Canvas */}
      <ThreeCanvas cameraPosition={[0, 15, 25]} cameraFov={70}>
        <Suspense fallback={null}>
          <TechConstellation quality={quality} onTechSelect={handleTechSelect} />

          {/* Data visualizations (optional toggle) */}
          {showDataViz && <TechDataViz quality={quality} />}

          {/* Detail view when tech selected */}
          {selectedTech && (
            <SkillDetailView tech={selectedTech} onClose={() => setSelectedTech(null)} />
          )}
        </Suspense>
      </ThreeCanvas>

      {/* Instructions overlay */}
      {!selectedTech && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transform">
          <div className="rounded-lg border-2 border-[#05df72] bg-[rgba(10,14,26,0.9)] px-6 py-3">
            <p className="text-center font-['JetBrains_Mono'] text-sm text-[#05df72]">
              🖱️ Click & Drag to explore • Scroll to zoom • Click stars for details • Press D for data viz
            </p>
          </div>
        </div>
      )}

      {/* Title overlay */}
      <div className="pointer-events-none absolute left-8 top-8">
        <h1 className="font-['JetBrains_Mono'] text-4xl font-bold text-[#05df72]">
          TECH CONSTELLATION
        </h1>
        <p className="mt-2 font-['JetBrains_Mono'] text-sm text-gray-400">
          {selectedTech
            ? `Viewing: ${selectedTech.name} (${selectedTech.category})`
            : '49 technologies • 26 connections • 6 categories'}
        </p>
      </div>

      {/* Performance indicator */}
      <div className="pointer-events-none absolute right-8 top-8">
        <div className="rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.8)] px-3 py-2">
          <p className="font-['JetBrains_Mono'] text-xs text-gray-400">
            Quality:{' '}
            <span className="font-bold text-[#05df72]">
              {quality.toUpperCase()}
            </span>
          </p>
        </div>
      </div>

      {/* Category legend */}
      {!selectedTech && (
        <div className="pointer-events-none absolute bottom-8 right-8">
          <div className="space-y-2 rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.9)] p-4">
            <p className="mb-3 font-['JetBrains_Mono'] text-xs font-bold text-[#05df72]">
              TECHNOLOGY CATEGORIES
            </p>
            {Object.entries(categories).map(([categoryId, categoryData]) => (
              <div key={categoryId} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: categoryData.color,
                    boxShadow: `0 0 10px ${categoryData.color}`,
                  }}
                />
                <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                  {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data viz toggle button */}
      <div className="absolute bottom-8 left-8">
        <button
          onClick={() => setShowDataViz(!showDataViz)}
          className="rounded-lg border-2 border-[#00d9ff] bg-[rgba(10,14,26,0.9)] px-4 py-2 font-['JetBrains_Mono'] text-sm text-[#00d9ff] transition-all hover:bg-[rgba(0,217,255,0.2)] hover:shadow-[0_0_20px_#00d9ff]"
        >
          {showDataViz ? '📊 Hide' : '📊 Show'} Data Visualizations
        </button>
      </div>

      {/* Navigation hint */}
      {!selectedTech && (
        <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2">
          <div className="space-y-3 rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.9)] p-4">
            <p className="mb-2 font-['JetBrains_Mono'] text-xs font-bold text-[#05df72]">
              QUICK TIPS
            </p>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">🔄</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Auto-rotate enabled
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">🌟</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Hover for tech names
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">🔗</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Lines show relationships
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">📍</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Grouped by category
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Back to 2D button */}
      <div className="absolute right-8 bottom-8">
        <a
          href="/techStack"
          className="rounded-lg border-2 border-[#888888] bg-[rgba(10,14,26,0.9)] px-4 py-2 font-['JetBrains_Mono'] text-sm text-[#888888] transition-all hover:border-[#05df72] hover:text-[#05df72] hover:shadow-[0_0_20px_#05df72]"
        >
          ← Back to 2D View
        </a>
      </div>
    </div>
  );
};
