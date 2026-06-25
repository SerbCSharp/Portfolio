import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import { Plane, Meshs } from "./meshs.js";
import { label } from "three/src/Three.TSL.js";

const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const plane = Plane();
const meshs = Meshs();

const group = new THREE.Group();
group.add(plane);
group.add(meshs);
group.rotation.x = THREE.MathUtils.degToRad(10);
group.rotateY(THREE.MathUtils.degToRad(15));
scene.add(group);

pane.addBinding(group.rotation, "x", {
  min: -10,
  max: 10,
  step: 0.01,
  label: "RotationX",
});

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
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

const clock = new THREE.Clock();
let previousTime = 0;

// render the scene
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  //console.log(Math.sin(currentTime));

  orbitControls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
