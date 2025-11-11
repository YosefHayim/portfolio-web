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

      {/* Instructions overlay */}
      {!selectedProject && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transform">
          <div className="rounded-lg border-2 border-[#05df72] bg-[rgba(10,14,26,0.9)] px-6 py-3">
            <p className="text-center font-['JetBrains_Mono'] text-sm text-[#05df72]">
              🖱️ Click & Drag to rotate • Scroll to zoom • Click planets for details
            </p>
          </div>
        </div>
      )}

      {/* Title overlay */}
      <div className="pointer-events-none absolute left-8 top-8">
        <h1 className="font-['JetBrains_Mono'] text-4xl font-bold text-[#05df72]">
          PROJECT GALAXY
        </h1>
        <p className="mt-2 font-['JetBrains_Mono'] text-sm text-gray-400">
          {selectedProject
            ? `Viewing: ${selectedProject.name}`
            : 'Explore 11 projects orbiting the core'}
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

      {/* Legend */}
      {!selectedProject && (
        <div className="pointer-events-none absolute bottom-8 right-8">
          <div className="space-y-2 rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.9)] p-4">
            <p className="mb-3 font-['JetBrains_Mono'] text-xs font-bold text-[#05df72]">
              PROJECT STATUS
            </p>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#00C853]" />
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Live & Running
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#fdc700] shadow-[0_0_10px_#fdc700]" />
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                In Development
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#888888]" />
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Completed
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
