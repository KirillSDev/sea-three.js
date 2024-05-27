#ifdef GL_ES
  precision mediump float;
#endif

varying float v_elevation;

uniform vec3 u_deepColor;
uniform vec3 u_highColor;
void main() {
  vec3 color = mix(u_deepColor, u_highColor, v_elevation * 2.0 + 0.2);
    gl_FragColor = vec4(color, 1.0);
}