//Source: http://glslsandbox.com/e#39726.0

#ifdef GL_ES
precision mediump float;
#endif

// Yuldashev Mahmud Effect took from shaderToy mahmud9935@gmail.com

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float vignette(vec2 uv, float radius, float smoothness) {
    float diff = radius - distance(uv, vec2(0.5, 0.5));
    return smoothstep(-smoothness, smoothness, diff);
}

float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main( void ) {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float vignette = 1.0 - vignette(uv, 0.5, 0.5);
    vec4 vignetteColor = vec4(0.0, 0.0, 0.0, 1.0) * vignette;
    float noise = rand(uv * time);
    vec4 noiseColor = vec4(noise, noise, noise, 0) * 0.1;
    gl_FragColor = (vignetteColor * 0.75) + (noiseColor * 0.25);
}