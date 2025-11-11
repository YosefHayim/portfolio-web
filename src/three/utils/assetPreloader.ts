import * as THREE from 'three';

export interface Asset {
  type: 'texture' | 'model' | 'audio' | 'font';
  url: string;
  name: string;
}

export interface PreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
  currentAsset: string;
}

export class AssetPreloader {
  private assets: Map<string, any> = new Map();
  private loadingManager: THREE.LoadingManager;
  private textureLoader: THREE.TextureLoader;
  private audioLoader: THREE.AudioLoader;
  private fontLoader: THREE.FontLoader;

  constructor() {
    this.loadingManager = new THREE.LoadingManager();
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.audioLoader = new THREE.AudioLoader(this.loadingManager);
    this.fontLoader = new THREE.FontLoader(this.loadingManager);
  }

  async preload(
    assets: Asset[],
    onProgress?: (progress: PreloadProgress) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      let loaded = 0;
      const total = assets.length;

      this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
        const asset = assets.find((a) => url.includes(a.url));
        onProgress?.({
          loaded: itemsLoaded,
          total: itemsTotal,
          percentage: (itemsLoaded / itemsTotal) * 100,
          currentAsset: asset?.name || 'Unknown',
        });
      };

      this.loadingManager.onLoad = () => {
        resolve();
      };

      this.loadingManager.onError = (url) => {
        console.error(`Error loading asset: ${url}`);
        reject(new Error(`Failed to load: ${url}`));
      };

      // Load each asset
      assets.forEach((asset) => {
        switch (asset.type) {
          case 'texture':
            this.loadTexture(asset.name, asset.url);
            break;
          case 'audio':
            this.loadAudio(asset.name, asset.url);
            break;
          case 'font':
            this.loadFont(asset.name, asset.url);
            break;
          default:
            console.warn(`Unknown asset type: ${asset.type}`);
        }
      });
    });
  }

  private loadTexture(name: string, url: string): void {
    this.textureLoader.load(
      url,
      (texture) => {
        this.assets.set(name, texture);
      },
      undefined,
      (error) => {
        console.error(`Failed to load texture ${name}:`, error);
      }
    );
  }

  private loadAudio(name: string, url: string): void {
    this.audioLoader.load(
      url,
      (buffer) => {
        this.assets.set(name, buffer);
      },
      undefined,
      (error) => {
        console.error(`Failed to load audio ${name}:`, error);
      }
    );
  }

  private loadFont(name: string, url: string): void {
    this.fontLoader.load(
      url,
      (font) => {
        this.assets.set(name, font);
      },
      undefined,
      (error) => {
        console.error(`Failed to load font ${name}:`, error);
      }
    );
  }

  getAsset<T = any>(name: string): T | undefined {
    return this.assets.get(name);
  }

  hasAsset(name: string): boolean {
    return this.assets.has(name);
  }

  clear(): void {
    this.assets.clear();
  }
}

// Predefined asset lists for each scene
export const HeroSceneAssets: Asset[] = [
  { type: 'font', url: '/fonts/JetBrainsMono-Bold.ttf', name: 'jetbrains-bold' },
  { type: 'font', url: '/fonts/JetBrainsMono-Regular.ttf', name: 'jetbrains-regular' },
  { type: 'audio', url: '/sounds/ambient.mp3', name: 'ambient-hero' },
  { type: 'audio', url: '/sounds/typing.mp3', name: 'typing' },
];

export const ProjectsSceneAssets: Asset[] = [
  { type: 'font', url: '/fonts/JetBrainsMono-Bold.ttf', name: 'jetbrains-bold' },
  { type: 'audio', url: '/sounds/whoosh.mp3', name: 'whoosh' },
  { type: 'audio', url: '/sounds/click.mp3', name: 'click' },
];

export const TechStackSceneAssets: Asset[] = [
  { type: 'font', url: '/fonts/JetBrainsMono-Bold.ttf', name: 'jetbrains-bold' },
  { type: 'audio', url: '/sounds/hover.mp3', name: 'hover' },
  { type: 'audio', url: '/sounds/click.mp3', name: 'click' },
];

export const JourneySceneAssets: Asset[] = [
  { type: 'font', url: '/fonts/JetBrainsMono-Bold.ttf', name: 'jetbrains-bold' },
  { type: 'audio', url: '/sounds/ambient.mp3', name: 'ambient-journey' },
  { type: 'audio', url: '/sounds/whoosh.mp3', name: 'whoosh' },
];

// Create a global preloader instance
export const globalPreloader = new AssetPreloader();

// Helper hook for using the preloader in React components
export function useAssetPreloader(assets: Asset[], onProgress?: (progress: PreloadProgress) => void) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    globalPreloader
      .preload(assets, onProgress)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [assets, onProgress]);

  return { isLoading, error, getAsset: globalPreloader.getAsset.bind(globalPreloader) };
}

// React import for the hook
import * as React from 'react';
