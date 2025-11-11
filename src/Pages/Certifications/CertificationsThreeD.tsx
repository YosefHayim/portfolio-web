import { Suspense, useState, useEffect } from 'react';
import { ThreeCanvas } from '@/three/ThreeCanvas';
import { TrophyCase } from '@/three/scenes/TrophyCase';
import { CertificateDetailView } from '@/three/components/CertificateDetailView';
import { useDeviceDetection } from '@/three/hooks/useDeviceDetection';
import type { Certification } from '@/three/data/certificationsData';

/**
 * 3D Certifications Page Wrapper
 * Shows certifications as trophies in a rotating display case
 */
export const CertificationsThreeD = () => {
  const { quality } = useDeviceDetection();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const handleCertSelect = (cert: Certification) => {
    setSelectedCert(cert);
    console.log('Selected certification:', cert.title);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCert) {
        setSelectedCert(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCert]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0e1a]">
      {/* 3D Canvas */}
      <ThreeCanvas cameraPosition={[0, 5, 15]} cameraFov={65}>
        <Suspense fallback={null}>
          <TrophyCase quality={quality} onCertSelect={handleCertSelect} />

          {/* Detail view when cert selected */}
          {selectedCert && (
            <CertificateDetailView cert={selectedCert} onClose={() => setSelectedCert(null)} />
          )}
        </Suspense>
      </ThreeCanvas>

      {/* Instructions overlay */}
      {!selectedCert && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transform">
          <div className="rounded-lg border-2 border-[#05df72] bg-[rgba(10,14,26,0.9)] px-6 py-3">
            <p className="text-center font-['JetBrains_Mono'] text-sm text-[#05df72]">
              🖱️ Click & Drag to rotate • Scroll to zoom • Click certificates for details
            </p>
          </div>
        </div>
      )}

      {/* Title overlay */}
      <div className="pointer-events-none absolute left-8 top-8">
        <h1 className="font-['JetBrains_Mono'] text-4xl font-bold text-[#05df72]">
          TROPHY CASE
        </h1>
        <p className="mt-2 font-['JetBrains_Mono'] text-sm text-gray-400">
          {selectedCert
            ? `Viewing: ${selectedCert.title}`
            : 'Professional certifications & achievements'}
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

      {/* Museum info panel */}
      {!selectedCert && (
        <div className="pointer-events-none absolute bottom-8 right-8">
          <div className="space-y-2 rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.9)] p-4">
            <p className="mb-3 font-['JetBrains_Mono'] text-xs font-bold text-[#05df72]">
              ABOUT THE COLLECTION
            </p>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">🏆</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Professional Certifications
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">🎓</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Completed Courses
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">⭐</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Achievements & Awards
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation controls hint */}
      {!selectedCert && (
        <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2">
          <div className="space-y-3 rounded-lg border border-[#05df72] bg-[rgba(10,14,26,0.9)] p-4">
            <p className="mb-2 font-['JetBrains_Mono'] text-xs font-bold text-[#05df72]">
              NAVIGATION
            </p>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">🔄</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Auto-rotate enabled
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">📜</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Scroll wheel to zoom
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">🖱️</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Drag to rotate view
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#05df72]">ESC</span>
              <span className="font-['JetBrains_Mono'] text-xs text-gray-400">
                Close detail view
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
