import { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SoundContextValue {
  enabled: boolean;
  volume: number;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  playSound: (soundName: SoundEffect) => void;
  playAmbient: (soundName: AmbientSound) => void;
  stopAmbient: () => void;
}

export enum SoundEffect {
  CLICK = 'click',
  HOVER = 'hover',
  WHOOSH = 'whoosh',
  SUCCESS = 'success',
  ERROR = 'error',
  TYPING = 'typing',
  ACHIEVEMENT = 'achievement',
}

export enum AmbientSound {
  SPACE = 'ambient-space',
  TERMINAL = 'ambient-terminal',
  MUSIC = 'ambient-music',
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSoundManager() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundManager must be used within SoundManagerProvider');
  }
  return context;
}

interface SoundManagerProviderProps {
  children: React.ReactNode;
}

export function SoundManagerProvider({ children }: SoundManagerProviderProps) {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const audioContext = useRef<AudioContext | null>(null);
  const soundBuffers = useRef<Map<string, AudioBuffer>>(new Map());
  const ambientSource = useRef<AudioBufferSourceNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  // Initialize audio context
  useEffect(() => {
    audioContext.current = new AudioContext();
    gainNode.current = audioContext.current.createGain();
    gainNode.current.connect(audioContext.current.destination);
    gainNode.current.gain.value = volume;

    // Load sound preference from localStorage
    const savedEnabled = localStorage.getItem('portfolio-sound-enabled');
    if (savedEnabled === 'true') {
      setEnabled(true);
    }

    const savedVolume = localStorage.getItem('portfolio-sound-volume');
    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolumeState(vol);
      if (gainNode.current) {
        gainNode.current.gain.value = vol;
      }
    }

    return () => {
      if (ambientSource.current) {
        ambientSource.current.stop();
      }
      audioContext.current?.close();
    };
  }, []);

  // Update gain when volume changes
  useEffect(() => {
    if (gainNode.current) {
      gainNode.current.gain.setTargetAtTime(volume, audioContext.current!.currentTime, 0.1);
    }
  }, [volume]);

  const toggleSound = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    localStorage.setItem('portfolio-sound-enabled', String(newEnabled));

    // Resume audio context if needed
    if (newEnabled && audioContext.current?.state === 'suspended') {
      audioContext.current.resume();
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    localStorage.setItem('portfolio-sound-volume', String(clampedVolume));
  };

  const loadSound = async (soundName: string, url: string): Promise<AudioBuffer> => {
    if (soundBuffers.current.has(soundName)) {
      return soundBuffers.current.get(soundName)!;
    }

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.current!.decodeAudioData(arrayBuffer);
      soundBuffers.current.set(soundName, audioBuffer);
      return audioBuffer;
    } catch (error) {
      console.error(`Failed to load sound: ${soundName}`, error);
      throw error;
    }
  };

  const playSound = async (soundName: SoundEffect) => {
    if (!enabled || !audioContext.current || !gainNode.current) return;

    const soundUrls: Record<SoundEffect, string> = {
      [SoundEffect.CLICK]: '/sounds/click.mp3',
      [SoundEffect.HOVER]: '/sounds/hover.mp3',
      [SoundEffect.WHOOSH]: '/sounds/whoosh.mp3',
      [SoundEffect.SUCCESS]: '/sounds/success.mp3',
      [SoundEffect.ERROR]: '/sounds/error.mp3',
      [SoundEffect.TYPING]: '/sounds/typing.mp3',
      [SoundEffect.ACHIEVEMENT]: '/sounds/achievement.mp3',
    };

    try {
      const buffer = await loadSound(soundName, soundUrls[soundName]);
      const source = audioContext.current.createBufferSource();
      source.buffer = buffer;
      source.connect(gainNode.current);
      source.start(0);
    } catch (error) {
      // Silently fail if sound doesn't exist
      console.warn(`Sound not available: ${soundName}`);
    }
  };

  const playAmbient = async (soundName: AmbientSound) => {
    if (!enabled || !audioContext.current || !gainNode.current) return;

    // Stop current ambient
    if (ambientSource.current) {
      ambientSource.current.stop();
    }

    const soundUrls: Record<AmbientSound, string> = {
      [AmbientSound.SPACE]: '/sounds/ambient-space.mp3',
      [AmbientSound.TERMINAL]: '/sounds/ambient-terminal.mp3',
      [AmbientSound.MUSIC]: '/sounds/ambient-music.mp3',
    };

    try {
      const buffer = await loadSound(soundName, soundUrls[soundName]);
      const source = audioContext.current.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gainNode.current);
      source.start(0);
      ambientSource.current = source;
    } catch (error) {
      console.warn(`Ambient sound not available: ${soundName}`);
    }
  };

  const stopAmbient = () => {
    if (ambientSource.current) {
      ambientSource.current.stop();
      ambientSource.current = null;
    }
  };

  const value: SoundContextValue = {
    enabled,
    volume,
    toggleSound,
    setVolume,
    playSound,
    playAmbient,
    stopAmbient,
  };

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

// Sound Toggle Button Component
export function SoundToggleButton() {
  const { enabled, volume, toggleSound, setVolume } = useSoundManager();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {showVolumeSlider && (
        <div className="bg-[#0a0e1a]/90 border border-[#05df72]/30 rounded-lg p-3 backdrop-blur-sm">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>
      )}

      <button
        onClick={toggleSound}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        className="bg-[#0a0e1a]/90 border border-[#05df72]/30 rounded-full w-12 h-12 flex items-center justify-center hover:border-[#05df72] hover:bg-[#05df72]/10 transition-all backdrop-blur-sm group"
      >
        <span className="font-mono text-xl group-hover:scale-110 transition-transform">
          {enabled ? '🔊' : '🔇'}
        </span>
      </button>
    </div>
  );
}

// Hook for easily playing sounds in components
export function useSound() {
  const { playSound, enabled } = useSoundManager();

  const playClick = () => enabled && playSound(SoundEffect.CLICK);
  const playHover = () => enabled && playSound(SoundEffect.HOVER);
  const playWhoosh = () => enabled && playSound(SoundEffect.WHOOSH);
  const playSuccess = () => enabled && playSound(SoundEffect.SUCCESS);
  const playError = () => enabled && playSound(SoundEffect.ERROR);
  const playTyping = () => enabled && playSound(SoundEffect.TYPING);
  const playAchievement = () => enabled && playSound(SoundEffect.ACHIEVEMENT);

  return {
    playClick,
    playHover,
    playWhoosh,
    playSuccess,
    playError,
    playTyping,
    playAchievement,
  };
}
