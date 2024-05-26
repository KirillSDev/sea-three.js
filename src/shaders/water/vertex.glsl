uniform float u_time;
uniform float u_wavesElevation;
uniform vec2 u_wavesFrequency;
uniform float u_speedWaves;
varying float v_elevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(u_time * u_speedWaves + modelPosition.z * u_wavesFrequency.y) * sin(u_time * u_speedWaves + modelPosition.x * u_wavesFrequency.x) * sin(u_time * u_speedWaves + modelPosition.x * u_wavesFrequency.y) * u_wavesElevation;
    modelPosition.y += elevation;
    vec4 viewPosition =  viewMatrix * modelPosition;
    vec4 projectionMatrix = projectionMatrix * viewPosition;

    gl_Position = projectionMatrix;
    v_elevation = elevation;
}