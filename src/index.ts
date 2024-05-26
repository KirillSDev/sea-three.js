import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './index.css';


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Material 
const material = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    side: THREE.DoubleSide,
})


// Geometry
const geometryPlane = new THREE.PlaneGeometry(4, 4);

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


const tick = () => {
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
    orbitControls.update();
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    requestAnimationFrame(tick);
};

tick();