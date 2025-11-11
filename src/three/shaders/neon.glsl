// Neon glow shader for terminal aesthetic
// Used for glowing edges on text and objects

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// Fragment Shader (neon.frag)
uniform vec3 glowColor;
uniform float glowIntensity;
uniform float rimPower;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float rim = 1.0 - max(0.0, dot(viewDirection, vNormal));
  rim = pow(rim, rimPower);

  vec3 glow = glowColor * rim * glowIntensity;
  float alpha = rim;

  gl_FragColor = vec4(glow, alpha);
}
