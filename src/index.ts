import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './index.css';
import GUI from 'lil-gui'; 
import waterFragmentShader from './shaders/water/fragment.glsl';
import waterVertexShader from './shaders/water/vertex.glsl';

const variables = {
    wavesElevation: 0.2,
    deepColor: "#18598c",
    highColor: "#30d4fd",
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
    wireframe: false,
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
        },
        u_deepColor: {
            value: new THREE.Color(variables.deepColor),
        },
        u_highColor: {
            value: new THREE.Color(variables.highColor),
        },
        u_smallWavesFrequency: {
            value: 3.0
        },
        u_smallWavesSpeed: {
            value: 1.0
        },
        u_smallWavesElevation: {
            value: 0.15
        },
        u_smallWavesIteration: {
            value: 5
        }
    }
})


// Geometry
const geometryPlane = new THREE.PlaneGeometry(2, 2, 512, 512);

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

scene.fog = new THREE.Fog(0xff0000, 3, 20);
scene.background =  new THREE.Color('#000000');



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
gui.add(material.uniforms.u_smallWavesElevation, 'value', 0, 1, 0.01).name('u_smallWavesElevation');
gui.add(material.uniforms.u_smallWavesFrequency, 'value', 0, 30, 0.01).name('u_smallWavesFrequency');
gui.add(material.uniforms.u_smallWavesSpeed, 'value', 0, 3, 0.01).name('u_smallWavesSpeed');
gui.add(material.uniforms.u_smallWavesIteration, 'value', 1, 10, 1).name('u_smallWavesIteration');
gui.addColor(variables, 'deepColor').onChange(() => material.uniforms.u_deepColor.value = new THREE.Color(variables.deepColor));
gui.addColor(variables, 'highColor').onChange(() => material.uniforms.u_highColor.value = new THREE.Color(variables.highColor));

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