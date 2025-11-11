import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AudioSource {
  id: string;
  position: THREE.Vector3;
  audio: HTMLAudioElement;
  sound?: THREE.PositionalAudio;
}

interface SpatialAudioOptions {
  enabled?: boolean;
  maxDistance?: number;
  refDistance?: number;
  rolloffFactor?: number;
}

export function useSpatialAudio(options: SpatialAudioOptions = {}) {
  const {
    enabled = true,
    maxDistance = 50,
    refDistance = 10,
    rolloffFactor = 1,
  } = options;

  const { camera, scene } = useThree();
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [listener, setListener] = useState<THREE.AudioListener | null>(null);
  const audioSources = useRef<Map<string, AudioSource>>(new Map());

  // Initialize audio context and listener
  useEffect(() => {
    if (!enabled) return;

    const context = new AudioContext();
    setAudioContext(context);

    const audioListener = new THREE.AudioListener();
    camera.add(audioListener);
    setListener(audioListener);

    return () => {
      audioListener.clear();
      camera.remove(audioListener);
      context.close();
    };
  }, [enabled, camera]);

  // Add a spatial audio source
  const addAudioSource = (
    id: string,
    audioUrl: string,
    position: THREE.Vector3,
    loop = true,
    volume = 0.5
  ) => {
    if (!listener || !audioContext || !enabled) return;

    const audio = new Audio(audioUrl);
    audio.loop = loop;

    const sound = new THREE.PositionalAudio(listener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load(audioUrl, (buffer) => {
      sound.setBuffer(buffer);
      sound.setRefDistance(refDistance);
      sound.setMaxDistance(maxDistance);
      sound.setRolloffFactor(rolloffFactor);
      sound.setVolume(volume);
      sound.setLoop(loop);
    });

    // Create a mesh at the position for the sound
    const soundMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    soundMesh.position.copy(position);
    soundMesh.add(sound);
    scene.add(soundMesh);

    audioSources.current.set(id, { id, position, audio, sound });
  };

  // Remove an audio source
  const removeAudioSource = (id: string) => {
    const source = audioSources.current.get(id);
    if (source) {
      source.sound?.stop();
      source.audio.pause();
      audioSources.current.delete(id);
    }
  };

  // Play a specific audio source
  const playAudio = (id: string) => {
    const source = audioSources.current.get(id);
    if (source && source.sound && !source.sound.isPlaying) {
      source.sound.play();
    }
  };

  // Stop a specific audio source
  const stopAudio = (id: string) => {
    const source = audioSources.current.get(id);
    if (source && source.sound) {
      source.sound.stop();
    }
  };

  // Set volume for a specific audio source
  const setVolume = (id: string, volume: number) => {
    const source = audioSources.current.get(id);
    if (source && source.sound) {
      source.sound.setVolume(volume);
    }
  };

  // Update audio source position
  const updatePosition = (id: string, position: THREE.Vector3) => {
    const source = audioSources.current.get(id);
    if (source) {
      source.position.copy(position);
    }
  };

  // Play a one-shot sound at a position
  const playSound = (
    audioUrl: string,
    position: THREE.Vector3,
    volume = 0.5
  ) => {
    if (!listener || !enabled) return;

    const sound = new THREE.PositionalAudio(listener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load(audioUrl, (buffer) => {
      sound.setBuffer(buffer);
      sound.setRefDistance(refDistance);
      sound.setMaxDistance(maxDistance);
      sound.setRolloffFactor(rolloffFactor);
      sound.setVolume(volume);
      sound.play();

      // Remove after playing
      sound.onEnded = () => {
        scene.remove(soundMesh);
      };
    });

    const soundMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    soundMesh.position.copy(position);
    soundMesh.add(sound);
    scene.add(soundMesh);
  };

  return {
    addAudioSource,
    removeAudioSource,
    playAudio,
    stopAudio,
    setVolume,
    updatePosition,
    playSound,
    listener,
    audioContext,
  };
}

// Predefined sound effects
export const SoundEffects = {
  CLICK: '/sounds/click.mp3',
  HOVER: '/sounds/hover.mp3',
  WHOOSH: '/sounds/whoosh.mp3',
  TYPING: '/sounds/typing.mp3',
  SUCCESS: '/sounds/success.mp3',
  ERROR: '/sounds/error.mp3',
  AMBIENT: '/sounds/ambient.mp3',
};
