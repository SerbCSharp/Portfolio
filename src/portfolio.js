import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Plane, Meshs } from "./meshs.js";
import { MagicWindow, InnerWorld } from "./stencil.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const plane = Plane();
const meshs = Meshs();
const magicWindow = MagicWindow();
const innerWorld = InnerWorld(magicWindow);

const group = new THREE.Group();
group.add(plane);
group.add(meshs);
group.add(magicWindow);
group.rotation.x = THREE.MathUtils.degToRad(10);
group.rotateY(THREE.MathUtils.degToRad(15));
scene.add(group);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200,
);
camera.position.z = 3.6;

// initialize the renderer
const canvas = document.querySelector(".threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  stencil: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// render the scene
const renderloop = () => {
  orbitControls.update();
  renderer.clearStencil(); // Очистка перед кадром
  innerWorld.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
