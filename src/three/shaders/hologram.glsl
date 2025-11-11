// Holographic material shader
// Glassmorphism with scanline effects

// Vertex Shader
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment Shader
uniform float time;
uniform vec3 color;
uniform float opacity;
uniform float scanlineSpeed;
uniform float scanlineCount;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  // Fresnel effect for glass-like edges
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(0.0, dot(viewDirection, vNormal)), 2.0);

  // Animated scanlines
  float scanline = sin(vUv.y * scanlineCount + time * scanlineSpeed);
  scanline = smoothstep(0.4, 0.6, scanline) * 0.1;

  // Combine effects
  vec3 finalColor = color + fresnel * 0.3 + scanline;
  float finalAlpha = opacity + fresnel * 0.2;

  gl_FragColor = vec4(finalColor, finalAlpha);
}
