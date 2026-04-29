import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const stopCube = document.querySelector(".StopCube");

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  (window.innerWidth * 3) / 4 / window.innerHeight,
  0.1,
  200,
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize((window.innerWidth * 3) / 4, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// render the scene
const renderloop = () => {
  const currentTime = timer.getElapsedTime();
  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1);
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

const timer = new THREE.Clock();
renderloop();

window.addEventListener("resize", () => {
  camera.aspect = (window.innerWidth * 3) / 4 / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize((window.innerWidth * 3) / 4, window.innerHeight);
});

stopCube.addEventListener("click", () => {
  cubeMesh.rotation.x += THREE.MathUtils.degToRad(50);
});
