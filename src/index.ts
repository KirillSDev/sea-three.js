import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './index.css';
import GUI from 'lil-gui'; 
import waterFragmentShader from './shaders/water/fragment.glsl';
import waterVertexShader from './shaders/water/vertex.glsl';

const variables = {
    wavesElevation: 0.2,
}
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Clock
const clock = new THREE.Clock();

// Material 
const material = new THREE.ShaderMaterial({
    fragmentShader: waterFragmentShader,
    vertexShader: waterVertexShader,
    side: THREE.DoubleSide,
    wireframe: true,
    uniforms: {
        u_time: {
            value: clock.getElapsedTime()
        },
        u_wavesElevation: {
            value: variables.wavesElevation,
        },
        u_wavesFrequency: {
            value: new THREE.Vector2(4, 1.5)
        },
        u_speedWaves: {
            value: 1,
        }
    }
})


// Geometry
const geometryPlane = new THREE.PlaneGeometry(2, 2, 128, 128);

// Mesh
const sea = new THREE.Mesh(geometryPlane, material);
sea.rotation.x = Math.PI / 2;


// Main
const canvas = document.querySelector('canvas.webgl') as HTMLElement;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.y = 2;
camera.position.z = 4;
const orbitControls = new OrbitControls(camera, canvas);
scene.add(sea);




const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})



// GUI 
const gui = new GUI();
gui.add(material, 'wireframe');
gui.add(material.uniforms.u_wavesElevation, 'value', 0, 1, 0.01).name('u_wavesElevation');
gui.add(material.uniforms.u_wavesFrequency.value, 'x', 0, 30, 1).name('u_wavesFrequency_x');
gui.add(material.uniforms.u_wavesFrequency.value, 'y', 0, 30, 1).name('u_wavesFrequency_y');
gui.add(material.uniforms.u_speedWaves, 'value', 0, 10, 0.01).name('u_wavesSpeed');

const tick = () => {
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
    orbitControls.update();
    material.uniforms.u_time.value = clock.getElapsedTime();
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    requestAnimationFrame(tick);
};

tick();