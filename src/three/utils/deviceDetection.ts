export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  pixelRatio: number;
  memory: number | undefined;
  cores: number;
  gpu: string;
  quality: 'low' | 'medium' | 'high';
  supportsWebGL2: boolean;
}

export function detectDeviceCapabilities(): DeviceCapabilities {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(
    navigator.userAgent
  );

  const isDesktop = !isMobile && !isTablet;

  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const pixelRatio = window.devicePixelRatio || 1;

  // @ts-ignore - navigator.deviceMemory is not standard
  const memory = navigator.deviceMemory as number | undefined;

  const cores = navigator.hardwareConcurrency || 4;

  // Get GPU info
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  let gpu = 'Unknown';
  let supportsWebGL2 = false;

  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }
    supportsWebGL2 = canvas.getContext('webgl2') !== null;
  }

  // Determine quality level based on capabilities
  let quality: 'low' | 'medium' | 'high' = 'medium';

  if (isMobile) {
    // Mobile devices
    if (memory && memory < 4) {
      quality = 'low';
    } else if (memory && memory >= 6) {
      quality = 'medium';
    } else {
      quality = 'low';
    }
  } else if (isTablet) {
    // Tablets
    quality = 'medium';
  } else {
    // Desktop
    if (memory && memory >= 8 && cores >= 8) {
      quality = 'high';
    } else if (memory && memory >= 4 && cores >= 4) {
      quality = 'medium';
    } else {
      quality = 'low';
    }
  }

  // Adjust for low-end GPUs
  if (gpu.toLowerCase().includes('intel') && !gpu.toLowerCase().includes('iris')) {
    quality = quality === 'high' ? 'medium' : 'low';
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    hasTouch,
    pixelRatio,
    memory,
    cores,
    gpu,
    quality,
    supportsWebGL2,
  };
}

export interface QualitySettings {
  particleCount: number;
  shadowsEnabled: boolean;
  bloomEnabled: boolean;
  postProcessingEnabled: boolean;
  antialias: boolean;
  pixelRatio: number;
  maxLights: number;
  textureResolution: number;
  cameraFar: number;
  lodEnabled: boolean;
}

export function getQualitySettings(quality: 'low' | 'medium' | 'high'): QualitySettings {
  switch (quality) {
    case 'low':
      return {
        particleCount: 50,
        shadowsEnabled: false,
        bloomEnabled: false,
        postProcessingEnabled: false,
        antialias: false,
        pixelRatio: Math.min(window.devicePixelRatio, 1),
        maxLights: 2,
        textureResolution: 512,
        cameraFar: 100,
        lodEnabled: true,
      };
    case 'medium':
      return {
        particleCount: 200,
        shadowsEnabled: false,
        bloomEnabled: true,
        postProcessingEnabled: true,
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        maxLights: 4,
        textureResolution: 1024,
        cameraFar: 150,
        lodEnabled: true,
      };
    case 'high':
      return {
        particleCount: 500,
        shadowsEnabled: true,
        bloomEnabled: true,
        postProcessingEnabled: true,
        antialias: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        maxLights: 8,
        textureResolution: 2048,
        cameraFar: 200,
        lodEnabled: false,
      };
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private fpsHistory: number[] = [];
  private readonly historyLength = 60;

  update(): void {
    this.frameCount++;
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;

    if (deltaTime >= 1000) {
      this.fps = (this.frameCount * 1000) / deltaTime;
      this.fpsHistory.push(this.fps);

      if (this.fpsHistory.length > this.historyLength) {
        this.fpsHistory.shift();
      }

      this.frameCount = 0;
      this.lastTime = currentTime;
    }
  }

  getFPS(): number {
    return Math.round(this.fps);
  }

  getAverageFPS(): number {
    if (this.fpsHistory.length === 0) return 60;
    const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.fpsHistory.length);
  }

  shouldReduceQuality(): boolean {
    return this.getAverageFPS() < 30;
  }

  shouldIncreaseQuality(): boolean {
    return this.getAverageFPS() > 55 && this.fpsHistory.length >= this.historyLength;
  }

  reset(): void {
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
    this.fpsHistory = [];
  }
}

// Memory monitoring
export function getMemoryInfo(): {
  used: number;
  total: number;
  limit: number;
  percentage: number;
} | null {
  // @ts-ignore - performance.memory is not standard
  if (performance.memory) {
    // @ts-ignore
    const memory = performance.memory;
    return {
      used: memory.usedJSHeapSize / 1048576, // Convert to MB
      total: memory.totalJSHeapSize / 1048576,
      limit: memory.jsHeapSizeLimit / 1048576,
      percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    };
  }
  return null;
}
