#ifdef GL_ES
  precision mediump float;
#endif

varying float v_elevation;

void main() {
    gl_FragColor = vec4(vec3(1.0), 1.0);
}