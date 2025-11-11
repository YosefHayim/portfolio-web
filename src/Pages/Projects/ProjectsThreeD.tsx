import { Suspense, useState } from 'react';
import { ThreeCanvas } from '@/three/ThreeCanvas';
import { ProjectsScene } from '@/three/scenes/ProjectsScene';
import { useDeviceDetection } from '@/three/hooks/useDeviceDetection';
import type { ProjectData } from '@/three/data/projectsData';

/**
 * 3D Projects Page Wrapper
 * Shows projects as a solar system with orbiting planets
 */
export const ProjectsThreeD = () => {
  const { quality } = useDeviceDetection();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleProjectSelect = (project: ProjectData) => {
    setSelectedProject(project);
    console.log('Selected project:', project.name);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0e1a]">
      {/* 3D Canvas */}
      <ThreeCanvas cameraPosition={[0, 10, 20]} cameraFov={60}>
        <Suspense fallback={null}>
          <ProjectsScene quality={quality} onProjectSelect={handleProjectSelect} />
        </Suspense>
      </ThreeCanvas>

      {/* Navigation Instructions Panel - Enhanced */}
      {!selectedProject && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transform">
          <div className="rounded-lg border-2 border-[#05df72] bg-[rgba(10,14,26,0.95)] px-8 py-4 shadow-[0_0_30px_rgba(5,223,114,0.3)]">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="text-xl">🪐</span>
              <p className="text-center font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider text-[#05df72]">
                NAVIGATION CONTROLS
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-center font-['JetBrains_Mono'] text-xs text-gray-300">
                <span className="font-bold text-[#00d9ff]">CLICK & DRAG</span> to rotate view
              </p>
              <p className="text-center font-['JetBrains_Mono'] text-xs text-gray-300">
                <span className="font-bold text-[#fdc700]">SCROLL</span> to zoom in/out
              </p>
              <p className="text-center font-['JetBrains_Mono'] text-xs text-gray-300">
                <span className="font-bold text-[#05df72]">CLICK PLANETS</span> for project details
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Title overlay - Enhanced */}
      <div className="pointer-events-none absolute left-8 top-8">
        <div className="rounded-lg border border-[#05df72]/30 bg-[rgba(10,14,26,0.8)] p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            <div>
              <h1 className="font-['JetBrains_Mono'] text-3xl font-bold text-[#05df72]">
                PROJECT SOLAR SYSTEM
              </h1>
              <p className="mt-1 font-['JetBrains_Mono'] text-xs text-gray-400">
                {selectedProject ? (
                  <span className="text-[#fdc700]">
                    📍 Viewing: <span className="font-bold text-white">{selectedProject.name}</span>
                  </span>
                ) : (
                  <>
                    <span className="font-bold text-[#05df72]">11 Projects</span> orbiting around core tech stack
                    <br />
                    <span className="text-[#00d9ff]">Click any planet to explore</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
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

      {/* Enhanced Legend */}
      {!selectedProject && (
        <div className="pointer-events-none absolute bottom-8 right-8">
          <div className="space-y-3 rounded-lg border border-[#05df72]/50 bg-[rgba(10,14,26,0.95)] p-4 shadow-[0_0_20px_rgba(5,223,114,0.2)]">
            {/* Legend Header */}
            <div className="flex items-center gap-2 border-b border-[#05df72]/30 pb-2">
              <span className="text-base">📊</span>
              <p className="font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider text-[#05df72]">
                PROJECT STATUS
              </p>
            </div>

            {/* Status Items */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#00C853] shadow-[0_0_10px_#00C853]" />
                <span className="font-['JetBrains_Mono'] text-xs text-gray-300">
                  <span className="font-bold text-[#00C853]">Live</span> & Production
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#fdc700] shadow-[0_0_10px_#fdc700]" />
                <span className="font-['JetBrains_Mono'] text-xs text-gray-300">
                  <span className="font-bold text-[#fdc700]">Active</span> Development
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#888888]" />
                <span className="font-['JetBrains_Mono'] text-xs text-gray-300">
                  <span className="font-bold text-gray-400">Completed</span> Archive
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-3 border-t border-[#05df72]/30 pt-2">
              <p className="font-['JetBrains_Mono'] text-[10px] text-gray-500">
                🌟 Hover over planets for quick info
                <br />
                💡 Planet size = project complexity
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
