// Matrix code rain shader
// Falling code particles with glowing trails

// Vertex Shader
varying vec2 vUv;
varying vec3 vPosition;
attribute float instanceSpeed;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
}

// Fragment Shader
uniform float time;
uniform vec3 matrixColor;
uniform float glowIntensity;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  // Pulsing glow effect
  float pulse = sin(time * 2.0 + vPosition.y) * 0.5 + 0.5;

  // Vertical trail fade
  float trail = smoothstep(0.0, 0.3, vUv.y);

  vec3 color = matrixColor * (pulse * 0.3 + 0.7);
  float alpha = trail * glowIntensity;

  gl_FragColor = vec4(color, alpha);
}
