import { Suspense, useState, useEffect } from 'react';
import { ThreeCanvas } from '@/three/ThreeCanvas';
import { JourneyRailway } from '@/three/scenes/JourneyRailway';
import { StationDetailView } from '@/three/components/StationDetailView';
import { useDeviceDetection } from '@/three/hooks/useDeviceDetection';
import type { CareerMilestone } from '@/three/data/journeyData';
import { careerMilestones, milestoneCategories } from '@/three/data/journeyData';

/**
 * 3D About/Journey Page Wrapper
 * Shows career timeline as railway with scroll-synced train animation
 */
export const AboutThreeD = () => {
  const { quality } = useDeviceDetection();
  const [selectedMilestone, setSelectedMilestone] = useState<CareerMilestone | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll-synced train movement
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMilestone) {
        setSelectedMilestone(null);
      }
      // Arrow keys to move between milestones
      if (e.key === 'ArrowRight' && !selectedMilestone) {
        const currentIndex = careerMilestones.findIndex(
          (m) => m.position[0] >= scrollProgress * 115
        );
        if (currentIndex >= 0 && currentIndex < careerMilestones.length - 1) {
          setSelectedMilestone(careerMilestones[currentIndex + 1]);
        }
      }
      if (e.key === 'ArrowLeft' && !selectedMilestone) {
        const currentIndex = careerMilestones.findIndex(
          (m) => m.position[0] >= scrollProgress * 115
        );
        if (currentIndex > 0) {
          setSelectedMilestone(careerMilestones[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedMilestone, scrollProgress]);

  const handleMilestoneSelect = (milestone: CareerMilestone) => {
    setSelectedMilestone(milestone);
  };

  return (
    <div className="relative h-[300vh] w-full overflow-hidden bg-[#0a0e1a]">
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0">
        <ThreeCanvas cameraPosition={[0, 10, 20]} cameraFov={75}>
          <Suspense fallback={null}>
            <JourneyRailway
              quality={quality}
              scrollProgress={scrollProgress}
              onMilestoneSelect={handleMilestoneSelect}
            />

            {/* Detail view when milestone selected */}
            {selectedMilestone && (
              <StationDetailView
                milestone={selectedMilestone}
                onClose={() => setSelectedMilestone(null)}
              />
            )}
          </Suspense>
        </ThreeCanvas>
      </div>

      {/* Instructions overlay */}
      {!selectedMilestone && (
        <div className="pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2 transform">
          <div className="rounded-lg border-2 border-[#05df72] bg-[rgba(10,14,26,0.9)] px-6 py-3">
            <p className="text-center font-['JetBrains_Mono'] text-sm text-[#05df72]">
              🖱️ Scroll to move train through time • Click stations to explore • ← → Arrow keys
              to navigate
            </p>
          </div>
        </div>
      )}

      {/* Title overlay */}
      <div className="pointer-events-none fixed left-8 top-8">
        <h1 className="font-['JetBrains_Mono'] text-4xl font-bold text-[#05df72]">
          THE JOURNEY EXPRESS
        </h1>
        <p className="mt-2 font-['JetBrains_Mono'] text-sm text-gray-400">
          {selectedMilestone
            ? `Station: ${selectedMilestone.title} (${selectedMilestone.date})`
            : `${careerMilestones.length} milestones • Scroll to travel through time`}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="pointer-events-none fixed right-8 top-8">
        <div className="rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.8)] px-3 py-2">
          <p className="font-['JetBrains_Mono'] text-xs text-gray-400">
            Journey Progress:{' '}
            <span className="font-bold text-[#05df72]">{Math.round(scrollProgress * 100)}%</span>
          </p>
          <div className="mt-2 h-2 w-32 overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
            <div
              className="h-full bg-[#05df72] transition-all duration-300"
              style={{
                width: `${scrollProgress * 100}%`,
                boxShadow: '0 0 10px #05df72',
              }}
            />
          </div>
        </div>
      </div>

      {/* Timeline legend */}
      {!selectedMilestone && (
        <div className="pointer-events-none fixed bottom-8 right-8">
          <div className="space-y-2 rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.9)] p-4">
            <p className="mb-3 font-['JetBrains_Mono'] text-xs font-bold text-[#05df72]">
              MILESTONE CATEGORIES
            </p>
            {Object.entries(milestoneCategories).map(([categoryId, categoryData]) => (
              <div key={categoryId} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: categoryData.color,
                    boxShadow: `0 0 10px ${categoryData.color}`,
                  }}
                />
                <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                  {categoryData.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestone navigation panel (left side) */}
      {!selectedMilestone && (
        <div className="pointer-events-auto fixed left-8 top-1/2 max-h-[60vh] -translate-y-1/2 overflow-y-auto">
          <div className="space-y-2 rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.95)] p-3">
            <p className="mb-3 font-['JetBrains_Mono'] text-xs font-bold text-[#05df72]">
              QUICK JUMP
            </p>
            {careerMilestones.map((milestone, index) => {
              const milestoneProgress = milestone.position[0] / 115;
              const isNear = Math.abs(scrollProgress - milestoneProgress) < 0.1;

              return (
                <button
                  key={milestone.id}
                  onClick={() => {
                    const targetScroll =
                      milestoneProgress * (document.documentElement.scrollHeight - window.innerHeight);
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }}
                  className={`w-full rounded px-3 py-2 text-left font-['JetBrains_Mono'] text-xs transition-all ${
                    isNear
                      ? 'border-2 border-[#05df72] bg-[rgba(5,223,114,0.2)] text-[#05df72] shadow-[0_0_10px_#05df72]'
                      : 'border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-gray-400 hover:border-[#05df72] hover:text-[#05df72]'
                  }`}
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: milestoneCategories[milestone.category].color,
                  }}
                >
                  <div className="font-bold">{milestone.title}</div>
                  <div className="mt-1 text-[10px] opacity-70">{milestone.date}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Performance indicator */}
      <div className="pointer-events-none fixed right-8 bottom-24">
        <div className="rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.8)] px-3 py-2">
          <p className="font-['JetBrains_Mono'] text-xs text-gray-400">
            Quality: <span className="font-bold text-[#05df72]">{quality.toUpperCase()}</span>
          </p>
        </div>
      </div>

    </div>
  );
};
